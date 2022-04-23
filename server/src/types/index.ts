export type TAddress = {
  place?: string;
  number?: string;
  district?: string;
  zipConde?: string;
  city?: string;
  state?: string;
  country?: string;
  lat?: string;
  lng?: string;
}

export type TCompany = {
  id?: number;
  name: string;
  cnpj: string;
  address: TAddress;
}

export type TValidator= {
  field: string
  message: string,
  ignore?: boolean|null|undefined
}
