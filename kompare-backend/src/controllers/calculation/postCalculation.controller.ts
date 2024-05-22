import { Request, Response } from 'express'
import Coverage from '../../models/Coverage.model';
import calculateInsurancePrice from '../services/calculation.service';

interface GetCoveragesRequest extends Request {
    query: { sort: string};
}

const getCoverages = async (req: GetCoveragesRequest, res: Response): Promise<void> => {
    try {
        const priceDetails = await calculateInsurancePrice(req.body);
        res.json(priceDetails);
      } catch (e: any) {
        console.log(e)
        res.status(500).json({ message: "Error occured. Please try again.", error: e.message })
    }
}

export default getCoverages