import Company from '../../entities/Company'

export default interface CompanyInterface {
  save: (clinic: Company) => Promise<Company>
  getById: (id: number) => Promise<Company>
  getAll: () => Promise<Company[]>
  getByAddress: (address: string) => Promise<Company[]>
}
