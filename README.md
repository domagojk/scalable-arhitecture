# Markdown Fetcher Challenge
Application for displaying *README.md* markdown files for listed repositories.

[Demo](https://domagojk.github.io/recycle-markdown-fetcher)

This repository is as an example on how [Recycle](https://recycle.js.org) (v2)
is used for building large scale apps.

But, the following specification also serves as a challenge.

If you wish to solve the challenge by yourself, feel free to post an issue with your solution featuring the library of your choice.

## Scalability Index
The goal is to create a scalabale frontend architecture.
But, in order to do this, we must first define what does it mean for an application to be scalable.

Personally, I'm not aware of any clear way for determening application scalability (if there is one, please let me know).

So, I'm now going to define my own. 

It is based on my personal experience and relatively old [article](https://addyosmani.com/largescalejavascript) from Addy Osmany and even older [presentation](https://www.youtube.com/watch?v=b5pFv9NB9fs) of Nicholas Zakas.

Basically the application should be created as a set of components,
and the part of the application connecting them together should be as small as possible.

Note that a term "component" (sometimes called "module") indicates an isolated part of the application.
It's a broader concept than "React component".
I had deliberately chosen the same term, 
because they could have a parent-child relationship similar to a React hierarchy.
Also a React component itself is... well - a component, but only for a presentational part of the app.

```
                      c(reusability) * c(independence) * c(testability)
scalabilityIndex =  -----------------------------------------------------
                                     sizeOf(domainLogic)

```

### c(reusability) - Component Reusability
> If I were to look at the codebase for a large application you or your team were working on and selected a random module, would it be possible for me to easily just drop it into a new page and start using it on its own? [Large Scale JavaScript](https://addyosmani.com/largescalejavascript)

If the answer is yes, a component is reusable.

### c(independence) - Component Independence
But, this doesn't mean it's completely independent.

If for example a component is importing `constants` or `actionCreators` in its definition - it's not independent.
Although it can be reused in the same application, it's tightly coupled for that specific enviroment.

A good case for testing its dependence is: can a specific component be published on npm by its own? 

If the answer is yes, a component is probably independent because no files outside of its root directory can be used.

This however, doesn't mean a component should always be defined in a single file.
If a component is composed of multiple child components, 
than the entire hierarchy acts as a single npm package.
Child components in this case can be defined in the same directory, or they can also be imported from npm.

### c(testability) - Component Testability
How easily can you test individual component?
If a component is truly independent, there should be no difference on wether it's tested outside or inside of the architecture for which it was initially built.

### sizeOf(domainLogic) - Size of the Domain Logic
Domain is the world your application lives in.
It connects all components together and optionaly provides them with the domain logic data, so that components could adapt to different enviroments.

This includes: app starting point (`index.js`), config params, constants (`actionTypes`), action object structure (`actionCreators`), etc.

Good scalabale arhitecture keeps this part as small as possible.

## Challenge Specifications
The application must be separated in five parts:
- **(A)** component for displaying a list of repositories
- **(B)** component for rendering fetched markdown
- isolated parts of the app for handling app state:
 - **(C)** component managing fetching status (is README currently fetching and is it in error state)
 - **(D)** component managing repository data (contents of README.md and list of repositories)
- **(E)** component for making side effects (ajax request to github API)

The app requirements:
- (1) both **(A)** and **(B)** must be able to request fetching of a README.md file using the same action structure
- (2) each component must be able to be developed in isolation so it is not aware of its enviroment or any other component 
- (3) if specific component fails, others must still be functional
- (4) each component must be easily testable and reusable

Bonus requirement:
- (5) the app should work offline AND in sync accross multiple clients using websockets or similar communication protocol
  (algorithm for making app in sync doesn't have to be perfect or optimised. Proving that it's conceptually possible is sufficient)

## Proposed Arhitecture
There are, of course, different ways of structuring application like this.

This challenge promotes an architecture composed of:
 - view logic (components managing application visual presentation)
 - state managment (components managing application state)
 - effects (components managing application side effects)
 - application specific (domain logic)

## Solution in Recycle
Recycle application is composed of components and drivers:
- **Components** are independent units of the app doing most of the work
- **Drivers** are part of the domain logic which are connecting them together

List of components:
- view: `RepoList` **(A)**, `Markdown` **(B)** (managing application visual presentation using React)
- state: `FetchingStatus` **(C)**, `Repos` **(D)** (managing application state)
- effects: `ReadmeFetcher` **(E)** (managing application side effects)

![App structure](https://cloud.githubusercontent.com/assets/1868852/23548181/86f0e176-0006-11e7-853d-ccc926e8605d.png)

### SourceTypes
Every component is independent and isolated, but it still has to communicate with the domain logic.

In a classic React arhitecture, 
for this we use a "top-down" approach where all the data from the domain logic is passed to the root component and than forwarded to its children.
But to make it more convenient, 
this tree hierarchy is sometimes broken by using "workholes" to the domain logic (Redux containers or similar components).

In Recycle, this is done differently.

Basically all components have two sets of inputs:
  - props - used by components organized in a tree hierarchy
  - sources - used by drivers

For example, to render a list of repositores
`RepoList` component needs an array of repositores from the application state (`store$`).
And to dispatch an action when a repository is clicked, it needs `actionTypes` (defined in `config`).

This requirements are defined using `sourceTypes`.

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

When "feeded" by drivers, `sources.store$` and `sources.actionCreators` will be avaiable in the component
actions (managing user behaviour) and reducers (managing component local state).

### Store
Rather than forcing update from the outside (like in Redux arhitecture), 
any time `repos` property is changed, component updates itself. 

## Bonus: Event Sourcing