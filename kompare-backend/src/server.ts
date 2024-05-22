import express, { Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import helmet from "helmet";

import errorHandler from './utils/errorHandler'

import coverageRoutes from './routes/coverage.router'
import discountRouter from './routes/discount.router'
import calculationRouter from './routes/calculation.router'

import staticDataPopulator from './utils/staticDataPopulator';

const createServer = (): express.Express => {
  const app = express()

  app.use(express.json())
  app.use(cors())
  app.use(express.urlencoded({ extended: false }))
  app.use(helmet());

  //Routers
  app.use('/api/coverages', coverageRoutes)
  app.use('/api/discounts', discountRouter)
  app.use('/api/calculate', calculationRouter)

  app.get('/api/health', async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Server is healthy.' })
  });
  app.get('/api/repopulate', staticDataPopulator);

  app.get('/api/*', errorHandler)

  app.use(express.static(path.join(__dirname, '..', '..', 'build')));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html'));
  });

  return app
}

export default createServer