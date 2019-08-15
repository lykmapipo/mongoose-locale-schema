#### mapLocaleToSchemaTypeOptions(locale) 

Map provided locale options to valid schematype options




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| locale | `Object` `String`  | valid locale to use as schema field | &nbsp; |




##### Examples

```javascript

const options = mapLocaleToSchemaTypeOptions('en');
//=> { name: 'en', required: false };

const options = mapLocaleToSchemaTypeOptions({name: 'en'});
//=> { name: 'en', required: false }

const options = mapLocaleToSchemaTypeOptions({name: 'en', required: true });
//=> { name: 'en', required: true }
```


##### Returns


- `Object`  valid schematype options



#### localize([options]) 

factory to create localized schema fields




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| options | `Object`  | valid mongoose schema type options | *Optional* |
| options.locales | `Array`  | valid mongoose schema type options | *Optional* |




##### Examples

```javascript

const { model, Schema } = require('@lykmapipo/mongoose-common');
const localize = require('mongoose-locale-schema');

// schema definition
const ProductSchema = new Schema({
 name: localize({
   type: String,
   index: true,
   locales:['en', 'sw']
 })
 description: localize({
   type: String,
   index: true,
   locales:[{name: 'en', required: true}, {name: 'sw'}]
  })
});
const Product = model('Product', ProductSchema);

// instantiate multiple locales
const product = new Product({
 name: { en: 'Tomato', sw: 'Nyanya' },
 description: { en: 'Best in Town', sw: 'Habari ya Mjini' }
});

// save with multiple locales
product.save((error, saved)=> { ... });
```


##### Returns


- `Schema`  valid mongoose sub schema



#### unlocalize(path, data) 

Flatten a given localized schema path value to unlocalized object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `string`  | prefix to used on unlocalized key | &nbsp; |
| data | `object`  | object to unlocalized | &nbsp; |




##### Examples

```javascript

const obj = unlocalize('group',{ en: 'One', sw: 'Moja' });
// => { group_en: 'One', group_sw: 'Moja' };
```


##### Returns


- `object`  unlocalize schema paths



#### localizedKeysFor(path) 

Generate locale fields name of a given path




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| path | `String`  | valid schema path | &nbsp; |




##### Examples

```javascript

localizedKeysFor('name');
// => ['name.en', 'name.sw']
```


##### Returns


- `Array`  sorted set of localized fields



#### localizedValuesFor(value) 

Normalize given value to ensure all locales has value




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `Object` `Schema`  | valid localized values | &nbsp; |




##### Examples

```javascript

localizedValuesFor({ en: 'Tomato' });
// => {en: 'Tomato', sw: 'Tomato'}

localizedValuesFor({ en: 'Tomato', sw: 'Nyanya' });
// => {en: 'Tomato', sw: 'Nyanya'}
```


##### Returns


- `Object`  normalize localized values



#### localizedAbbreviationsFor(value) 

Generate localized abbreviation of a given localize value




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `Object` `Schema`  | valid localized values | &nbsp; |




##### Examples

```javascript

localizedAbbreviationsFor({ en: 'Tomato' });
// => {en: 'T', sw: 'T'}

localizedAbbreviationsFor({ en: 'Tomato', sw: 'Nyanya' });
// => {en: 'T', sw: 'N'}
```


##### Returns


- `Object`  normalize localized abbreviation



#### localizedIndexesFor() 

Generate index definitions of a given localized path






##### Examples

```javascript

localizedIndexesFor('name');
// => { 'name.en': 1 }
```


##### Returns


- `Object`  index definition




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
