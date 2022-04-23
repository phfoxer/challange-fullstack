import { Router } from 'express'
import { clinicsRouter } from './clinics'

const routers = Router()

/**
 * Routes
 */
routers.use('/company', clinicsRouter)
routers.use('/', (req, res) => res.send('Route not found /'))

export default routers
