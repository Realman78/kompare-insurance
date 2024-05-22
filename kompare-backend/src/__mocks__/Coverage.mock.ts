const mockCoverageData = [
    { _id: '664e10dfd90895eb9dee4dd4', name: 'BONUS_PROTECTION', values: [12] },
    { _id: '664e10dfd90895eb9dee4dd5', name: 'AO_PLUS', values: [55, 105], ageCondition: 30 },
    { _id: 'coverage3', name: 'GLASS_PROTECTION', values: [80] },
  ];
  
  const findById = jest.fn((id: string) => {
    return Promise.resolve(mockCoverageData.find(coverage => coverage._id === id));
  });
  
  const find = jest.fn(() => {
    return Promise.resolve(mockCoverageData);
  });
  
  export default { findById, find };
  