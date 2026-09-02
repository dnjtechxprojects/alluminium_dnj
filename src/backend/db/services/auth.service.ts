import { Prisma } from "@prisma/client";
import prisma from "../index";

// 🔹 Get a single user
export const getUser = async (options: Prisma.UserFindFirstArgs) => {
  try {
    const user = await prisma.user.findFirst(options);
    return user;
  } catch (error) {
    throw error;
  }
};

// 🔹 Get all users
export const getAllUsers = async (options?: Prisma.UserFindManyArgs) => {
  try {
    const users = await prisma.user.findMany(options);
    return users;
  } catch (error) {
    throw error;
  }
};

// 🔹 Create a single user
export const createUser = async (data: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (error) {
    throw error;
  }
};

// 🔹 Create multiple users
export const createBulkUsers = async (data: Prisma.UserCreateManyInput[]) => {
  try {
    const users = await prisma.user.createMany({ data });
    return users;
  } catch (error) {
    throw error;
  }
};

// 🔹 Update user(s)
export const updateUser = async (options: Prisma.UserUpdateManyArgs) => {
  try {
    const updated = await prisma.user.updateMany(options);
    return updated;
  } catch (error) {
    throw error;
  }
};

// 🔹 Delete user(s)
export const deleteUser = async (options: Prisma.UserDeleteManyArgs) => {
  try {
    const deleted = await prisma.user.deleteMany(options);
    return deleted;
  } catch (error) {
    throw error;
  }
};

// 🔹 Count users
export const countUser = async (options?: Prisma.UserCountArgs) => {
  try {
    const count = await prisma.user.count(options);
    return count;
  } catch (error) {
    throw error;
  }
};
