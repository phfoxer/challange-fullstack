import { TAddress } from "../types"

export default class Address {
  place?: string
  number?: string
  district?: string
  zipConde?: string
  city?: string
  state?: string
  country?: string
  lat?: string
  lng?: string

  constructor (props: TAddress) {
    this.place = props.place
    this.number = props.number
    this.district = props.district
    this.zipConde = props.zipConde
    this.city = props.city
    this.state = props.state
    this.country = props.country
    this.lat = props.lat
    this.lng = props.lng
  }
}
