import { AcceptedAssignment } from "./acceptedAssignment";
import { Platform } from "./platform";

export interface SocialMediaPost{
  socialMediaPostId: number,
  aaId: number,
  platoformId: string,
  postUrl: string,
  date: string,
  platform: Platform,
  acceptedAssignment:AcceptedAssignment
}
