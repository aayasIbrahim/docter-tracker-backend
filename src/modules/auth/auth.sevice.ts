import User from "../user/user.model";
import bcrypt from "bcrypt";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { JwtPayload, SignOptions } from "jsonwebtoken";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  const user = await User.findOne({ email } as any);
  console.log(user);
  if (!user) {
    throw new Error("User doest not exits");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Password is Incorrect");
  }
  const jwtPayload = {
    id: user._id,
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
const refreshToken = async (refreshToken: string) => {
  const verifiedToken = jwtUtils.verifyToken(
    refreshToken,
    config.jwt_refresh_secret,
  );

  if (!verifiedToken.success) {
    throw new Error(verifiedToken.error);
  }
  const { email } = verifiedToken.data as JwtPayload;

  const user = await User.findOne({ email } as any);

  const jwtPayload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const newAccessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );
  return {
    newAccessToken,
  };
};
export const authService = {
  loginUserIntoDB,
  refreshToken,
};
