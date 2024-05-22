import { jest } from '@jest/globals';
import { Query } from 'mongoose';
import Coverage from '../models/Coverage.model';

const mockCoverageData = [
    { _id: '664e10dfd90895eb9dee4dd4', name: 'BONUS_PROTECTION', values: [12] },
    { _id: '664e10dfd90895eb9dee4dd5', name: 'AO_PLUS', values: [55, 105], ageCondition: 30 },
];

// @ts-ignore
const findByIdMock = jest.fn().mockImplementation((id: string) => {
    return {
        exec: jest.fn(() => Promise.resolve(mockCoverageData.find(coverage => coverage._id === id)))
    } as Partial<Query<any, any>>;
});

Coverage.findById = findByIdMock as any;
