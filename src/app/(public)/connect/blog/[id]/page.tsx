"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string;
  date?: string;
  excerpt?: string;
  slug?: string;
}

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/blog?id=${id}`);
        setBlog(response.data?.data);
      } catch (err) {
        setError("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Loading...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto py-16 px-4 md:px-10">

          <Link href="/connect/blog">
            <button className="bg-black text-white py-2 mt-10 px-7 rounded-xl text-lg hover:scale-95 mb-6 transition hover:cursor-pointer">
              ← Back
            </button>
          </Link>

          {blog.image && (
            <Image
              src={blog.image}
              alt={blog.title}
              width={900}
              height={400}
              className="rounded-xl w-full object-cover mb-6"
            />
          )}

          <h1 className="text-3xl font-bold mb-4 max-sm:text-center">{blog.title}</h1>

          {blog.date && (
            <p className="text-gray-400 mb-6 max-sm:text-center">
              {new Date(blog.date).toLocaleDateString()}
            </p>
          )}

          {blog.excerpt && (
            <p className="text-lg text-gray-600 mb-6 max-sm:text-center">
              {blog.excerpt}
            </p>
          )}

          <div className="text-gray-800 whitespace-pre-line leading-relaxed max-sm:text-center">
            {blog.content}
          </div>

          {blog.slug && (
            <p className="text-sm text-gray-400 mt-6 max-sm:text-center">{blog.slug}</p>
          )}
        </div>
      </div>
    </div>
  );
}
