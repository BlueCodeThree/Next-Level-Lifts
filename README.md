# Next Level Lifts

A coding challenge involving writing software for an elevator company

by Carlie Hamilton

## The Challenge

"You are in charge of writing software for an elevator (lift) company.

Your task is to write a program to control the travel of a lift for a 10 storey building.

A passenger can summon the lift to go up or down from any floor. Once in the lift, they can choose the floor they'd like to travel to.

Your program needs to plan the optimal set of instructions for the lift to travel, stop, and open its doors."

## Design Choices

* Floors will be numbered 1-10, with no ground floor.

## Tech Stack

React with Typescript - using [Create React App](https://github.com/facebook/create-react-app)

## Installation

Fork or clone this repository.

`$ cd frontend`

`$ npm install`

This should install all the dependencies.

## How To Use

To run this, you need to be in the `frontend` directory.

`$ cd frontend`

`$ npm start`

This will start the development server. When the typescript compiles, the website will open in your browser.

## Design Choices

I decided to make it so that the lift goes up to every floor and then down to every floor, as a future enhancement I would make it so that the lift would stop at a floor if it didn't need to go any further up. 

### Tests

Tests use Jest.

To test,

`$ cd frontend`

`$ npm test`
