import { Platform } from "./platform";
import { User } from "./user";

export interface PlatformAccount{
  accountId: number,
  userId: number,
  platformId: number,
  username: string,
  user: User,
  platform: Platform
}
