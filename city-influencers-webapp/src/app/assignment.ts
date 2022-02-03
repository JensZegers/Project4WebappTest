import { City } from "./city";

import { Voucher } from "./voucher";

export interface Assignment{
  assignmentId: number,
  voucherId: number,
  title: string,
  image: string,
  amount: number,
  isActive: boolean,
  organisation: string,
  cityId: number,
  description: string,
  date: string,
  city: City,
  voucher: Voucher
}
