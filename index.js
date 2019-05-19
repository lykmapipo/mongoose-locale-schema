'use strict';

/* dependencies */
const _ = require('lodash');
const { mergeObjects, uniq } = require('@lykmapipo/common');
const { getString, getStrings } = require('@lykmapipo/env');
const { createSubSchema } = require('@lykmapipo/mongoose-common');


/* prepare */
const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');
const LOCALES = getStrings('LOCALES', DEFAULT_LOCALE);
const SCHEMATYPE_DEFAULTS = {
  type: String,
  trim: true,
  required: false,
  searchable: true,
  taggable: true
};


/**
 * @name localize
 * @type {Function}
 * @description factory to create localized schema fields
 * @param {Object} [options] valid mongoose schema type options
 * @param {Array} [options.locales] valid mongoose schema type options
 * @return {Schema} valid mongoose schema
 * @see {@link http://mongoosejs.com/docs/schematypes.html}
 * @see {@link http://mongoosejs.com/docs/subdocs.html}
 * @author lally elias <lallyelias87@mail.com>
 * @since 0.1.0
 * @version 0.1.0
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
module.exports = exports = function localize(optns) {

  // normalize options
  const options = mergeObjects(SCHEMATYPE_DEFAULTS, optns);

  // prepare & normalize locales
  let locales = uniq([].concat(options.locales || LOCALES));
  locales = _.map(locales, function (locale) {
    // handle: string locale definition
    if (_.isString(locale)) {
      return { name: locale, required: false };
    }
    // handle: object locale definition
    else if (_.isPlainObject(locale)) {
      return mergeObjects({ required: false }, locale);
    }
    // ignore: not valid locale definition
    else {
      return undefined;
    }
  });
  locales = _.compact(locales);
  delete options.locales;

  // prepare per locale schema fields
  let fields = {};
  _.forEach(locales, function (locale) {
    fields[locale.name] = mergeObjects(options, _.omit(locale, ['name']));
  });

  // build field as sub-schema
  const schema = createSubSchema(fields);

  return schema;

};