import { Request, Response } from "express";
import calculateInsurancePrice from "../../services/calculation.service";

interface GetCoveragesRequest extends Request {
    query: { sort: string };
}

const getCoverages = async (req: GetCoveragesRequest, res: Response): Promise<void> => {
    try {
        const priceDetails = await calculateInsurancePrice(req.body);
        res.json(priceDetails);
    } catch (e: any) {
        console.log(e);
        res.status(500).send(e.message);
    }
};

export default getCoverages;
