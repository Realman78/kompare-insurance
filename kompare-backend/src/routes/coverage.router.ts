import express from 'express'

import errorHandler from '../utils/errorHandler'
import { getCoverages } from '../controllers/coverage/coverage.controller'

const router = express.Router()

router.get('/', getCoverages);
router.get('/*', errorHandler)


export default router