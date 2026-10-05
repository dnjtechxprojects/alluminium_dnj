"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import SectionHeader from "@/components/common/SectionHeader";
// import ImagePicker from "@/features/common/ImagePicker";
import { Dropzone } from "@/ui";
import { apiInstance } from "@/lib/axiosApi";

type BlogFormValues = {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
};

export default function CreateEditBlog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogFormValues>();

  useEffect(() => {
    if (!blogId) return;

    const loadBlog = async () => {
      const res = await fetch(`/api/blog?id=${blogId}`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (data?.data) {
        setValue("title", data.data.title);
        setValue("content", data.data.content);
        setValue("excerpt", data.data.excerpt || "");
        setValue("slug", data.data.slug || "");
        setImage(data.data.image || "");

      }
    };

    loadBlog();
  }, [blogId, setValue]);

  // Upload to disk and keep only the filename, same as products. Storing the
  // image inline as base64 made every blog list response megabytes in size.
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const json: any = await apiInstance.post("/upload", formData);

      if (!json.data?.url) return;

      setImage(json.data.url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: BlogFormValues) => {
    setLoading(true);

    try {
      const payload = {
      id: blogId || undefined,
      title: values.title.trim(),
      content: values.content,
      excerpt: values.excerpt.trim() || values.content.slice(0, 160),
      slug: values.slug.trim() || undefined,
      image: image || undefined,
    };

      // Goes through apiInstance so the admin's bearer token is sent.
      if (blogId) {
        await apiInstance.put("/blog", payload);
      } else {
        await apiInstance.post("/blog", payload);
      }

      // alert(blogId ? "Blog updated successfully" : "Blog created successfully");
      router.push("/admin-blog");
    } catch (error) {
      console.error(error);
      // alert("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
     <SectionHeader title={blogId ? "Edit Blog" : "Create Blog"} maintitle=""/>
    <div className="w-full py-2 px-6 bg-white">
     

      <div className="max-w-4xl mx-auto mb-5">
        <a href="/admin-blog">
          <button className="bg-black text-white py-2 px-7 rounded-xl text-lg hover:cursor-pointer hover:scale-95">
            ← back
          </button>
        </a>
      </div>

      <div className="max-w-4xl mx-auto p-6 border rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="border p-3 rounded w-full mb-3"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>
          )}

          <textarea
            className="border p-3 rounded w-full mb-3"
            placeholder="Content"
            rows={6}
            {...register("content", { required: "Content is required" })}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mb-2">
              {errors.content.message}
            </p>
          )}

          <textarea
            className="border p-3 rounded w-full mb-3"
            placeholder="Excerpt"
            {...register("excerpt")}
          />

          <input
            className="border p-3 rounded w-full mb-3"
            placeholder="Sub title"
            {...register("slug")}
          />

         <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-6 py-2 rounded-xl hover:cursor-pointer hover:scale-95"
            >
              {loading ? "Saving..." : blogId ? "Update" : "Create"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin-blog")}
              className="border px-6 py-2 rounded-xl hover:cursor-pointer hover:scale-95"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
