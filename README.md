# Expressionist

[![Build Status](https://travis-ci.org/PatrickHollweck/Expressionist.svg?branch=master)](https://travis-ci.org/PatrickHollweck/Expressionist)

## Introduction

The **Expressionist** is a web-extension that allows you to express yourself better by implementing a text expression evaluator.

### Features

-   Evaluate any javascript expression.
-   Configurable
    -   Keybinds
    -   Start and End characters `{{` and `}}`
-   Super expressive Expressions
    -   Custom text functions
    -   Nested expression
    -   Preprocessors
    -   Aliases
-   Plugins
    -   Custom Transformers
    -   Define your own functions.
-   **Work In Progress** Babel precompilation
    -   Prevent infinite loops.
    -   Use the newest js language features
-   **Work In Progress** Error reporting

### Sample Expressions

-   `{{ 1 + 1 }}` => `2`
    -   Most basic expression
-   `{{ 1 + {{ 2 + 2 }} }}` => `5`
    -   Nested expressions
-   `{{1+{{2+2}}}}` => `5`
    -   Expressions are free-form
-   `{{!repeat 2 Hello World}}` => `Hello World Hello World`
    -   Gets precompiled for convenients
	-   `repeat` is a custom text processing function.
	It receives the string after the call, and in this case it parses the number and repeats the string.
    -   Is equivalent to `{{repeat("2 Hello World");}}`
-   `1+1 = {{1+1}} :)` => `1+1 = 2 :)`
    -   Expressions can be mixed with text

## Build Instructions

#### Setup guide.

1. **Clone this repository to your local drive.**
    - `git clone <repo_url>`
2. **Open a terminal in the cloned foler.**
3. **Install dependencies**
    - `npm install`
4. **Build the project**
    - `npm run build`

#### Load the Extension in a Browser.

1. **Follow the Setup Guide**
2. **Open your browser's extension page** (This example uses chrome)
    - Enable the developer-mode.
    - Choose "Load Unpacked extension"
    - Navigate into the "dist" folder and select it.
3. **Profit**

#### Running Tests

1. **Follow setup instructions**
2. **Run jest**
    - `npm run test`
    - or (for automatically-rerunning the tests when the source changes)
    - `npm run test:watch`
3. **Profit**
