import { Request, Response } from 'express'
import Discount from '../../models/Discount.model';

interface GetDiscountsRequest extends Request {
    query: { sort: string};
}

const GetDiscounts = async (req: GetDiscountsRequest, res: Response): Promise<void> => {
    try {
        const discounts = await Discount.find({});

        res.json({ message: "Successfully fetched coverages.", result: discounts });
    } catch (e: unknown) {
        console.error(e);
        
        if (e instanceof Error) {
            res.status(500).send(e.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
}

export default GetDiscounts