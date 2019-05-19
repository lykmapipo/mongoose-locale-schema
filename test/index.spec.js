import { SchemaTypes, Schema } from '@lykmapipo/mongoose-common';
import { expect } from '@lykmapipo/mongoose-test-helpers';
import localize from '../src/index';

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
});
