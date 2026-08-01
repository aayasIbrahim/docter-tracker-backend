import { Model } from "mongoose";

export interface TUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role?: "ADMIN";
}
