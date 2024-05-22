import { Request, Response } from "express";
import calculateInsurancePrice from "../../services/calculation.service";
import { GetCoveragesRequest } from "../../interfaces/calculation.interface";


const getCoverages = async (req: GetCoveragesRequest, res: Response): Promise<void> => {
    try {
        const priceDetails = await calculateInsurancePrice(req.body);
        res.json(priceDetails);
    } catch (e: unknown) {
        console.error(e);
        
        if (e instanceof Error) {
            res.status(500).send(e.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
};

export default getCoverages;
