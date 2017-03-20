# The Grand React
This is a short explanation of the project made to complement The Grand React blog post.

To showcase a scenario for handling side effects and managing state,
I had to work with something more complex, so this application is not related to "Picture Gallery" example.

I ended up creating an application for displaying README.md markdown files for listed repositories.

[Demo](https://domagojk.github.io/Markdown-Fetcher-Challenge/).

As explained in detail in its [README](README.md), a project is composed of 5 components:
- **(A)** component for displaying a list of repositories
- **(B)** component for rendering fetched markdown
- isolated parts of the app for handling app state:
 - **(C)** component managing fetching status (is README currently fetching and is it in error state)
 - **(D)** component managing repository data (contents of README.md and list of repositories)
- **(E)** component for making side effects (ajax request to GitHub API)

The main benefit of this approach over classical Redux application is that all components are isolated,
just as Monsieur Gustave and Mr Ivan wanted :)

Most of this is explained in [README](README.md) itself,
so here, I will just briefly go over "The Grand React Hotel" diagram and App structure of this project
presented as following:

![The Grand React](https://cdn-images-1.medium.com/max/1600/1*d08u04TIDN7WbYvL6wmx6g.png)

- Recycle network represents "twitter channels" which guests can subscribe to. These are: store stream, action stream and config (drivers).
- "Container room" represents React components that had requested access to state stream: **(A)** **(B)**
- "Redux room" represents components for managing app state: **(C)**, **(D)**
- "Ajax room" represents components for managing side effects **(E)**

![App structure](https://cloud.githubusercontent.com/assets/1868852/23548181/86f0e176-0006-11e7-853d-ccc926e8605d.png)
