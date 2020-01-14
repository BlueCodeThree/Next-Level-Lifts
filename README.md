# Next Level Lifts

A coding challenge involving writing software for an elevator company

by Carlie Hamilton

## The Challenge

"You are in charge of writing software for an elevator (lift) company.

Your task is to write a program to control the travel of a lift for a 10 storey building.

A passenger can summon the lift to go up or down from any floor. Once in the lift, they can choose the floor they'd like to travel to.

Your program needs to plan the optimal set of instructions for the lift to travel, stop, and open its doors."

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

The idea of this lift was to have a react mostly text-based interface with some buttons. The user would be able to see the status of the lift, and call the lift from any floor at any time.

When the doors of the lift opened, another react component would open displaying the console inside the lift where passengers could enter floors to go to. The console would disappear again after the user chose to close the doors, and the lift would continue to move as per it's instructions.

Ultimately, I went down too many rabbit holes, and decided I needed to simplify what I was doing for this challenge, so I ended up creating another repo and compeleting the challenge in ruby:

[Basic Lifts R Us](https://github.com/BlueCodeThree/basic-lifts-r-us)

### Tests

Tests use Jest.
Although, currently there are no tests...

To test,

`$ cd frontend`

`$ npm test`
