import { SchemaTypes, Schema } from '@lykmapipo/mongoose-common';
import { expect, faker } from '@lykmapipo/mongoose-test-helpers';
import {
  localize,
  unlocalize,
  localizedKeysFor,
  localizedValuesFor,
  localizedAbbreviationsFor,
  localizedIndexesFor,
} from '../src/index';

describe('localize', () => {
  it('should be a factory function', () => {
    expect(localize).to.exist;
    expect(localize).to.be.a('function');
    expect(localize.name).to.be.equal('localize');
    expect(localize.length).to.be.equal(1);
  });

  it('should build fields with default options', () => {
    const fields = localize();
    expect(fields).to.be.an.instanceof(Schema);

    const en = fields.path('en');

    expect(en).to.exist;
    expect(en).to.be.an.instanceof(SchemaTypes.String);
    expect(en.options.type).to.be.a('function');
    expect(en.options.type.name).to.be.equal('String');
    expect(en.options.required).to.be.true;
    expect(en.options.trim).to.be.true;
    expect(en.options.index).to.be.undefined;
    expect(en.options.searchable).to.be.true;
    expect(en.options.taggable).to.be.true;
  });

  it('should build fields with specified locale', () => {
    const fields = localize({ locales: ['sw'] });
    expect(fields).to.be.an.instanceof(Schema);

    const sw = fields.path('sw');

    expect(sw).to.exist;
    expect(sw).to.be.an.instanceof(SchemaTypes.String);
    expect(sw.options.type).to.be.a('function');
    expect(sw.options.type.name).to.be.equal('String');
    expect(sw.options.required).to.be.false;
    expect(sw.options.trim).to.be.true;
    expect(sw.options.index).to.be.undefined;
    expect(sw.options.searchable).to.be.true;
    expect(sw.options.taggable).to.be.true;
  });

  it('should build fields with multiple locales', () => {
    const fields = localize({ locales: ['en', 'sw'] });
    expect(fields).to.be.an.instanceof(Schema);

    const en = fields.path('en');

    expect(en).to.exist;
    expect(en).to.be.an.instanceof(SchemaTypes.String);
    expect(en.options.type).to.be.a('function');
    expect(en.options.type.name).to.be.equal('String');
    expect(en.options.required).to.be.true;
    expect(en.options.trim).to.be.true;
    expect(en.options.index).to.be.undefined;
    expect(en.options.searchable).to.be.true;
    expect(en.options.taggable).to.be.true;

    const sw = fields.path('sw');

    expect(sw).to.exist;
    expect(sw).to.be.an.instanceof(SchemaTypes.String);
    expect(sw.options.type).to.be.a('function');
    expect(sw.options.type.name).to.be.equal('String');
    expect(sw.options.required).to.be.false;
    expect(sw.options.trim).to.be.true;
    expect(sw.options.index).to.be.undefined;
    expect(sw.options.searchable).to.be.true;
    expect(sw.options.taggable).to.be.true;
  });

  it('should build fields with multiple locales', () => {
    const fields = localize({ index: true, locales: ['en', 'sw'] });
    expect(fields).to.be.an.instanceof(Schema);

    const en = fields.path('en');

    expect(en).to.exist;
    expect(en).to.be.an.instanceof(SchemaTypes.String);
    expect(en.options.type).to.be.a('function');
    expect(en.options.type.name).to.be.equal('String');
    expect(en.options.required).to.be.true;
    expect(en.options.trim).to.be.true;
    expect(en.options.index).to.be.true;
    expect(en.options.searchable).to.be.true;
    expect(en.options.taggable).to.be.true;

    const sw = fields.path('sw');

    expect(sw).to.exist;
    expect(sw).to.be.an.instanceof(SchemaTypes.String);
    expect(sw.options.type).to.be.a('function');
    expect(sw.options.type.name).to.be.equal('String');
    expect(sw.options.required).to.be.false;
    expect(sw.options.trim).to.be.true;
    expect(sw.options.index).to.be.true;
    expect(sw.options.searchable).to.be.true;
    expect(sw.options.taggable).to.be.true;
  });

  it('should build fields with multiple locales', () => {
    const fields = localize({
      index: true,
      locales: [{ name: 'en', required: true }, { name: 'sw' }],
    });
    expect(fields).to.be.an.instanceof(Schema);

    const en = fields.path('en');

    expect(en).to.exist;
    expect(en).to.be.an.instanceof(SchemaTypes.String);
    expect(en.options.type).to.be.a('function');
    expect(en.options.type.name).to.be.equal('String');
    expect(en.options.required).to.be.true;
    expect(en.options.trim).to.be.true;
    expect(en.options.index).to.be.true;
    expect(en.options.searchable).to.be.true;
    expect(en.options.taggable).to.be.true;

    const sw = fields.path('sw');

    expect(sw).to.exist;
    expect(sw).to.be.an.instanceof(SchemaTypes.String);
    expect(sw.options.type).to.be.a('function');
    expect(sw.options.type.name).to.be.equal('String');
    expect(sw.options.required).to.be.false;
    expect(sw.options.trim).to.be.true;
    expect(sw.options.index).to.be.true;
    expect(sw.options.searchable).to.be.true;
    expect(sw.options.taggable).to.be.true;
  });

  it('should build fields with multiple locales', () => {
    const fields = localize({
      locales: [{ name: 'en', required: true, index: true }, { name: 'sw' }],
    });
    expect(fields).to.be.an.instanceof(Schema);

    const en = fields.path('en');

    expect(en).to.exist;
    expect(en).to.be.an.instanceof(SchemaTypes.String);
    expect(en.options.type).to.be.a('function');
    expect(en.options.type.name).to.be.equal('String');
    expect(en.options.required).to.be.true;
    expect(en.options.trim).to.be.true;
    expect(en.options.index).to.be.true;
    expect(en.options.searchable).to.be.true;
    expect(en.options.taggable).to.be.true;

    const sw = fields.path('sw');

    expect(sw).to.exist;
    expect(sw).to.be.an.instanceof(SchemaTypes.String);
    expect(sw.options.type).to.be.a('function');
    expect(sw.options.type.name).to.be.equal('String');
    expect(sw.options.required).to.be.false;
    expect(sw.options.trim).to.be.true;
    expect(sw.options.index).to.be.undefined;
    expect(sw.options.searchable).to.be.true;
    expect(sw.options.taggable).to.be.true;
  });

  it('should unlocalize localize schema path', () => {
    const object = { en: 'Hello', sw: 'Mambo' };
    const unlocalized = unlocalize('greeting', object);
    expect(unlocalized).to.exist;
    expect(unlocalized).to.have.property('greeting');
    expect(unlocalized).to.have.property('greeting_en');
    expect(unlocalized).to.have.property('greeting_sw');
  });

  it('should generate path localized field names', () => {
    expect(localizedKeysFor).to.exist;
    expect(localizedKeysFor).to.be.a('function');

    const names = localizedKeysFor('name');
    expect(names).to.exist.and.be.an('array');
    expect(names).to.contain('name.en');
  });

  it('should normalize value for all locales', () => {
    expect(localizedValuesFor).to.exist;
    expect(localizedValuesFor).to.be.a('function');

    let val = { en: faker.name.findName() };
    let value = localizedValuesFor(val);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.be.eql(val.en);
    expect(value.sw).to.be.eql(val.en);

    val = { sw: faker.name.findName() };
    value = localizedValuesFor(val);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.be.eql(val.sw);
    expect(value.sw).to.be.eql(val.sw);

    val = { en: faker.name.findName(), sw: faker.name.findName() };
    value = localizedValuesFor(val);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.be.eql(val.en);
    expect(value.sw).to.be.eql(val.sw);

    value = localizedValuesFor(undefined);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.not.exist;
    expect(value.sw).to.not.exist;
  });

  it('should abbreveate a localized value', () => {
    expect(localizedAbbreviationsFor).to.exist;
    expect(localizedAbbreviationsFor).to.be.a('function');

    let val = { en: 'Tomato' };
    let value = localizedAbbreviationsFor(val);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.be.eql('T');
    expect(value.sw).to.be.eql('T');

    val = { sw: 'Nyanya' };
    value = localizedAbbreviationsFor(val);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.be.eql('N');
    expect(value.sw).to.be.eql('N');

    val = { en: 'Tomato', sw: 'Nyanya' };
    value = localizedAbbreviationsFor(val);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.be.eql('T');
    expect(value.sw).to.be.eql('N');

    value = localizedAbbreviationsFor(undefined);
    expect(value).to.exist.and.be.an('object');
    expect(value.en).to.not.exist;
    expect(value.sw).to.not.exist;
  });

  it('should derive indexes definition for localized path', () => {
    expect(localizedIndexesFor).to.exist;
    expect(localizedIndexesFor).to.be.a('function');

    const indexes = localizedIndexesFor('name');
    expect(indexes).to.exist.and.be.an('object');
    expect(indexes['name.en']).to.exist.and.be.equal(1);
    expect(indexes['name.sw']).to.exist.and.be.equal(1);
  });
});
