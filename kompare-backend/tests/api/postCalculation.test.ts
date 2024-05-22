import request from 'supertest';
import createServer from '../../src/server'; // Adjust path as needed
import mongoose from 'mongoose';

require('dotenv').config();

const app = createServer();

describe('POST /calculate', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should calculate insurance price successfully', async () => {
    const requestBody = {
      name: 'John Doe',
      birthdate: '1990-01-01',
      city: 'New York',
      vehiclePower: 120,
      voucher: 50,
      selectedCoverages: ['664e10dfd90895eb9dee4dd4', '664e10dfd90895eb9dee4dd5'],
      selectedDiscounts: ['664e10dfd90895eb9dee4dda', '664e10dfd90895eb9dee4dd9'],
    };

    const response = await request(app).post('/api/calculate').send(requestBody);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('basePrice');
    expect(response.body).toHaveProperty('coverages');
    expect(response.body).toHaveProperty('discounts');
    expect(response.body).toHaveProperty('totalPrice');
  }, 10000); 
});
