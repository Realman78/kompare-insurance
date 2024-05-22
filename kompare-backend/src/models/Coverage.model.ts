import { Schema, model } from 'mongoose';

const coverageSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  values: { type: [Number], required: true },
  ageCondition: { type: Number },
}, { timestamps: true });

const Coverage = model('Coverage', coverageSchema);
export default Coverage
