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
    } catch (e: any) {
        console.log(e)
        res.status(500).json({ message: "Error occured. Please try again.", error: e.message })
    }
}
export default staticDataPopulator