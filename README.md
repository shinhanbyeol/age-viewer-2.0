# AGE-Viewer-2.0 beta (WIP)

## Introduction

this project is a viewer for Apache AGE,
AGE is a graph database that is postgresql extension, and this viewer is a desktop application that can be used to visualize the graph data stored in AGE.

It will be developed to support Mac OS X, Windows, and Linux.

## Architecture (WIP)

1. next js + electron + react + typescript (template: https:github.com/saltyshiomix/nextron)
2. IPC (inter-process communication) between electron and react
3. using sqlite3 for storing data for application state
4. using chakra-ui for UI components

## How to run

1. clone this repository
2. run `yarn install`
3. run `yarn dev`

## Code convention

- String is in single quotes (') <br/>
  문자열은 홀따옴표(')로

- With a semicolon at the end of the code. <br/>
  코드 마지막에 세미콜른이 있게

- Do not use tabs and replace them with space bars. <br/>
  탭의 사용을 금하고 스페이스바 사용으로 대체하게

- Indentation width of 2 spaces <br/>
  들여쓰기 너비는 2칸

- When you create an object or array, you also put a comma on the element or on the back of the key-value. </br>
  객체나 배열을 작성 할 때, 원소 혹은 key-value의 맨 뒤에 있는 것에도 쉼표를 붙임

- One line of code is maximum 80 spaces </br>
  코드 한줄이 maximum 80칸

## Contributors, and Contributions

1. If you have a code that you want to contribute to, pull request
   >  기여하고자 하는 코드가 있다면 pull request 하세요
3. Please write a title and message for the pull request squash.
   > pull request 할 때 squash를 위한 제목과 메시지를 작성하여 부탁드립니다.

