import { Prisma, ProductPage } from "@prisma/client";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  countProduct,
} from "@/backend/db/services/product.service";

import {
  successResponse,
  internalServerErrorResponse,
  notFoundResponse,
  invalidDataResponse,
} from "@/backend/utils/apiResponse";
import { requireAuth } from "@/backend/middleware/common/token.middleware";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");
    const productType = searchParams.get("productType");

    if (id) {
      const product = await getProduct({
        where: { id },
      });

      if (!product) {
        return notFoundResponse({
          message: "Product not found",
        });
      }

      return successResponse({
        data: product,
      });
    }

    const pageNumber = Math.max(
      parseInt(searchParams.get("page") ?? "1", 10),
      1,
    );

    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") ?? "10", 10), 1),
      20,
    );

    const skip = (pageNumber - 1) * limit;

    const orderBy: Prisma.ProductOrderByWithRelationInput = {
      createdAt: "desc",
    };

    const where: Prisma.ProductWhereInput = {};

    if (productType) {
      where.page = productType as ProductPage;
    }

    const [items, total] = await Promise.all([
      getAllProducts({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      countProduct({ where }),
    ]);

    return successResponse({
      data: items,
      meta: {
        page: pageNumber,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: skip + items.length < total,
        hasPrevPage: pageNumber > 1,
      },
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

    const { title, description, slug, image, page } = await request.json();

    if (!title || !description) {
      return invalidDataResponse({
        message: "Title and description are required",
      });
    }

    const product = await createProduct({
      title: title.trim(),
      description: description,
      slug: slug?.trim() || "",
      image: image || "",
      page: page || "",
    });

    return successResponse({
      message: "Product created successfully",
      data: product,
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

    const { id, title, description, slug, image, page } = await request.json();

    if (!id) {
      return invalidDataResponse({
        message: "Product ID is required",
      });
    }

    const product = await updateProduct({
      where: { id },
      data: {
        title: title?.trim(),
        description,
        slug: slug?.trim(),
        image,
        page,
      },
    });

    return successResponse({
      message: "Product updated successfully",
      data: product,
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
        message: "Product ID is required",
      });
    }

    const product = await deleteProduct({ where: { id } });

    return successResponse({
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return internalServerErrorResponse({ error: "Internal server error" });
  }
}
