import express from 'express'

import errorHandler from '../utils/errorHandler'
import { getDiscounts } from '../controllers/discount/discount.controller'

const router = express.Router()

router.get('/', getDiscounts);
router.get('/*', errorHandler)


export default router