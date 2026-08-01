import { TLoginPaylad } from "./auth.interface";
import User from "../user/user.model";
import bcrypt from "bcrypt";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { SignOptions } from "jsonwebtoken";

const loginUserIntoDB = async (payload: TLoginPaylad) => {
  const { email, password } = payload;

  const user = await User.findOne({ email } as any);

  if (!user) {
    throw new Error("User doest not exits");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Password is Incorrect");
  }
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );
  return {
    accessToken,
    refreshToken,
  };
};
export const userService = {
  loginUserIntoDB,
};
