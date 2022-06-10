export interface IPayment {
  id?: number
  recipient: string
  code: string
  bank: string
  account: string
  purpose: string
}
