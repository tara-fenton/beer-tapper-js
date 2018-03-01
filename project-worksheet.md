# Project Overview

## Project Schedule

This schedule will be used to keep track of your progress throughout the week and align with our expectations.

You are **responsible** for scheduling time with your squad to seek approval for each deliverable by the end of the corresponding day, excluding `Saturday` and `Sunday`.

| Day              | Deliverable                                   |
| ---------------- | --------------------------------------------- |
| Day 1: Tuesday   | Game Idea                                     |
| Day 2: Wednesday | Completed wireframes and prioritized features |
| Day 3: Thursday  | Pseudocode                                    |
| Day 4: Friday    | Basic Clickable Model                         |
| Day 5: Saturday  | Working Prototype                             |
| Day 6: Sunday    | Game Completed / Slides                       |
| Day 7: Monday    | Project Presentations                         |

## Project Description

Use this section to describe your final project and perhaps any links to relevant sites that help convey the concept and\or functionality

https://www.youtube.com/watch?v=naremP5nL3w
http://www.classicgaming.cc/classics/tapper/play-guide

## Priority Matrix

Include a full list of features that have been prioritized based on the `Time and Importance` Matix.

## MVP

Include the full list of features that will be part of your MVP

<!-- Two views: a landing view (1 player button) and a game view -->

PHASE ONE
Game view: One row, one bartender, one customer, one beer

Starting with very basic graphics I will first create the basic functionality and then expand.
A brown rectangle for the row
A purple square for bartender
The customer will be a red square moving to the right
Spacebar will trigger the beer to appear, a small white square
The beer will be white for 2 seconds and change to yellow before it will be sent down the row
The beer will collide with customer
The customer will change to green and start moving to the left

## POST MVP

Include the full list of features that you are considering for POST MVP

PHASE TWO
Expand the game view: Four rows, one bartender, several customers, several beers

Create four rows and four taps
The bartender will be able to:

* move through the rows
* loop around from the bottom to the top and from the top to the bottom
* move to the left to catch a beer glass
* jump back to tap by pouring (space bar)
* stop pouring by moving to another row
  Several customers & beers:
* one per row will appear for level 1, two per row for level 2

PHASE THREE
Ways to lose a guy:
Customer makes it to the end of the row without getting a beer
Bartender sent too many beers
Bartender does not collect the empty glass
Points:
Add points to events
Add points display

PHASE FOUR
Landing Page: 1 player button, instructions button
Form:
Scoreboard initals input - input text field and button
CSS:
CSS transition: Beer fills glass - fired by a DOM event
Media query for tablet
Style form, landing page, and game page with class-based CSS.
STYLE GAME

PHASE FIVE ### optional
Landing Page: add 2 player button
Game view: 2 player logic, Bonus round
Ways to lose a guy:
Music is on and customers start dancing and beer was served
Points:
Sometimes there is money on bar for tip

## Wireframes

Include images of your wireframes.

## Game Components

### Landing Page

What will a player see when they start your game?

Intro landing screen with a button for the rules to be displayed on a seperate screen
Buttons for 1 player or 2 players

### Game Initialization

What will a player see when the game is started?
Four rows of bars
On the left of each row will be an opening that customers will come out of
On the right of each row will a be a tap graphic
The bartender will be able to move (see rules)

### Playing The Game

What will be the flow of the game, what will the user be expected to do and what will the user expect from the gam

Rules:
Bartender moves up and down between the four rows of bars.

* Can also loop around from the bottom to the top and from the top to the bottom
* Can move to the left to catch a beer
* Can jump back to tap by pouring key (research)
* Can stop pouring by moving to another row

Ways to lose a guy:
Customer makes it to the end of the row without getting a beer
Bartender sent too many beers
Bartender does not collect the empty glass
Music is on and customers start dancing and beer was served

Levels 1 & 2
States:
Customer comes to row - level 2 sends two customers
Bartender pours beer
Bartender sends beer
Customer gets beer
Customer drinks beer
Customer sends empty glass
Bartender must catch glass
Sometimes there is money on bar for tip ### optional

Points:
50 Points for each saloon patron you send off his aisle
100 Points for each empty mug you pick up
1500 Points for each tip you pick up
1000 Points for completing a level
Bonus Level 3000 Points for getting the bonus level right

Bonus Round - Suds
There are 6 beer cans on the screen
All but one is shaken by a bad guy
Then the cans are shuffled fast
You have one chance to select the one that doesn't spray is the bonus

### Winning The Game

What does it look like when the game ends, what determines winning or losing?

There is no winning, you get a score.
When the game ends the screen will display a scoreboard you can input 3 initals, there will be 5 spots for scores
2 players? not sure if the game displays who one the game (research)

### Game Reset

How will the user restart the game once it has been completed.

Insert Quarter (text on button)

## Functional Components

Based on the initial logic defined in the previous game phases section try and breakdown the logic further into functional components, and by that we mean functions. Does your logic indicate that code could be encapsulated for the purpose of reusablility. Once a function has been defined it can then be incorporated into a class as a method.

Time frames are also key in the development cycle. You have limited time to code all phases of the game. Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted.

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --------- | :------: | :------------: | :------------: | :---------: |
| PHASE 1   |    H     |      7hrs      |      hrs       |     hrs     |
| PHASE 2   |    H     |      7hrs      |      hrs       |     hrs     |
| PHASE 3   |    H     |      5hrs      |      hrs       |     hrs     |
| PHASE 4   |    M     |     12hrs      |      hrs       |     hrs     |
| PHASE 5   |    L     |      9hrs      |      hrs       |     hrs     |

## Helper Functions

Helper functions should be generic enought that they can be reused in other applications. Use this section to document all helper functions that fall into this category.

| Function   |                    Description                    |
| ---------- | :-----------------------------------------------: |
| Capitalize | This will capitalize the first letter in a string |

## Additional Libraries

Use this section to list all supporting libraries and thier role in the project.

## jQuery Discoveries

Use this section to list some, but not all, of the jQuery methods and\or functionality discovered while working on this project.

## Change Log

Use this section to document what changes were made and the reasoning behind those changes.

## Issues and Resolutions

Use this section to list of all major issues encountered and their resolution.

#### SAMPLE.....

**ERROR**: app.js:34 Uncaught SyntaxError: Unexpected identifier  
**RESOLUTION**: Missing comma after first object in sources {} object
