import { Prisma } from "@prisma/client";
import prisma from "../index";

// 🔹 Get a single product
export const getProduct = async (options: Prisma.ProductFindFirstArgs) => {
  try {
    const product = await prisma.product.findFirst(options);
    return product;
  } catch (error) {
    throw error;
  }
};

// 🔹 Get all products
export const getAllProducts = async (options?: Prisma.ProductFindManyArgs) => {
  try {
    const products = await prisma.product.findMany(options);
    return products;
  } catch (error) {
    throw error;
  }
};

// 🔹 Create a single product
export const createProduct = async (data: Prisma.ProductCreateInput) => {
  try {
    const product = await prisma.product.create({ data });
    return product;
  } catch (error) {
    throw error;
  }
};

// 🔹 Create multiple products
export const createBulkProducts = async (data: Prisma.ProductCreateManyInput[]) => {
  try {
    const products = await prisma.product.createMany({ data });
    return products;
  } catch (error) {
    throw error;
  }
};

// 🔹 Update product(s)
export const updateProduct = async (options: Prisma.ProductUpdateManyArgs) => {
  try {
    const updated = await prisma.product.updateMany(options);
    return updated;
  } catch (error) {
    throw error;
  }
};

// 🔹 Delete product(s)
export const deleteProduct = async (options: Prisma.ProductDeleteManyArgs) => {
  try {
    const deleted = await prisma.product.deleteMany(options);
    return deleted;
  } catch (error) {
    throw error;
  }
};

// 🔹 Count products
export const countProduct = async (options?: Prisma.ProductCountArgs) => {
  try {
    const count = await prisma.product.count(options);
    return count;
  } catch (error) {
    throw error;
  }
};
