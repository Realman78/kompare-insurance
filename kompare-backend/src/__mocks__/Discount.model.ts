const mockDiscountData = [
    { _id: '664e10dfd90895eb9dee4dd9', name: 'COMMERCIAL_DISCOUNT', values: [10] },
    { _id: '664e10dfd90895eb9dee4dda', name: 'ADVISER_DISCOUNT', values: [20], selectedCondition: 2 },
    { _id: '664e10dfd90895eb9dee4ddb', name: 'VIP_DISCOUNT', values: [5], vehiclePowerCondition: 80 },
    { _id: '664e10dfd90895eb9dee4ddc', name: 'STRONG_CAR_SURCHARGE', values: [10], vehiclePowerCondition: 100 },
  ];
  
  const findById = jest.fn((id: string) => {
    return Promise.resolve(mockDiscountData.find(discount => discount._id === id));
  });
  
  const findOne = jest.fn((query: object) => {
    return Promise.resolve(mockDiscountData.find(discount => discount.name === (query as any).name));
  });
  
  const find = jest.fn(() => {
    return Promise.resolve(mockDiscountData);
  });
  
  export default { findById, findOne, find };
  