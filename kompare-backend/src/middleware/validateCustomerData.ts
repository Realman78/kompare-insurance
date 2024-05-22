import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

const customerSchema = Joi.object({
  name: Joi.string().required(),
  birthdate: Joi.date().iso().required(),
  city: Joi.string().required(),
  vehiclePower: Joi.number().required(),
  voucher: Joi.number().optional(),
  selectedCoverages: Joi.array().items(Joi.string()).required(),
  selectedDiscounts: Joi.array().items(Joi.string()).required(),
});

export const validateCustomerData = validator.body(customerSchema);
