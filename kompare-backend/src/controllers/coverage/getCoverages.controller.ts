import { Request, Response } from 'express'
import Coverage from '../../models/Coverage.model';

interface GetCoveragesRequest extends Request {
    query: { sort: string};
}

const getCoverages = async (req: GetCoveragesRequest, res: Response): Promise<void> => {
    try {
        const coverages = await Coverage.find({});

        res.json({ message: "Successfully fetched coverages.", result: coverages });
    } catch (e: unknown) {
        console.error(e);
        
        if (e instanceof Error) {
            res.status(500).send(e.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
}

export default getCoverages