"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { prepareWindow } from "@/lib/helperFunctions";

interface Product {
  id: string;
  title: string;
  page?: string;
  image?: string;
}

const LIMIT = 10;

export default function AdminProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startPage = Number(searchParams.get("page")) || 1;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(startPage);

  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/product?limit=1000");
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm) return;
    await axios.delete(`/api/product?id=${id}`);
    fetchProducts();
  };

useEffect(() => {
    router.replace(`?page=${page}`, { scroll: false });
  }, [page]);

  const totalPages = Math.ceil(products.length / LIMIT);

  return (
    <div className="w-full py-6 px-6 bg-white relative">
  
      <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Products</h1>
        <button
          onClick={() => router.push("/admin-product/create")}
          className="bg-black text-white px-6 py-2 rounded-xl hover:cursor-pointer"
        >
          + Add Product
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
              className={`w-10 h-10 rounded-full font-bold hover:cursor-pointer
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
    <div className="max-w-7xl mx-auto">
        {loading && <p className="text-center py-10">Loading...</p>}

        {!loading &&
          Array.from({ length: totalPages }).map((_, i) => {
            const currentPage = i + 1;
            const start = i * LIMIT;
            const pageProducts = products.slice(start, start + LIMIT);

            return (
              <div
                key={currentPage}
                ref={(el) => {
                  pageRefs.current[currentPage] = el;
                }}
                className="mb-16"
              >
              
                <div className="overflow-x-auto rounded-xl border">
                  <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-2">Image</th>
                        <th className="border px-4 py-2">Title</th>
                        <th className="border px-4 py-2">Page</th>
                        <th className="border px-4 py-2 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                  <tbody>
                      {pageProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50">
                          <td className="border px-4 py-3">
                            {p.image ? (
                              <Image
                                src={`/api/image/${p.image}`}
                                alt={p.title}
                                width={80}
                                height={60}
                                className="rounded object-cover"
                                unoptimized
                              />
                            ) : (
                              <span className="text-gray-400 text-xs">
                                No Image
                              </span>
                            )}
                          </td>

                          <td className="border px-4 py-2 font-medium">
                            {p.title}
                          </td>

                          <td className="border px-4 py-2 text-sm text-gray-600">
                            {p.page || "-"}
                          </td>

                          <td className="border px-4 py-2 text-center">
                            <div className="flex justify-center gap-3">
                              <button
                                onClick={() =>
                                  router.push(
                                    `/admin-product/create?id=${p.id}`
                                  )
                                }
                                className="px-4 py-1 bg-blue-500 text-white rounded hover:cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteProduct(p.id)}
                                className="px-4 py-1 bg-red-500 text-white rounded hover:cursor-pointer"
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
  );
}
