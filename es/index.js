import _ from 'lodash';
import { mergeObjects, uniq } from '@lykmapipo/common';
import { getString, getStrings } from '@lykmapipo/env';
import { createSubSchema } from '@lykmapipo/mongoose-common';

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
const mapLocaleToSchemaTypeOptions = locale => {
  // handle: string locale definition
  if (_.isString(locale)) {
    const required = locale === DEFAULT_LOCALE;
    return { name: locale, required };
  }

  // handle: plain object locale definition
  if (_.isPlainObject(locale)) {
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
 * const mongoose = require('mongoose');
 * const localize = require('mongoose-locale-schema');
 * const Schema = mongoose.Schema;
 *
 *
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
 * const Product = mongoose.model('Product', ProductSchema);
 *
 * const product = new Product({
 *  name: {
 *    en: 'Tomato',
 *    sw: 'Nyanya'
 *  },
 *  description: {
 *    en: 'Best in Town',
 *    sw: 'Habari ya Mjini'
 *  }
 * });
 * product.save(done);
 *
 */
const localize = optns => {
  // normalize options
  const options = mergeObjects(SCHEMATYPE_DEFAULTS, optns);
  const { locales, ...schemaTypeOptions } = options;

  // prepare & normalize locales
  let copyOfLocales = uniq([...(!_.isEmpty(locales) ? locales : LOCALES)]);
  copyOfLocales = _.compact(_.map(copyOfLocales, mapLocaleToSchemaTypeOptions));

  // prepare per locale schema fields
  const fields = {};
  _.forEach(copyOfLocales, locale => {
    const { name, ...localeOptions } = locale;
    fields[name] = mergeObjects(schemaTypeOptions, localeOptions);
  });

  // build fields as sub-schema
  const schema = createSubSchema(fields);

  // return created sub-schema
  return schema;
};

export default localize;
