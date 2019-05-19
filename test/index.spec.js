'use strict';


//dependencies
const { expect } = require('@lykmapipo/mongoose-test-helpers');
const path = require('path');
const localize = require(path.join(__dirname, '..'));


describe('localize', function () {

  it('should be a factory function', function () {
    expect(localize).to.exist;
    expect(localize).to.be.a('function');
    expect(localize.name).to.be.equal('localize');
    expect(localize.length).to.be.equal(1);
  });

  it('should build field with default options', function () {
    const field = localize();
    expect(field.constructor).to.exist;
    expect(field.constructor.name).to.be.equal('Schema');

    const en = field.tree.en;
    const instance = field.paths.en.instance;

    expect(instance).to.be.equal('String');
    expect(en).to.exist;
    expect(en).to.be.an('object');
    expect(en.type).to.be.a('function');
    expect(en.type.name).to.be.equal('String');
    expect(en.required).to.be.false;
    expect(en.trim).to.be.true;
    expect(en.index).to.be.undefined;
    expect(en.searchable).to.be.true;

  });

  it('should build field with specified locale', function () {
    const field = localize({ locales: ['sw'] });
    expect(field.constructor).to.exist;
    expect(field.constructor.name).to.be.equal('Schema');

    const sw = field.tree.sw;
    const instance = field.paths.sw.instance;

    expect(instance).to.be.equal('String');
    expect(sw).to.exist;
    expect(sw).to.be.an('object');
    expect(sw.type).to.be.a('function');
    expect(sw.type.name).to.be.equal('String');
    expect(sw.required).to.be.false;
    expect(sw.trim).to.be.true;
    expect(sw.index).to.be.undefined;
    expect(sw.searchable).to.be.true;

  });

  it('should build field with multiple locales', function () {
    const field = localize({ locales: ['en', 'sw'] });
    expect(field.constructor).to.exist;
    expect(field.constructor.name).to.be.equal('Schema');

    const en = field.tree.en;
    let instance = field.paths.en.instance;

    expect(instance).to.be.equal('String');
    expect(en).to.exist;
    expect(en).to.be.an('object');
    expect(en.type).to.be.a('function');
    expect(en.type.name).to.be.equal('String');
    expect(en.required).to.be.false;
    expect(en.trim).to.be.true;
    expect(en.index).to.be.undefined;
    expect(en.searchable).to.be.true;

    const sw = field.tree.sw;
    instance = field.paths.sw.instance;

    expect(instance).to.be.equal('String');
    expect(sw).to.exist;
    expect(sw).to.be.an('object');
    expect(sw.type).to.be.a('function');
    expect(sw.type.name).to.be.equal('String');
    expect(sw.required).to.be.false;
    expect(sw.trim).to.be.true;
    expect(sw.index).to.be.undefined;
    expect(sw.searchable).to.be.true;

  });

  it('should build field with multiple locales', function () {
    const field = localize({ index: true, locales: ['en', 'sw'] });
    expect(field.constructor).to.exist;
    expect(field.constructor.name).to.be.equal('Schema');

    const en = field.tree.en;
    let instance = field.paths.en.instance;

    expect(instance).to.be.equal('String');
    expect(en).to.exist;
    expect(en).to.be.an('object');
    expect(en.type).to.be.a('function');
    expect(en.type.name).to.be.equal('String');
    expect(en.required).to.be.false;
    expect(en.trim).to.be.true;
    expect(en.index).to.be.true;
    expect(en.searchable).to.be.true;

    const sw = field.tree.sw;
    instance = field.paths.sw.instance;

    expect(instance).to.be.equal('String');
    expect(sw).to.exist;
    expect(sw).to.be.an('object');
    expect(sw.type).to.be.a('function');
    expect(sw.type.name).to.be.equal('String');
    expect(sw.required).to.be.false;
    expect(sw.trim).to.be.true;
    expect(sw.index).to.be.true;
    expect(sw.searchable).to.be.true;

  });

  it('should build field with multiple locales', function () {
    const field = localize({
      index: true,
      locales: [
        { name: 'en', required: true },
        { name: 'sw' }
      ]
    });
    expect(field.constructor).to.exist;
    expect(field.constructor.name).to.be.equal('Schema');

    const en = field.tree.en;
    let instance = field.paths.en.instance;

    expect(instance).to.be.equal('String');
    expect(en).to.exist;
    expect(en).to.be.an('object');
    expect(en.type).to.be.a('function');
    expect(en.type.name).to.be.equal('String');
    expect(en.required).to.be.true;
    expect(en.trim).to.be.true;
    expect(en.index).to.be.true;
    expect(en.searchable).to.be.true;

    const sw = field.tree.sw;
    instance = field.paths.sw.instance;

    expect(instance).to.be.equal('String');
    expect(sw).to.exist;
    expect(sw).to.be.an('object');
    expect(sw.type).to.be.a('function');
    expect(sw.type.name).to.be.equal('String');
    expect(sw.required).to.be.false;
    expect(sw.trim).to.be.true;
    expect(sw.index).to.be.true;
    expect(sw.searchable).to.be.true;

  });

  it('should build field with multiple locales', function () {
    const field = localize({
      locales: [
        { name: 'en', required: true, index: true },
        { name: 'sw' }
      ]
    });
    expect(field.constructor).to.exist;
    expect(field.constructor.name).to.be.equal('Schema');

    const en = field.tree.en;
    let instance = field.paths.en.instance;

    expect(instance).to.be.equal('String');
    expect(en).to.exist;
    expect(en).to.be.an('object');
    expect(en.type).to.be.a('function');
    expect(en.type.name).to.be.equal('String');
    expect(en.required).to.be.true;
    expect(en.trim).to.be.true;
    expect(en.index).to.be.true;
    expect(en.searchable).to.be.true;

    const sw = field.tree.sw;
    instance = field.paths.sw.instance;

    expect(instance).to.be.equal('String');
    expect(sw).to.exist;
    expect(sw).to.be.an('object');
    expect(sw.type).to.be.a('function');
    expect(sw.type.name).to.be.equal('String');
    expect(sw.required).to.be.false;
    expect(sw.trim).to.be.true;
    expect(sw.index).to.be.undefined;
    expect(sw.searchable).to.be.true;

  });

});