import { Router } from 'express'
import CompanyController from '../controllers/CompanyController'

export const clinicsRouter = Router()

const clinicController = new CompanyController()

clinicsRouter.post('/', clinicController.save)
clinicsRouter.get('/', clinicController.all)
