# Readme Fetcher
The app for fetching README.md markdown files for listed repositories.

## Specifications
The main goal of the project is to build a scalable frontend architecture.

The application should be separated in five parts:
- (1) component for displaying a list of repositories
- (2) component for rendering fetched markdown
- part of the app for handling app state:
 - (3) managing repository data (contents of README.md and list of repositories)
 - (4) managing fetching status (is README currently fetching and is it in error state)
- (5) part of the app for making side effects (ajax request)

The app requirements:
- Both (1) and (2) must be able to request fetching of a README.md file
- every part of the application needs to be instantly reusable
- If specific part of the app fails, other parts must still be functional
- possible dispatched action structure must be defined outside the component (no hardcoded strings can be used)
- each part of the app must be easily tested
- each part of the app must be able to be developed in isolation (so it can be publish on npm separately). Which means no config, constants or actions can be imported in any of its files.

Extra points if:
- the app can work offline AND in sync accross multiple clients using websockets or similar communication protocol
(algorithm for making app in sync doesn't have to be perfect or optimised. Proving that it's conceptually possible is enough.)

## Solution in Recycle
This repository is a showcase of a solution for described problem,
created with [Recycle](https://recycle.js.org) (version 2) which is combining React and RxJS.

