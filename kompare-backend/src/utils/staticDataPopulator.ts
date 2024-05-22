import { Request, Response } from 'express'
import Coverage from '../models/Coverage.model'
import Discount from '../models/Discount.model'
import { COVERAGES, DISCOUNTS } from '../constants/repopulation.constant'

const staticDataPopulator = async (req: Request, res: Response) => {
    try {
        await Coverage.deleteMany({})
        await Coverage.insertMany(COVERAGES)
        await Discount.deleteMany({})
        await Discount.insertMany(DISCOUNTS)
        return res.status(201).json({message: 'Successfully repopulated.'})
    } catch (e: unknown) {
        console.error(e);
        
        if (e instanceof Error) {
            res.status(500).send(e.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
}
export default staticDataPopulator