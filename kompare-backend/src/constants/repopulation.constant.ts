import { Coverage, Discount } from '../types/types'
import {PERCENTAGE, FIXED} from './typeConstants.constant'
export const COVERAGES: Coverage[] = [
    {
        name: "Bonus Protection",
        type: PERCENTAGE,
        values: [12],
    },
    {
        name: "AO+",
        type: FIXED,
        values: [55, 105],
        ageCondition: 30
    },
    {
        name: "Glass Protection",
        type: PERCENTAGE,
        values: [80],
    },
]

export const DISCOUNTS: Discount[] = [
    {
        name: "Commercial discount",
        type: PERCENTAGE,
        values: [10],
    },
    {
        name: "Adviser discount",
        type: PERCENTAGE,
        values: [20],
        selectedCondition: 2
    },
    {
        name: "VIP discount",
        type: PERCENTAGE,
        values: [5],
        vehiclePowerCondition: 80
    },
    {
        name: "Strong car surcharge",
        type: PERCENTAGE,
        values: [10],
        vehiclePowerCondition: 100
    },
]