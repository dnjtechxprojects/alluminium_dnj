import { Prisma } from "@prisma/client";
import prisma from "../index";

// 🔹 Get a single blog
export const getBlog = async (options: Prisma.BlogFindFirstArgs) => {
  try {
    const blog = await prisma.blog.findFirst(options);
    return blog;
  } catch (error) {
    throw error;
  }
};

// 🔹 Get all blogs
export const getAllBlogs = async (options?: Prisma.BlogFindManyArgs) => {
  try {
    const blogs = await prisma.blog.findMany(options);
    return blogs;
  } catch (error) {
    throw error;
  }
};

// 🔹 Create a single blog
export const createBlog = async (data: Prisma.BlogCreateInput) => {
  try {
    const blog = await prisma.blog.create({ data });
    return blog;
  } catch (error) {
    throw error;
  }
};

// 🔹 Create multiple blogs
export const createBulkBlogs = async (data: Prisma.BlogCreateManyInput[]) => {
  try {
    const blogs = await prisma.blog.createMany({ data });
    return blogs;
  } catch (error) {
    throw error;
  }
};

// 🔹 Update blog(s)
export const updateBlog = async (options: Prisma.BlogUpdateManyArgs) => {
  try {
    const updated = await prisma.blog.updateMany(options);
    return updated;
  } catch (error) {
    throw error;
  }
};

// 🔹 Delete blog(s)
export const deleteBlog = async (options: Prisma.BlogDeleteManyArgs) => {
  try {
    const deleted = await prisma.blog.deleteMany(options);
    return deleted;
  } catch (error) {
    throw error;
  }
};

// 🔹 Count blogs
export const countBlog = async (options?: Prisma.BlogCountArgs) => {
  try {
    const count = await prisma.blog.count(options);
    return count;
  } catch (error) {
    throw error;
  }
};
