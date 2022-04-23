import { TAddress, TCompany } from '../types';

export default class Company {
  id?: number;
  name: string;
  cnpj: string;
  address: TAddress;

  constructor (company: TCompany) {
    this.id = company.id;
    this.name = company.name;
    this.cnpj = company.cnpj;
    this.address = company.address;
  }
}
