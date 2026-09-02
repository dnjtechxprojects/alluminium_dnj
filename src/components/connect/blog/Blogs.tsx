"use client";
 import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SectionHeader from "@/components/common/SectionHeader";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface BlogItem {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  image?: string;
  highlight?: boolean;
}

 const LIMIT = 9;
const getImage = (blog: BlogItem) => blog.coverImage || blog.image || "";

export default function Blogs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startPage = Number(searchParams.get("page")) || 1;
const [allBlogs, setAllBlogs] = useState<BlogItem[]>([]);
  const [page, setPage] = useState(startPage);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

 const bottomRef = useRef<HTMLDivElement | null>(null);
const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const fetchBlogs = async (pageNo: number) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/blog?page=${pageNo}&limit=${LIMIT}`);

      setAllBlogs((prev) => {
        const newOnes = res.data.data.filter(
          (b: BlogItem) => !prev.some((p) => p.id === b.id)
        );
        return [...prev, ...newOnes];
      });

      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      for (let i = 1; i <= startPage; i++) {
        await fetchBlogs(i);
      }

      setTimeout(() => {
        pageRefs.current[startPage]?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    };

    load();
  }, []);

  useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading && page < totalPages) {
        const next = page + 1;
        setPage(next);
        fetchBlogs(next);
        router.replace(`?page=${next}`, { scroll: false });
      }
    });

    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [page, totalPages, loading]);

  useEffect(() => {
    const onScroll = () => {
      let current = page;

      Object.entries(pageRefs.current).forEach(([p, el]) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < 200 && rect.bottom > 200) {
          current = Number(p);
        }
      });

      if (current !== page) {
        setPage(current);
        router.replace(`?page=${current}`, { scroll: false });
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  const highlightBlog = allBlogs.find((b) => b.highlight);

  const normalBlogs = allBlogs.filter((b) => !b.highlight);
  const sideBlogs = normalBlogs.slice(0, 2);
  const remainingBlogs = normalBlogs.slice(2);
 return (
    <div className="w-full pb-16 bg-white relative">
      
      <SectionHeader title="Blogs" maintitle="connect"/>
      <div className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              onClick={() => {
                pageRefs.current[p]?.scrollIntoView({ behavior: "smooth" });
                setPage(p);
                router.replace(`?page=${p}`, { scroll: false });
              }}
              className={`w-10 h-10 rounded-full font-bold hover:cursor-pointer
                ${
                  page === p
                    ? "bg-[#101828] text-white scale-110"
                    : "bg-gray-200 hover:bg-[#101828] hover:text-white"
                }`}
            >
              {p}
            </button>
          );
        })}
      </div>


      <div className="max-w-6xl mx-auto grid gap-6 px-5">
        <div ref={(el:any) => (pageRefs.current[1] = el)}></div>

        {highlightBlog && (
          <Link href={`/connect/blog/${highlightBlog.id}`}>
            <div
              className="h-[380px] rounded-2xl p-8 bg-cover bg-center flex flex-col justify-end relative"
              style={{ backgroundImage: `url(${getImage(highlightBlog)})` }}
            >
              <ArrowBtn />
              <h2 className="text-white text-2xl font-bold">
                {highlightBlog.title}
              </h2>
              <p className="text-white">
                {highlightBlog.excerpt ||
                  highlightBlog.content.slice(0, 120) + "..."}
              </p>
            </div>
          </Link>
        )}

        <div className="flex flex-col gap-6">
          {sideBlogs.map((blog) => (
            <Link key={blog.id} href={`/connect/blog/${blog.id}`}>
              <div
                className="h-[350px] rounded-2xl p-8 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${getImage(blog)})` }}
              >
                <ArrowBtn />
                <h2 className="text-white text-2xl font-bold mt-4">
                  {blog.title}
                </h2>
                <p className="text-white">
                  {blog.excerpt || blog.content.slice(0, 90) + "..."}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mt-16 px-5">
        {remainingBlogs.map((blog, i) => {
          const idx = i + 2;
          const pageNo = Math.floor(idx / LIMIT) + 1;

          return (
            <div key={blog.id}>
              {idx % LIMIT === 0 && (
                <div ref={(el:any) => (pageRefs.current[pageNo] = el)}></div>
              )}

              <Link
                href={`/connect/blog/${blog.id}`}
                className="h-[250px] rounded-2xl p-8 bg-cover bg-center relative block"
                style={{ backgroundImage: `url(${getImage(blog)})` }}
              >
                <ArrowBtn />
                <h2 className="text-white text-2xl font-bold mt-4">
                  {blog.title}
                </h2>
                <p className="text-white">
                  {blog.excerpt || blog.content.slice(0, 90) + "..."}
                </p>
              </Link>
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="flex justify-center mt-12">
          <div className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      )}

      <div ref={bottomRef} className="h-20"></div>
    </div>
  );
}

const ArrowBtn = () => (
  <div className="absolute -top-1 -right-1">
    <div className="bg-white h-20 w-20 rounded-bl-4xl flex items-center justify-center">
      <div className="bg-[#101828] h-16 w-16 rounded-full flex items-center justify-center">
        <span className="text-white text-5xl -mt-2">↗</span>
      </div>
    </div>
  </div>
);
