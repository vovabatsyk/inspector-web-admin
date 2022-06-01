import { IRole } from './IRole'

export interface IUserData {
  id?: number
  username: string
  email: string
  roles: IRole[]
  banned: boolean
  banReason: string
}
