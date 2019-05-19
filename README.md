# mongoose-locale-schema

[![Build Status](https://travis-ci.org/lykmapipo/mongoose-locale-schema.svg?branch=master)](https://travis-ci.org/lykmapipo/mongoose-locale-schema)
[![Dependencies Status](https://david-dm.org/lykmapipo/mongoose-locale-schema/status.svg)](https://david-dm.org/lykmapipo/mongoose-locale-schema)
[![npm version](https://badge.fury.io/js/mongoose-locale-schema.svg)](https://badge.fury.io/js/mongoose-locale-schema)

mongoose schema to support multi-locale fields.

*Note: All locales will added as single-embedded document(sub-schema)*

## Requirements
- [NodeJS v8.11.1+](https://nodejs.org)
- [npm v5.6.0+](https://www.npmjs.com/)

## Install
```sh
$ npm install --save mongoose-locale-schema
```

## Usage

```js
const { model, Schema } = require('@lykmapipo/mongoose-common');
const localize = require('mongoose-locale-schema');

// schema definition
const ProductSchema = new Schema({
    name: localize({ locales: ['en', 'sw'] }),
    description: localize({ locales: ['en', 'sw'] })
});
const Product = model('Product', ProductSchema);

// instantiate multiple locales
const product = new Product({
    name: { en: 'Tomato', sw: 'Nyanya' },
    description: { en: 'Best in Town', sw: 'Habari ya Mjini' }
});

// save with multiple locales
product.save((error, saved) => { ... });
```

## Testing
* Clone this repository

* Install all development dependencies
```sh
$ npm install
```
* Then run test
```sh
$ npm test
```

## Contribute
It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## Licence
The MIT License (MIT)

Copyright (c) 2018 lykmapipo & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
