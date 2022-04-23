import { Request, Response } from 'express'
import Logger from '../config/logger'
import CompanyRepository from '../services/repositories/CompanyRepository'
import CompanyInterface from '../services/interfaces/CompanyInterface'
import Company from '../database/typeorm/entities/Company'
import Address from '../entities/Adress'
import ValidatorUtils from '../utils/ValidatorUtils'

export default class CompanyController {
  private repository: CompanyInterface;

  constructor() {
    this.repository = new CompanyRepository()
  }

  /** Save company data */
  save = async (req: Request, res: Response) => {
    const { id, name, cnpj, address, apikey } = req.body


    const company = new Company();
    if (id) {
      company.id = id
    }

    try {

      company.name = name;
      company.cnpj = cnpj;
      company.address = new Address(address);

      const ignore = apikey === process.env.REACT_APP_INTEGRATION_APIKEY

      const validate = [
        { field: 'name', message: 'O campo Nome é obrigatório' },
        { field: 'cnpj', message: 'O campo CNPJ é obrigatório' },
        { field: 'place', message: 'O campo Logradouro é obrigatório' },
        { field: 'zipConde', message: 'O campo CEP é obrigatório' },
        { field: 'city', message: 'O campo Cidade é obrigatório' },
        { field: 'state', message: 'O campo Estado é obrigatório' },
        { field: 'country', message: 'O campo País é obrigatório' },
        { field: 'lat', message: 'O campo Latitude é obrigatório' },
        { field: 'lng', message: 'O campo Longitude é obrigatório' },
        { field: 'number', message: 'O campo Número é obrigatório' },
        { field: 'district', message: 'O campo Bairro é obrigatório', ignore }
      ]

      new ValidatorUtils(validate).check(company)

      const result = await this.repository.save(company)

      res.json(result)
    } catch (error) {
      Logger.error(error.message)
      res.status(404).json({ message: error.message })
    }
  }

  /** Get company by id */
  get = async (req: Request, res: Response) => {
    const { id } = req.body

    const company = await this.repository.getById(id)
    res.json(company)
  }

  /** Get company by id */
  getByAddress = async (req: Request, res: Response) => {
    const { id } = req.body

    const company = await this.repository.getById(id)
    res.json(company)
  }

  /** Get all Company */
  all = async (req: Request, res: Response) => {
    const all = await this.repository.getAll()
    res.json(all)
  }
}
