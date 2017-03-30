to be documented...

### Function composition
In functional programming, a building block of an application is, not surprisingly, a **function**.
A function can be defined as a block of code which based on some input produces an output.

![function](https://cloud.githubusercontent.com/assets/1868852/24526055/fb7e2110-159c-11e7-955b-62be4c4db063.png)

If this function is pure (makes no side effects) it can be created as an isolated part of the app which is easily testable and reusable.

This functions are then combined together:

![function composition](https://cloud.githubusercontent.com/assets/1868852/24526491/a4a4957a-159e-11e7-8c08-1c7cfcebaadc.png)

If a second function uses the first function's output as its input,
we are using a principle known as - [function composition](http://mathinsight.org/function_machine_composition).

### Component composition
If you are using React, you are probably aware how powerful this principle can be.

> React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components

So, for its building block, React is (often) not using simple functions, but - components.

A React component is a class which, like a function, recieves an input (props) and produces an output.
But, unlike functions, component it is also capable of producing an output multiple times.