jest.mock('../../src/models/Coverage.model');
jest.mock('../../src/models/Discount.model');

import calculateInsurancePrice from '../../src/services/calculation.service';
import { GetCoveragesRequestBody } from '../../src/interfaces/calculation.interface';

describe('calculateInsurancePrice', () => {
  it('should calculate the correct insurance price', async () => {
    const requestBody: GetCoveragesRequestBody = {
      name: 'John Doe',
      birthdate: '1990-01-01',
      city: 'New York',
      vehiclePower: 120,
      voucher: 50,
      selectedCoverages: ['664e10dfd90895eb9dee4dd4', '664e10dfd90895eb9dee4dd5'],
      selectedDiscounts: ['664e10dfd90895eb9dee4dd9'],
    };

    const result = await calculateInsurancePrice(requestBody);
    expect(result).toHaveProperty('basePrice');
    expect(result).toHaveProperty('coverages');
    expect(result).toHaveProperty('discounts');
    expect(result).toHaveProperty('totalPrice');
  });
});
