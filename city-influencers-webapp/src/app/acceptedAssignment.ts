import { Status } from "./status";
import { User } from "./user";

export interface AcceptedAssignment{
  aaId: number,
  assignmentId: number,
  userId: number,
  title: string,
  date: string,
  description: string,
  isCompleted: boolean
  status: Status,
  user: User,
}
