'use strict';

const lodash = require('lodash');
const common = require('@lykmapipo/common');
const env = require('@lykmapipo/env');
const mongooseCommon = require('@lykmapipo/mongoose-common');

/* prepare */
const DEFAULT_LOCALE = env.getString('DEFAULT_LOCALE', 'en');
const LOCALES = env.getStrings('LOCALES', DEFAULT_LOCALE);
const SCHEMATYPE_DEFAULTS = {
  type: String,
  trim: true,
  required: false,
  searchable: true,
  taggable: true,
};

/**
 * @function mapLocaleToSchemaTypeOptions
 * @name mapLocaleToSchemaTypeOptions
 * @description Map provided locale options to valid schematype options
 * @param {object | string} locale valid locale to use as schema field
 * @returns {object} valid schematype options
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.3.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const options = mapLocaleToSchemaTypeOptions('en');
 * //=> { name: 'en', required: false };
 *
 * const options = mapLocaleToSchemaTypeOptions({name: 'en'});
 * //=> { name: 'en', required: false }
 *
 * const options = mapLocaleToSchemaTypeOptions({name: 'en', required: true });
 * //=> { name: 'en', required: true }
 */
const mapLocaleToSchemaTypeOptions = (locale) => {
  // handle: string locale definition
  if (lodash.isString(locale)) {
    const required = locale === DEFAULT_LOCALE;
    return { name: locale, required };
  }

  // handle: plain object locale definition
  if (lodash.isPlainObject(locale)) {
    const required = locale.name === DEFAULT_LOCALE;
    return common.mergeObjects({ required }, locale);
  }

  // ignore: not valid locale definition
  return undefined;
};

/**
 * @function localize
 * @name localize
 * @description factory to create localized schema fields
 * @param {object} [optns] valid mongoose schema type options
 * @param {Array} [optns.locales] valid mongoose schema type options
 * @returns {object} valid mongoose sub schema
 * @see {@link http://mongoosejs.com/docs/schematypes.html}
 * @see {@link http://mongoosejs.com/docs/subdocs.html}
 * @author lally elias <lallyelias87@mail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.2.0
 * @static
 * @public
 * @example
 *
 * const { model, Schema } = require('@lykmapipo/mongoose-common');
 * const localize = require('mongoose-locale-schema');
 *
 * // schema definition
 * const ProductSchema = new Schema({
 *  name: localize({
 *    type: String,
 *    index: true,
 *    locales:['en', 'sw']
 *  })
 *  description: localize({
 *    type: String,
 *    index: true,
 *    locales:[{name: 'en', required: true}, {name: 'sw'}]
 *   })
 * });
 * const Product = model('Product', ProductSchema);
 *
 * // instantiate multiple locales
 * const product = new Product({
 *  name: { en: 'Tomato', sw: 'Nyanya' },
 *  description: { en: 'Best in Town', sw: 'Habari ya Mjini' }
 * });
 *
 * // save with multiple locales
 * product.save((error, saved)=> { ... });
 */
const localize = (optns) => {
  // normalize options
  const options = common.mergeObjects(SCHEMATYPE_DEFAULTS, optns);
  const { locales, ...schemaTypeOptions } = options;

  // prepare & normalize locales
  let copyOfLocales = common.uniq([...(!lodash.isEmpty(locales) ? locales : LOCALES)]);
  copyOfLocales = common.compact(lodash.map(copyOfLocales, mapLocaleToSchemaTypeOptions));

  // prepare per locale schema fields
  const fields = {};
  lodash.forEach(copyOfLocales, (locale) => {
    const { name, ...localeOptions } = locale;
    fields[name] = common.mergeObjects(schemaTypeOptions, localeOptions);
  });

  // build fields as sub-schema
  const schema = mongooseCommon.createSubSchema(fields);

  // return created sub-schema
  return schema;
};

