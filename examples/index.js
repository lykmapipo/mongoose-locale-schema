import { model, Schema } from '@lykmapipo/mongoose-common';
import { localize } from '../src';

// schema definition
const ProductSchema = new Schema({
  name: localize({ locales: ['en', 'sw'] }),
  description: localize({ locales: ['en', 'sw'] }),
});
const Product = model('Product', ProductSchema);

// instantiate multiple locales
const product = new Product({
  name: { en: 'Tomato', sw: 'Nyanya' },
  description: { en: 'Best in Town', sw: 'Habari ya Mjini' },
});

// save with multiple locales
product.save((error, saved) => {
  console.log(error, saved);
});
