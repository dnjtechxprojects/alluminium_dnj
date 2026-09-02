"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import SectionHeader from "@/components/common/SectionHeader";
// import ImagePicker from "@/features/common/ImagePicker";
import { Dropzone } from "@/ui";

type BlogFormValues = {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function CreateEditBlog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  const [image, setImage] = useState<any>(undefined);
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
        setImage(data.data.image); 

      }
    };

    loadBlog();
  }, [blogId, setValue]);

  const onSubmit = async (values: BlogFormValues) => {
    setLoading(true);

    try {
      let coverImage: string | undefined = undefined;

      if (image) {
        if (image instanceof File) {
          coverImage = await fileToBase64(image);
        } else if (image?.file instanceof File) {
          coverImage = await fileToBase64(image.file);
        } else if (Array.isArray(image) && image[0] instanceof File) {
          coverImage = await fileToBase64(image[0]);
        } else if (typeof image === "string") {
          coverImage = image;
        }
      }

      const payload = {
      id: blogId || undefined,
      title: values.title.trim(),
      content: values.content,
      excerpt: values.excerpt.trim() || values.content.slice(0, 160),
      slug: values.slug.trim() || undefined,
      image: coverImage,   
    };


        const res = await fetch("/api/blog", {
        method: blogId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // alert(data?.message || "Something went wrong");
        return;
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
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const base64 = await fileToBase64(file);
            setImage(base64);
          }}
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
