# Overview

json-parser is a simple json utiltiy, supporting two methods:

* json-parser.parse(value, reviver) - Converts a JSON string into a JavaScript value or object
* json-parser.stringify(value, replacer, space) - Converts a Javacript value or object into a json string. Currently uses the native javascript JSON.stringify method

# json-parser.parse()

## Description

The parse method will tranform a json string into a javascript expression. It's mostly compliant with the [Grammer Outlined on Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON#full_json_grammar). However, I still need to add support for numbers represented as exponents e.g. 1e3 and must do further testing on whitespace handling.

## Usage

```js
const {
    parse,
} = require('json-parser');

parse(jsonValue);

parse(jsonValue, (key, value) => {
    return value;
});

```