/**
 * @function unlocalize
 * @name unlocalize
 * @description Flatten a given localized schema path value
 * to unlocalized object
 * @param {string} path prefix to used on unlocalized key
 * @param {object} data object to unlocalized
 * @param {string} separator a valid path separator. Default to `_`
 * @returns {object} unlocalize schema paths
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * const obj = unlocalize('group',{ en: 'One', sw: 'Moja' });
 * // => { group_en: 'One', group_sw: 'Moja' };
 */
const unlocalize = (path, data = {}, separator = '_') => {
  // prepare unlocalized data
  const unlocalized = {};

  // prepare localized
  const localized = mongooseCommon.copyInstance(data);

  // unlocalize each locale for a path
  lodash.forEach(localized, (value, locale) => {
    // handle default locale
    if (locale === DEFAULT_LOCALE) {
      unlocalized[path] = value;
    }

    // handle other locales
    const key = `${path}${separator}${locale}`;
    unlocalized[key] = value;
  });

  // return unlocalized object
  return common.mergeObjects(unlocalized);
};

/**
 * @function localizedKeysFor
 * @name localizedKeysFor
 * @description Generate locale fields name of a given path
 * @param {string} path valid schema path
 * @returns {Array} sorted set of localized fields
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * localizedKeysFor('name');
 * // => ['name.en', 'name.sw']
 */
const localizedKeysFor = (path) => {
  const fields = lodash.map(LOCALES, (locale) => `${path}.${locale}`);
  return common.sortedUniq(fields);
};

/**
 * @function localizedValuesFor
 * @name localizedValuesFor
 * @description Normalize given value to ensure all locales has value
 * @param {object} val valid localized values or schema
 * @returns {object} normalize localized values
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * localizedValuesFor({ en: 'Tomato' });
 * // => {en: 'Tomato', sw: 'Tomato'}
 *
 * localizedValuesFor({ en: 'Tomato', sw: 'Nyanya' });
 * // => {en: 'Tomato', sw: 'Nyanya'}
 */
const localizedValuesFor = (val = {}) => {
  const value = {};
  const defaultValue = val[DEFAULT_LOCALE] || lodash.first(lodash.values(mongooseCommon.copyInstance(val)));
  lodash.forEach(LOCALES, (locale) => {
    value[locale] = common.isNotValue(val[locale]) ? defaultValue : val[locale];
  });
  return value;
};

/**
 * @function localizedAbbreviationsFor
 * @name localizedAbbreviationsFor
 * @description Generate localized abbreviation of a given localize value
 * @param {object} val valid localized values or schema
 * @returns {object} normalize localized abbreviation
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * localizedAbbreviationsFor({ en: 'Tomato' });
 * // => {en: 'T', sw: 'T'}
 *
 * localizedAbbreviationsFor({ en: 'Tomato', sw: 'Nyanya' });
 * // => {en: 'T', sw: 'N'}
 */
const localizedAbbreviationsFor = (val = {}) => {
  const value = {};
  const defaultValue = val[DEFAULT_LOCALE] || lodash.first(lodash.values(mongooseCommon.copyInstance(val)));
  lodash.forEach(LOCALES, (locale) => {
    const abbreviation = common.abbreviate(
      common.isNotValue(val[locale]) ? defaultValue : val[locale]
    );
    value[locale] = abbreviation;
  });
  return common.compact(value);
};

/**
 * @function localizedIndexesFor
 * @name localizedIndexesFor
 * @description Generate index definitions of a given localized path
 * @param {string} path valid schema path
 * @returns {object} index definition
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 *
 * localizedIndexesFor('name');
 * // => { 'name.en': 1 }
 */
const localizedIndexesFor = (path) => {
  const indexes = {};
  lodash.forEach(LOCALES, (locale) => {
    indexes[`${path}.${locale}`] = 1;
  });
  return common.compact(indexes);
};

exports.localize = localize;
exports.localizedAbbreviationsFor = localizedAbbreviationsFor;
exports.localizedIndexesFor = localizedIndexesFor;
exports.localizedKeysFor = localizedKeysFor;
exports.localizedValuesFor = localizedValuesFor;
exports.unlocalize = unlocalize;
