# AGE-Viewer-2.0 beta (WIP)

## Introduction
this project is a viewer for Apache AGE,
AGE is a graph database that is postgresql extension, and this viewer is a desktop application that can be used to visualize the graph data stored in AGE.

It will be developed to support Mac OS X, Windows, and Linux.

## Architecture (WIP)
1. next js + electron + react + typescript (template: https://github.com/saltyshiomix/nextron) 
2. IPC (inter-process communication) between electron and react
3. using sqlite3 for storing data for application state
4. using chakra-ui for UI components

## How to run
1. clone this repository
2. run `yarn install`
3. run `yarn dev`


