import { Role } from "./Role";

export interface User{
  userId: number,
  roleId: number
  firstName: string,
  surname: string,
  isActive:boolean,
  dateOfBirth: string,
  aboutMe:string,
  profilePicture: string,
  phoneNumber: string,
  gender: string,
  email: string,
  password: string,
  token: string,
  role: Role
}
