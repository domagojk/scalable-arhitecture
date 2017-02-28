# Markdown Fetcher Challenge
Application for displaying README.md markdown files for listed repositories.

[Demo](https://domagojk.github.io/recycle-markdown-fetcher)

This repository serves as an example on how [Recycle](https://recycle.js.org) (v2), 
can be used for building large scale apps.

However, the following specification also serves as a challenge.
If you wish to solve the challenge by yourself, feel free to post an issue with your solution featuring the library of your choice.

## Scalability Index
The goal is to create a scalabale frontend architecture.

But, in order to do this, we must first define what does it mean for an application to be scalable.

Personally, I'm not aware of any clear way for determening this (if there is one, please let me know).

So, I'm now going to define my own. 

It is based on my personal experience and relatively old [article](https://addyosmani.com/largescalejavascript) from Addy Osmany and even older [presentation](https://www.youtube.com/watch?v=b5pFv9NB9fs) of Nicholas Zakas:

```
                      c(reusability) * c(independence) * c(testability)
scalabilityIndex =  -----------------------------------------------------
                                     sizeOf(domainLogic)

```

### Component Reusability
> If I were to look at the codebase for a large application you or your team were working on and selected a random module, would it be possible for me to easily just drop it into a new page and start using it on its own? [Large Scale JavaScript](https://addyosmani.com/largescalejavascript)

If the answer is yes, a component is probably reusable.

### Component Independence
But, this doesn't mean it's completely independent.

If for example a component is importing `constants` or `actionCreators` in its definition - it's not independent.
Although it can be reused in the same application, it's tightly coupled for that specific enviroment.

A good case for testing its dependence is: can a specific component be published on npm by its own? 

If the answer is yes, a component is probably independent because no files outside of its root directory can be used.

This however, doesn't mean a component should always be defined in a single file.
If a component is composed of multiple child components, 
than the entire hierarchy acts as a single npm package.
Child components in this case can be defined in the same directory, or they can also be imported from npm.

### Component Testability
How easily can you test individual component?
If a component is truly independent, there should be no difference on wether it's tested outside or inside of the architecture for which it was initially built.

### Size of the Domain Logic
Domain is the world your application lives in.
It connects all components together and optionaly provides config params so it can behave differently for different enviroments.

This includes: app starting point (`index.js`), config params, constants (`actionTypes`), action object structure (`actionCreators`), etc.

Good scalabale arhitecture keeps this part as small as possible.

## Challenge Specifications
The application must be separated in five parts:
- **(A)** component for displaying a list of repositories
- **(B)** component for rendering fetched markdown
- isolated parts of the app for handling app state:
 - **(C)** managing repository data (contents of README.md and list of repositories)
 - **(D)** managing fetching status (is README currently fetching and is it in error state)
- **(E)** part of the app for making side effects (ajax request to github API)

The app requirements:
- (1) both **(A)** and **(B)** must be able to request fetching of a README.md file using the same action structure
- (2) each part of the app must be able to be developed in isolation so it is not aware of its enviroment or any other part 
- (3) if specific part of the app fails, other parts must still be functional
- (4) each part of the app must be easily testable and reusable

Bonus requirement:
- (5) the app should work offline AND in sync accross multiple clients using websockets or similar communication protocol
  (algorithm for making app in sync doesn't have to be perfect or optimised. Proving that it's conceptually possible is enough)

## Proposed Arhitecture
There are, of course, different ways of structuring application like this.

This challenge promotes an architecture composed of:
 - view logic (parts for managing application visual presentation) - **(A)**, **(B)**
 - state managment (parts for managing application state) - **(C)**, **(D)**
 - effects (parts for managing application side effects) - **(E)**
 - application specific (domain logic)

All future components should be placed in one of those categories.

## Solution in Recycle
This repository is a showcase of a solution for described problem,
created with [Recycle](https://recycle.js.org) (version 2) which is combining React and RxJS.

