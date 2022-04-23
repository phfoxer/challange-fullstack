import { getRepository } from 'typeorm'
import TypeormCompany from '../../database/typeorm/entities/Company'
import Company from '../../entities/Company'
import CompanyInterface from '../interfaces/CompanyInterface'

export default class CompanyRepository implements CompanyInterface {
  save = async (clinic: Company) =>
    await getRepository(TypeormCompany).save(clinic)

  getById = async (id: number) =>
    await getRepository(TypeormCompany).findOne({ id })

  getByAddress = async (address: string) =>
    await getRepository(TypeormCompany).find()

  getAll = async () => await getRepository(TypeormCompany).find()
}
