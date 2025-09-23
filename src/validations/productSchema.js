const Joi = require('joi');

const productSchema = Joi.object({
  product: Joi.object({
    name: Joi.string().required().min(3).messages({
      'any.required': 'Product name is required.',
      'string.empty': 'Product name cannot be empty.',
      'string.min': 'Product name must have at least 3 characters.'
    }),
    id: Joi.number().required().messages({
      'any.required': 'Product id is required.',
    })
  }).required().messages({
    'any.required': 'The product data is required.'
  })
});

module.exports = productSchema;