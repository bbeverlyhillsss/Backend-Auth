import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  generateTokens,
  saveToken,
  validateRefreshToken,
  findToken,
  removeToken,
} from "./token.service.js";
import UserDto from "../dtos/user.dto.js";
import ApiError from "../exceptions/api.error.js";

// REGISTER SERVICE
export const registerService = async (name, email, password) => {
  const candidate = await User.findOne({ email });
  if (candidate) {
    throw ApiError.BadRequest(`User with email ${email} already exist.`);
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const userDto = new UserDto(user);
  const tokens = generateTokens({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

// LOGIN SERVICE
export const loginService = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError.BadRequest("User with this email not found.");
  }

  const isPasswordEquals = await bcrypt.compare(password, user.password);
  if (!isPasswordEquals) {
    throw ApiError.BadRequest("Invalid password.");
  }

  const userDto = new UserDto(user);
  const tokens = generateTokens({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);

  return {
    ...tokens,
    user: userDto,
  };
};

// LOGOUT SERVICE
export const logoutService = async (refreshToken) => {
  const token = await removeToken(refreshToken);
  return token;
};

export const refreshService = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }

  const userData = validateRefreshToken(refreshToken);
  const tokenFromDb = await findToken(refreshToken);
  if (!userData || !tokenFromDb) {
    throw ApiError.UnauthorizedError();
  }

  const user = await User.findById(userData.id);
  const userDto = new UserDto(user);
  const tokens = generateTokens({ ...userDto });

  await saveToken(userDto.id, tokens.refreshToken);
  return {
    ...tokens,
    user: userDto,
  };
};
