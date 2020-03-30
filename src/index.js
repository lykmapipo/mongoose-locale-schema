import {
  first,
  forEach,
  isEmpty,
  isString,
  isPlainObject,
  map,
  values,
} from 'lodash';
import {
  compact,
  isNotValue,
  mergeObjects,
  uniq,
  sortedUniq,
  abbreviate,
} from '@lykmapipo/common';
import { getString, getStrings } from '@lykmapipo/env';
import { createSubSchema, copyInstance } from '@lykmapipo/mongoose-common';

/* prepare */
const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');
const LOCALES = getStrings('LOCALES', DEFAULT_LOCALE);
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
 * @param {Object|String} locale valid locale to use as schema field
 * @return {Object} valid schematype options
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
 *
 */
const mapLocaleToSchemaTypeOptions = (locale) => {
  // handle: string locale definition
  if (isString(locale)) {
    const required = locale === DEFAULT_LOCALE;
    return { name: locale, required };
  }

  // handle: plain object locale definition
  if (isPlainObject(locale)) {
    const required = locale.name === DEFAULT_LOCALE;
    return mergeObjects({ required }, locale);
  }

  // ignore: not valid locale definition
  return undefined;
};

/**
 * @function localize
 * @name localize
 * @description factory to create localized schema fields
 * @param {Object} [options] valid mongoose schema type options
 * @param {Array} [options.locales] valid mongoose schema type options
 * @return {Schema} valid mongoose sub schema
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
 *
 */
export const localize = (optns) => {
  // normalize options
  const options = mergeObjects(SCHEMATYPE_DEFAULTS, optns);
  const { locales, ...schemaTypeOptions } = options;

  // prepare & normalize locales
  let copyOfLocales = uniq([...(!isEmpty(locales) ? locales : LOCALES)]);
  copyOfLocales = compact(map(copyOfLocales, mapLocaleToSchemaTypeOptions));

  // prepare per locale schema fields
  const fields = {};
  forEach(copyOfLocales, (locale) => {
    const { name, ...localeOptions } = locale;
    fields[name] = mergeObjects(schemaTypeOptions, localeOptions);
  });

  // build fields as sub-schema
  const schema = createSubSchema(fields);

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
export const unlocalize = (path, data = {}, separator = '_') => {
  // prepare unlocalized data
  const unlocalized = {};

  // prepare localized
  const localized = copyInstance(data);

  // unlocalize each locale for a path
  forEach(localized, (value, locale) => {
    // handle default locale
    if (locale === DEFAULT_LOCALE) {
      unlocalized[path] = value;
    }

    // handle other locales
    const key = `${path}${separator}${locale}`;
    unlocalized[key] = value;
  });

  // return unlocalized object
  return mergeObjects(unlocalized);
};

/**
 * @function localizedKeysFor
 * @name localizedKeysFor
 * @description Generate locale fields name of a given path
 * @param {String} path valid schema path
 * @return {Array} sorted set of localized fields
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
 *
 */
export const localizedKeysFor = (path) => {
  const fields = map(LOCALES, (locale) => `${path}.${locale}`);
  return sortedUniq(fields);
};

/**
 * @function localizedValuesFor
 * @name localizedValuesFor
 * @description Normalize given value to ensure all locales has value
 * @param {Object|Schema} value valid localized values
 * @return {Object} normalize localized values
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
 *
 */
export const localizedValuesFor = (val = {}) => {
  const value = {};
  const defaultValue = val[DEFAULT_LOCALE] || first(values(copyInstance(val)));
  forEach(LOCALES, (locale) => {
    value[locale] = isNotValue(val[locale]) ? defaultValue : val[locale];
  });
  return value;
};

/**
 * @function localizedAbbreviationsFor
 * @name localizedAbbreviationsFor
 * @description Generate localized abbreviation of a given localize value
 * @param {Object|Schema} value valid localized values
 * @return {Object} normalize localized abbreviation
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
 *
 */
export const localizedAbbreviationsFor = (val = {}) => {
  const value = {};
  const defaultValue = val[DEFAULT_LOCALE] || first(values(copyInstance(val)));
  forEach(LOCALES, (locale) => {
    const abbreviation = abbreviate(
      isNotValue(val[locale]) ? defaultValue : val[locale]
    );
    value[locale] = abbreviation;
  });
  return compact(value);
};

/**
 * @function localizedIndexesFor
 * @name localizedIndexesFor
 * @description Generate index definitions of a given localized path
 * @return {Object} index definition
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
 *
 */
export const localizedIndexesFor = (path) => {
  const indexes = {};
  forEach(LOCALES, (locale) => {
    indexes[`${path}.${locale}`] = 1;
  });
  return compact(indexes);
};
