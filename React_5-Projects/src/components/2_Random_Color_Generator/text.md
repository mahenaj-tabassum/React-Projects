# Random Color Generator

## Problem Statement
You're having a button, and on click of this button, you have to create a random color (JS).

## Core Concepts

### Base-16 System (Hexadecimal)
Hexadecimal uses digits `0-9` and letters `A-F`, where **A** equals *10* and **F** equals *15*.
- Mixing these values yields over 16 million distinct color possibilities.

### RGB Logic
To get a random color, the logic is:
Generate a random number between 0-255 (256 total values) for **R**, another random number between 0-255 for **G**, and another for **B** — three independent random rolls.