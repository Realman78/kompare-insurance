import request from 'supertest';
import createServer from '../../src/server';
import mongoose from 'mongoose';

require('dotenv').config();

const app = createServer();

describe('GET /discounts', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
  it('should fetch discounts successfully', async () => {
    const response = await request(app).get('/api/discounts');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Successfully fetched coverages.');
    expect(Array.isArray(response.body.result)).toBe(true);
  });
});
