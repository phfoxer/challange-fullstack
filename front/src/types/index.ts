export type TSearch = {
  setLatitude: (value: number | null) => void;
  setLongitude: (value: number | null) => void;
  setZoom: (value: number) => void;
}

export type TAddress = {
  place?: string;
  number?: string;
  district?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  lat: number | (() => number);
  lng: number | (() => number);
}

export type TCompany = {
  id?: number;
  name: string;
  cnpj: string;
  address: TAddress;
}

export type TCompanyFrom = {
  name: string;
  cnpj: string;
  lat: number | (() => number);
  lng: number | (() => number);
}