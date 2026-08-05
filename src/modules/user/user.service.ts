import User from "./user.model";
import config from "../../config";
import bcrypt from "bcrypt";
import { TUser } from "./user.interface";
const registerUserIntoDB = async (payload: TUser) => {
  const { name, email, password, role } = payload;
  
  const existingUser = await User.findOne({ email } as any);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const hashPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    role,
  });
  if (!user) {
    throw new Error("Failed to create user");
  }
  const { password: _, ...userWithoutPassword } = user.toObject();

  return userWithoutPassword;
};

const getMyProfileIntoDB = async (userId: string) => {
  const user = await User.findOne({ _id: userId } as any);
  const { password: _, ...userWithoutPassword } = user.toObject();
  

  return userWithoutPassword;
};
export const userService = {
  registerUserIntoDB,
  getMyProfileIntoDB,
};
