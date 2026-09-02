import {
  countBlog,
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
} from "@/backend/db/services/blog.service";
import {
  internalServerErrorResponse,
  invalidDataResponse,
  notFoundResponse,
  successResponse,
} from "@/backend/utils/apiResponse";
import { requireAuth } from "@/backend/middleware/common/token.middleware";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const blog = await getBlog({ where: { id } });

      if (!blog) {
        return notFoundResponse({ message: "Blog not found" });
      }

      return successResponse({ data: blog });
    }

    const page = Math.max(parseInt(searchParams.get("page") ?? "1", 10), 1);
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") ?? "9", 10), 1),
      20,
    );
    const skip = (page - 1) * limit;
    const orderBy = { createdAt: "desc" as const };

    const [items, total] = await Promise.all([
      getAllBlogs({ skip, take: limit, orderBy }),
      countBlog(),
    ]);

    return successResponse({
      data: items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: skip + items.length < total,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse({ error: "Internal server error" });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    const { title, content, slug, excerpt, image } = await request.json();

    if (!title || !content) {
      return invalidDataResponse({
        message: "Title and content are required",
      });
    }

    const blog = await createBlog({
      title: title.trim(),
      content: content,
      slug: slug?.trim() || "",
      excerpt: excerpt?.trim() || "",
      image: image || "",
    });

    return successResponse({
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse({ error: "Internal server error" });
  }
}

export async function PUT(request: Request) {
  try {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    const { id, title, content, slug, excerpt, image } = await request.json();

    if (!id) {
      return invalidDataResponse({
        message: "Blog ID is required",
      });
    }

    const blog: any = await updateBlog({
      where: { id: id },
      data: {
        title: title?.trim(),
        content: content,
        slug: slug?.trim(),
        excerpt: excerpt?.trim(),
        image: image,
      },
    });

    return successResponse({
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse({ error: "Internal server error" });
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = await requireAuth(request);
    if (!auth.ok) return auth.response;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return invalidDataResponse({
        message: "Blog ID is required",
      });
    }

    const blog = await deleteBlog({ where: { id } });

    return successResponse({
      message: "Blog deleted successfully",
      data: blog,
    });
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse({ error: "Internal server error" });
  }
}
