import { AddAdmin } from "./add-admin-form/add-admin";
import { City } from "./city";
import { User } from "./user";

export interface CityUser{
  cuId: number,
  cityId: number,
  userId: number,
  isPrimary: boolean,
  description: string,
  city: City,
  user: AddAdmin
}
