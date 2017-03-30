# RxJS design patterns for large-scale JavaScript apps
Imagine you are the lead developer for a big company like Facebook.

Hundreds of employees in the company depend on you to make an architecture where
"senior" and "junior" developers can easily contribute.

To make it more interesting,
there are also thousands of developers who want to create their extensions using the application public API.

And yea, there should also be a mobile version of the application as well.

How would you design an architecture for this kind of project?
What programming language and libraries would you use and why?

## Technology requirements
There are many ways one can solve this problem,
but in this repository I will test design patterns which can meet the following conditions:

### JavaScript
Honestly, the main reason why I want to use JavaScript is because it's my favourite programming language.
Luckily, it's also one of the most popular languages used for web browsers, backend services and mobile devices, 
so there should be a way to reuse code across these platforms.

### Functional
Rather than using object-oriented programming, the application needs to be designed using functional programming principles.
If you prefer OOP and wonder why I made this choice, I think [this article](https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3) should clarify it. 

### Observables
Since this should be a modular application, we need a way to communicate between these modules.
For this task, I chose Rx Observable streams.

### Flexible view
For application views, I will mostly use React, but this should not be a requirement.
If someone wants to create a module using a different technology, he should be able to do it.
Application view must not determine the project architecture!

## Contributing
In case you don't agree with my choices and solutions, please share your opinion by opening a new issue.

If you wish to present a solution of your own, you can also send a PR.

## Scalability Index
Before presenting my solution, I what to make clear what I mean by good scalable design.

In short, the application should be created as a set of components,
and the part of the application connecting them together should be as small as possible.

Note that a term "component" indicates an isolated part of the application
(it's a broader concept than "React component").

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

If for example, a component is importing `constants` or `config` in its definition, 
it could be reused in the same application, but it's tightly coupled to that particular environment.

A good case for testing its dependence is: can a specific component be published on npm by its own? 

If the answer is yes, a component is probably independent.

### c(testability) - Component Testability
How easily can you test individual component?
If a component is truly independent, 
there should be no difference on whether it's tested outside or inside of the architecture for which it was initially built.

### sizeOf(domainLogic) - Size of the Domain Logic
The domain is the world your application lives in.
It connects all components together and optionally provides them with the domain logic data, 
so that components could adapt to different environments.

This includes app starting point (`index.js`), config params, constants, etc.

Good scalable architecture keeps this part as small as possible.

## Proposed Solution
This repository is made of different small projects (similar to TodoMVC),
each representing an idea which can be used in a large-scale application.

All of them are made as a combination of **components** (defined in `src/components`) .

When components are combined together, they form a - **module**.

The last project: "`99-large-scale-project`" is an implementation of a large-scale application which the main purpose is to test those ideas.

### 1) A single module
The concept of a component and modules is explained in the first design pattern: [1-single-module](./1-single-module)
