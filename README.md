# Markdown Fetcher Challenge
Application for displaying *README.md* markdown files for listed repositories.

[Demo](https://domagojk.github.io/Markdown-Fetcher-Challenge/)

This repository is an example of how [Recycle](https://recycle.js.org) (v2) can be used for building large-scale apps.

But, the following specification also serves as a challenge.

If you wish to solve the challenge by yourself, feel free to post an issue with your solution featuring the library of your choice.

## The Project Goal
Imagine you are the lead developer for a web application similar to Facebook (currently focused only on frontend).

Hundreds of employees in the company depend on you to make an architecture where
"senior" or "junior" can easily contribute.
To make it more interesting, it's also required to make a public API which
would be used for creating plugins.

It's obvious that for this we need a good modular architecture that scales well.

Every module should be powerful enough to create any feature but also isolated enough to be easily plugged in the system.

## Scalability Index
But what does it mean for an application to be scalable?
Personally, I'm not aware of any clear way for determining application scalability (if there is one, please let me know).

So, I'm now going to propose an equation of my own.

In short, the application should be created as a set of components,
and the part of the application connecting them together should be as small as possible.

Note that a term "component" (module) indicates an isolated part of the application.
It's a broader concept than "React component".

```
                      c(reusability) * c(independence) * c(testability)
scalabilityIndex =  -----------------------------------------------------
                                     sizeOf(domainLogic)

```

### c(reusability) - Component Reusability
> If I were to look at the codebase for a large application you or your team were working on and selected a random module, would it be possible for me to easily just drop it into a new page and start using it on its own? [Large Scale JavaScript](https://addyosmani.com/largescalejavascript)

If the answer is yes, a component is reusable.

### c(independence) - Component Independence
But, this doesn't mean a component is independent.

If for example, a component is importing `constants` or `actionCreators` in its definition, 
it could be reused in the same application, but it's tightly coupled to that particular environment.

A good case for testing its dependence is: can a specific component be published on npm by its own? 

If the answer is yes, a component is probably independent because no files outside of its root directory can be used.

This however, doesn't mean a component should always be defined in a single file.
If a component is composed of multiple child components, 
then the entire hierarchy acts as a single npm package.
Child components, in this case, can be defined in the same directory, or they can also be imported from npm.

### c(testability) - Component Testability
How easily can you test individual component?
If a component is truly independent, 
there should be no difference on wether it's tested outside or inside of the architecture for which it was initially built.

### sizeOf(domainLogic) - Size of the Domain Logic
The domain is the world your application lives in.
It connects all components together and optionally provides them with the domain logic data, 
so that components could adapt to different environments.

This includes: app starting point (`index.js`), config params, constants (`actionTypes`), action object structure (`actionCreators`), etc.

Good scalable architecture keeps this part as small as possible.

## Challenge Specifications
The application must be separated into five parts:
- **(A)** component for displaying a list of repositories
- **(B)** component for rendering fetched markdown
- isolated parts of the app for handling app state:
 - **(C)** component managing fetching status (is README currently fetching and is it in error state)
 - **(D)** component managing repository data (contents of README.md and list of repositories)
- **(E)** component for making side effects (ajax request to GitHub API)

The app requirements:
- (1) both **(A)** and **(B)** must be able to request fetching of a README.md file using the same action structure
- (2) each component must be able to be developed in isolation so it is not aware of its environment or any other component 
- (3) if specific component fails, others must still be functional
- (4) each component must be easily testable and reusable

Bonus requirement:
- (5) the app should work offline AND in sync across multiple clients using WebSockets or similar communication protocol
  (algorithm for making app in sync doesn't have to be perfect or optimised. Proving that it's conceptually possible is sufficient)

## Proposed Arhitecture
There are, of course, different ways of structuring an application like this.

This challenge promotes an architecture which is composed of:
 - view logic (components managing application visual presentation)
 - state management (components managing application state)
 - effects (components managing application side effects)
 - application specific (domain logic)

## Solution in Recycle
Recycle application is composed of components and drivers:
- **Components** are independent units of the app doing most of the work
- **Drivers** are part of the application domain logic which are connecting components together

List of components:
- view: `RepoList` **(A)**, `Markdown` **(B)** (managing application visual presentation using React)
- state: `FetchingStatus` **(C)**, `Repos` **(D)** (managing application state)
- effects: `ReadmeFetcher` **(E)** (managing application side effects)

![App structure](https://cloud.githubusercontent.com/assets/1868852/23548181/86f0e176-0006-11e7-853d-ccc926e8605d.png)

### View components
Every component is independent and isolated, but it still has to communicate with the domain logic.

In a classic React architecture, 
for this, we use a "top-down" approach where all the data from the domain logic is passed to the root component and then forwarded to its children.
But to make it more convenient, 
this tree hierarchy is sometimes broken by using "wormholes" to the domain logic (Redux containers or similar components).

In Recycle, this is done differently.

Basically, all components have two sets of inputs:
  - props - used by components organised in a tree hierarchy
  - sources - used by drivers

For example, `RepoList` component requires:
  - an array of repositores from the application state (`store$`)
  - `actionTypes` (defined in `config`) for dispatching an action when a repository is clicked

These requirements are defined using `sourceTypes`:

```javascript
function RepoList () {
  return {
    sourceTypes: {
      store$: sourceTypes.observable.isRequired,
      actionCreators: sourceTypes.object.isRequired
    },

    actions (sources) {
      // sources.store$ and soruces.actionCreators
      // are avaiable after component is initialized 
    },

    reducers (sources) {
      // sources.store$ and soruces.actionCreators
      // are avaiable after component is initialized 
    },

    view (props, state) {
      // props are passed by its parent component
      // local state is calculated with reducers
    }
  }
}
```
When a component is initialized, drivers can "feed" it with sources.
In the case of a "view component", this is done **before** it's mounted to the DOM.

After drivers inject the data which matches component's sourceTypes, 
`sources.store$` and `sources.actionCreators` will be available in the component
actions (managing user behaviour) and reducers (managing component local state).

### Store components
If you are used to React/Redux architecture you probably never think about the application state as something components would manage.
But, if a component can be independent, reusable and testable, why would you use it only for the view part of the app?

Every Recycle component acts like a function. 
Based on some input, a component is producing an output. 
This output is sometimes a JSX formatted view, action stream, state stream etc.

Recycle component doesn't render anything.
This is all done by a driver (in this case: "React driver").

Since isolated, a component is unaware how we are using its output,
which means, we can use it for calculating app state.

Recycle's store driver identifies a "store component" by an `aggregate` property.

Aggregate serves as a component initial state and
it gives the store driver information about which part of the state a component is modifying.

For example, if the complete app state has to be an object:
```javascript
{
  active: 'homepage',
  users: [{
    name: 'John Doe',
    address: '21 jump street'
  }]
}
```

we can calculate it by using two components.
First one for keeping track of the active page:

```javascript
export default {
  sourceTypes: {
    action$: sourceTypes.observable.isRequired,
    actionTypes: sourceTypes.object.isRequired
  },

  aggregate: {
    active: 'homepage'
  },

  reducers (sources) {
    return [
      sources.action$
        .filter(a => a.type === sources.actionTypes.PAGE_CHANGE)
        .reducer(function (state, action) {
          state.active = action.page
          return state
        })
    ]
  }
}
```

The second one for updating the users list:

```javascript
export default {
  sourceTypes: {
    action$: sourceTypes.observable.isRequired,
    actionTypes: sourceTypes.object.isRequired
  },

  aggregate: {
    users: [{
      name: 'John Doe',
      address: '21 jump street'
    }]
  },

  reducers (sources) {
    return [
      sources.action$
        .filter(a => a.type === sources.actionTypes.ADD_USER)
        .reducer(function (state, action) {
          state.users = [...state.users, {
            name: action.name,
            address: action.address
          }]
          return state
        })
    ]
  }
}
```

In case multiple components try to calculate the same property, the store driver will throw an error.

To make it more reusable, it's also possible to define the state properties in the domain logic
and pass it as arguments.

```javascript
function exampleStateComponent (propName1, propName2) {
  return {
    sourceTypes: {
      action$: sourceTypes.observable.isRequired,
      actionTypes: sourceTypes.object.isRequired
    },

    aggregate: {
      [propName1]: 'data',
      [propName2]: 'data'
    }
  }
}
```

```javascript
recycle.createComponent(exampleStateComponent('users', 'active'))
```

### Effect components
Similar to store components, components for managing side-effects doesn't have a view.

The effect component listens to `action$` observable and based on it, it defines its action stream.

For example, `ReadmeFetcher` is listening for `'REQUEST_README'` action,
and when it's triggered,
a component is making an ajax request and dispatches response inside of `'README_FETCHED'` action:

```javascript
export default {
  sourceTypes: {
    action$: sourceTypes.observable.isRequired,
    actionTypes: sourceTypes.object.isRequired,
    actionCreators: sourceTypes.object.isRequired,
    getReadmeEndpoint: sourceTypes.func.isRequired
  },

  actions (sources) {
    return [
      sources.action$
        .filter(a => a.type === sources.actionTypes.REQUEST_README)
        .map(a => a.path)
        .debounceTime(500)
        .switchMap(path => Rx.Observable.ajax(sources.getReadmeEndpoint(path))
          .map(res => ({ error: false, document: atob(res.response.content) }))
          .catch(err => Rx.Observable.of({ error: err.message, document: '' }))
        )
        .map(sources.actionCreators.readmeFetched)
    ]
  }
}
```

## Application Overview
```
/src
├── components               # Application components
│   ├── view                 # Components managing application visual presentation
│   │   ├── RepoList         # Displaying a list of repositories
│   │   ├── Markdown         # Rendering fetched markdown
│   │   ├── Wrapper          # React component wrapping Markdown and RepoList
│   ├── state                # Components managing application state
│   │   ├── Repos            # Managing repository data
│   │   ├── FetchingStatus   # Managing fetching status
│   ├── effects              # Components managing application side effects
│   │   ├── ReadmeFetcher    # Making ajax request to GitHub API
├── drivers                  # Recycle drivers
│   └── actionStream.js      # Driver feeding components with action stream
│   └── configFeeder.js      # Driver feeding components with config properties
│   └── storeStream.js       # Driver creating store and feeding components with store stream
├── config.js                # Constants, action creators, GithHub endpoint, etc.
└── index.js                 # App starting point
```

## Bonus: Event Sourcing
> (5) the app should work offline AND in sync accross multiple clients using websockets or similar communication protocol
  (algorithm for making app in sync doesn't have to be perfect or optimised. Proving that it's conceptually possible is sufficient)

This "bonus" part is here to show what can be accomplished by slightly changing a domain logic without modifying any component.

Since in Recycle, all actions are represented as an observable we can use this and make the application where the
source of truth is not the state (as it's often the case in Redux app), but the action itself - an event.

In short, this is the idea behind "Event Sourcing". 
If you are unfamiliar with this concept,
here is a good introduction video: [Event Sourcing: the good, the bad and the complicated](https://www.youtube.com/watch?v=8NuHNtwjync)

In config file of this project, there is an option called `sync`.
If you enable it and start a server using `node server.js` (in project root),
this application will work in sync across multiple clients.

It uses events as a source of truth and its syncing algorithm is managed by [ShareDB](https://github.com/share/sharedb).

It works similar to google docs, allowing everyone to use the app simultaneously (even offline) where all actions
are synced using [Operational Transformation (OT)](https://en.wikipedia.org/wiki/Operational_transformation)

## Comaparison to React/Redux

### Advantages
  - Components are independent isolated parts of the app, which can be reused in different environments 
    (this includes handling state and side effects)
  - By documenting driver outputs you can easily create an API for developing components
    (this API can be public, and there would be no difference between a component and a "plugin" developed by someone "outside" the company)
  - Ability to separate component presentation and logic (no inline event handlers).
  - Components are not controlled "from the outside" (by "force updating" them every time the state is changed)
  - Ability to "break" the state more easily (no need for a root reducer)
  - Ability to use observables for async operations (which, among other things, saves you from heavily using switch/case logic)
  - Ability to create side effects without middlewares
  - More? (please comment)

### Disadvatages
  - Learning curve for using observable streams is steep
  - Currently lacking dev tools like "redux-devtools"
  - More? (please comment)
