import { TValidator } from "../types"

export default class Validator {
  validate: TValidator[]

  /**
   * @param props.validate field name and error message
   */
  constructor(validate: TValidator[]) {
    this.validate = validate
  }

  /**
   * Checks if the field has been entered
   */
  check = (data: unknown) => {
    const dataKeys = Object.keys(data)

    dataKeys.forEach((key) => {
      this.validData(data[key], key)

      if (this.isObject(data[key])) {
        this.check(data[key]);
      }
    })

    return dataKeys
  }

  private validData = (data: unknown, key: string) => {
    if (!data || data === '') {
      this.validate.forEach((validateData) => {
        if (!validateData.ignore) {
          if (validateData.field === key) {
            throw new Error(validateData.message)
          }
        }
      })
    }
  }

  private isObject = (obj: unknown) => {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }
}
