import express from 'express'

import errorHandler from '../utils/errorHandler'
import { postCalculation } from '../controllers/calculation/calculation.controller'
import { validateCustomerData } from '../middleware/validateCustomerData';

const router = express.Router()

router.post('/', validateCustomerData, postCalculation);
router.get('/*', errorHandler)


export default router