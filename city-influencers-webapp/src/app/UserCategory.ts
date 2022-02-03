import { Category } from "./Category";
import { User } from "./user";

export interface UserCategory{
  ucId: number,
  userId: number,
  categoryId: number,
  user: User,
  category: Category
}
