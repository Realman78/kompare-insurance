import { Request, Response } from 'express'
import Coverage from '../../models/Coverage.model';

interface GetCoveragesRequest extends Request {
    query: { sort: string};
}

const getCoverages = async (req: GetCoveragesRequest, res: Response): Promise<void> => {
    try {
        const coverages = await Coverage.find({});

        res.json({ message: "Successfully fetched coverages.", result: coverages });
    } catch (e: any) {
        console.log(e)
        res.status(500).json({ message: "Error occured. Please try again.", error: e.message })
    }
}

export default getCoverages