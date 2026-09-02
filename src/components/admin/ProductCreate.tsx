"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { prepareWindow } from "@/lib/helperFunctions";
import { apiInstance } from "@/lib/axiosApi";
import Image from "next/image";

type ProductFormValues = {
  title: string;
  slug: string;
  description: string;
  page: "EXTRUDEDPRODUCTS" | "NEWALLOY" | "DIEMANUFACTURING" | "FABRICATION";
};

export default function CreateEditProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm<ProductFormValues>({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      page: "EXTRUDEDPRODUCTS",
    },
  });

  useEffect(() => {
    if (!productId) return;
    const loadProduct = async () => {
      const json: any = await apiInstance.get(`/product?id=${productId}`);
      const product = json.data;
      if (product) {
        setValue("title", product.title);
        setValue("slug", product.slug || "");
        setValue("description", product.description);
        setValue("page", product.page);
        setImage(product.image || "");
      }
    };
    loadProduct();
  }, [productId, setValue]);

  const onSubmit = async (values: ProductFormValues) => {
    setLoading(true);

    const payload = {
      id: productId || undefined,
      title: values.title,
      description: values.description,
      page: values.page,
      image: image,
      slug:
        values.slug ||
        values.title.toLowerCase().trim().replace(/\s+/g, "-"),
    };

    try {
      if (productId) {
        await apiInstance.put("/product", payload);
      } else {
        await apiInstance.post("/product", payload);
      }

      // alert(productId ? "Product Updated!" : "Product Created!");
      router.push("/admin-product");
    } catch (err) {
      console.error(err);
      // alert("Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const json: any = await apiInstance.post("/upload", formData);

      if (!json.data?.url) {
        // alert(json.message || "Image upload failed");
        return;
      }

      setImage(json.data.url);
    } catch (error) {
      console.error(error);
      // alert("Upload error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {productId ? "Edit Product" : "Create Product"}
      </h1>

      <div className="mb-5">
        <button
          onClick={() => router.push("/admin-product")}
          className="bg-black text-white py-2 px-7 rounded-xl hover:cursor-pointer"
        >
          ← back
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <select className="border p-2 w-full rounded" {...register("page")}>
          <option value="EXTRUDEDPRODUCTS">Extruded Products</option>
          <option value="NEWALLOY">New Alloy</option>
          <option value="DIEMANUFACTURING">Die Manufacturing</option>
          <option value="FABRICATION">Fabrication</option>
        </select>

        <input
          className="border p-2 w-full rounded"
          placeholder="Title"
          {...register("title", { required: true })}
        />

        <input
          className="border p-2 w-full rounded"
          placeholder="Sub title (optional)"
          {...register("slug")}
        />

        <textarea
          className="border p-2 w-full rounded"
          placeholder="Description"
          rows={8}
          {...register("description", { required: true })}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0 file:text-sm file:font-semibold
              file:bg-black file:text-white hover:file:cursor-pointer"
          />
          {image && (
            <div className="mt-2">
              <p className="text-xs text-gray-400 font-mono mb-1">{image}</p>
              <Image
                src={`/api/image/${image}`}
                alt="Preview"
                width={160}
                height={128}
                className="object-cover rounded border"
                unoptimized
              />
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded-xl disabled:opacity-50 hover:cursor-pointer"
          >
            {loading ? "Saving..." : productId ? "Update Product" : "Add Product"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin-product")}
            className="border px-6 py-2 rounded-xl hover:cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}