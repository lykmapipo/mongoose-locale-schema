'use strict';


/**
 * @module mongoose-locale-schema
 * @description mongoose schema to support multi-language fields
 * @return {Schema} valid mongoose schema
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 */


//dependencies
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//defaults
const defaults = { type: String, trim: true, required: false, searchable: true };
const locale = ['en'];
const schemaOptions = { timestamps: false, _id: false, id: false };


/**
 * @name localize
 * @type {Function}
 * @description factory to create localized schema fields
 * @param  {Object} [options] valid mongoose schema type options
 * @param  {Array} [options.locales] valid mongoose schema type options
 * @return {Schema} valid mongoose schema
 * @see  {@link http://mongoosejs.com/docs/schematypes.html}
 * @see {@link http://mongoosejs.com/docs/subdocs.html}
 * @author lally elias <lallyelias87@mail.com>
 * @since  0.1.0
 * @version 0.1.0
 * @example
 * const mongoose = require('mongoose');
 * const localize = require('mongoose-locale-schema');
 * const Schema = mongoose.Schema;
 *
 * const Product = new Schema({
 * 	name: localize({type: String, index: true, locales:['en', 'sw']})
 * 	description: localize({
 * 			type: String, 
 * 		 	index: true, 
 * 		  	locales:[{name: 'en', required: true}, {name: 'sw'}]
 * 		})
 * });
 */
module.exports = exports = function localize(optns) {

  //normalize options
  const options = _.merge({}, defaults, optns);


  //prepare & normalize locales
  let locales = _.uniq(_.compact([].concat(options.locales || locale)));
  locales = _.map(locales, function (locale) {
    //handle: string locale definition
    if (_.isString(locale)) {
      return { name: locale, required: false };
    }
    //handle: object locale definition
    else if (_.isPlainObject(locale)) {
      return _.merge({}, { required: false }, locale);
    }
    //ignore: not valid locale definition
    else {
      return undefined;
    }
  });
  locales = _.compact(locales);
  delete options.locales;

  //prepare per locale schema fields
  let fields = {};
  _.forEach(locales, function (locale) {
    fields[locale.name] = _.merge({}, options, _.omit(locale, ['name']));
  });

  //build field as sub-schema
  const schema = new Schema(fields, schemaOptions);

  return schema;

};