import { Schema, model } from 'mongoose';

const discountSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  values: { type: [Number], required: true },
  vehiclePowerCondition: { type: Number },
  selectedCondition: { type: Number }
}, { timestamps: true });

const Discount = model('Discount', discountSchema);
export default Discount
