import { Schema, model } from 'mongoose';

const customerSchema = new Schema({
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  city: { type: String, required: true },
  vehiclePower: { type: Number, required: true },
  voucher: { type: Number }
}, { timestamps: true });

const Customer = model('Customer', customerSchema);
export default Customer