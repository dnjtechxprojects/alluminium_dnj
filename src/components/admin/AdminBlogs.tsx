"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SectionHeader from "@/components/common/SectionHeader";
import Image from "next/image";
import axios from "axios";

interface Blog {
  id: string;
  title: string;
  excerpt?: string;
  slug?: string;
  image?: string;
  createdAt: string;
}

const LIMIT = 12;

export default function AdminBlogList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startPage = Number(searchParams.get("page")) || 1;

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
const [page, setPage] = useState(startPage);
  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/blog", {
        params: { page: 1, limit: 1000 },
      });
      setBlogs(res.data?.data || []);
    } catch (err) {
      console.error("Failed to load blogs", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm) return;
    await axios.delete("/api/blog", { params: { id } });
    loadBlogs();
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const totalPages = Math.ceil(blogs.length / LIMIT);

  useEffect(() => {
    router.replace(`?page=${page}`, { scroll: false });
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const p = Number(entry.target.getAttribute("data-page"));
            setPage(p);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    Object.values(pageRefs.current).forEach(
      (el) => el && observer.observe(el)
    );

    return () => observer.disconnect();
  }, [blogs]);

  return (
    <div>
       <SectionHeader title="Admin – Blogs" maintitle=""/>
    <div className="w-full py-4 px-6 bg-white relative">
     

      <div className="max-w-6xl mx-auto mb-4 flex justify-end">
        <button
          onClick={() => router.push("/admin-blog/create")}
          className="bg-black text-white px-6 py-2 rounded-xl hover:scale-95 hover:cursor-pointer"
        >
          + Create Blog
        </button>
      </div>

      <div className="fixed left-2 md:left-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              onClick={() => {
                pageRefs.current[p]?.scrollIntoView({ behavior: "smooth" });
                setPage(p);
              }}
              className={`w-10 h-10 rounded-full font-bold transition-all hover:cursor-pointer
                ${
                  page === p
                    ? "bg-[#101828] text-white scale-110"
                    : "bg-gray-200 text-black hover:bg-black hover:text-white"
                }`}
            >
              {p}
            </button>
          );
        })}
      </div>

      <div className="max-w-6xl mx-auto">
        {loading && <p className="text-center py-10">Loading...</p>}

        {!loading &&
          Array.from({ length: totalPages }).map((_, i) => {
            const currentPage = i + 1;
            const start = i * LIMIT;
            const pageBlogs = blogs.slice(start, start + LIMIT);

            return (
              <div
                key={currentPage}
                ref={(el) => {
              pageRefs.current[currentPage] = el;
            }}

                data-page={currentPage}
                className="mb-16"
              >
                <div className="overflow-x-auto rounded-xl border">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Slug</th>
                        <th className="border px-4 py-2">Created</th>
                        <th className="border px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                <tbody>
                      {pageBlogs.map((blog) => (
                        <tr key={blog.id}>
                          <td className="border px-4 py-4">
                            {blog.image ? (
                              <Image
                                src={blog.image}
                                alt={blog.title}
                                width={80}
                                height={60}
                                className="rounded object-cover"
                              />
                            ) : (
                              <div className="w-20 h-14 bg-gray-200 flex items-center justify-center text-xs">
                                No Image
                              </div>
                            )}
                          </td>
                          <td className="border px-4 py-2">{blog.title}</td>
                          <td className="border px-4 py-2">{blog.slug}</td>
                          <td className="border px-4 py-2">
                            {formatDate(blog.createdAt)}
                          </td>
                          <td className="border px-4 py-2 text-center">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() =>
                                  router.push(
                                    `/admin-blog/create?id=${blog.id}`
                                  )
                                }
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:cursor-pointer"
                              >
                                Edit
                              </button>
                           <button
                                onClick={() => handleDelete(blog.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
      </div>
    </div>
    </div>
  );
}
