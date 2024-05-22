import { Request, Response } from 'express'
import Discount from '../../models/Discount.model';

interface GetDiscountsRequest extends Request {
    query: { sort: string};
}

const GetDiscounts = async (req: GetDiscountsRequest, res: Response): Promise<void> => {
    try {
        const discounts = await Discount.find({});

        res.json({ message: "Successfully fetched coverages.", result: discounts });
    } catch (e: any) {
        console.log(e)
        res.status(500).json({ message: "Error occured. Please try again.", error: e.message })
    }
}

export default GetDiscounts