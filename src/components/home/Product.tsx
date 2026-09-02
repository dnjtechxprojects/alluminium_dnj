
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { motion, Variants } from "framer-motion";

interface Product {
  id: string;
  title: string;
  description?: string;
  image?: string;
  slug?: string;
  page?: string;
  createdAt?: string;
}

const normalize = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "").replace(/-/g, "");

const pageMap = [
  { key: "extrudedproducts", label: "Extruded Products", href: "/product/extrudedproducts" },
  { key: "newalloy", label: "New Alloy", href: "/product/newalloy" },
  { key: "diemanufacturing", label: "Die Manufacturing", href: "/product/diemanufacturing" },
  { key: "fabrication", label: "Fabrication", href: "/product/fabrication" },
];

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const origin =
    typeof window !== "undefined" ? window.location.origin : "";

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/product?limit=1000");
      const all: Product[] = res.data.data;

      const latest = pageMap.map((page) => {
        return all.find(
          (p) => normalize(p.page || "") === normalize(page.label)
        );
      });

      setProducts(latest.filter(Boolean) as Product[]);
    } catch (error) {
      console.error("Product fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getPageHref = (pageName?: string) => {
    const found = pageMap.find(
      (p) => normalize(p.label) === normalize(pageName || "")
    );
    return found?.href || "/";
  };

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  if (loading)
    return <p className="text-center py-20">Loading products...</p>;

  return (
    <motion.section
      className="py-16 flex flex-col items-center"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div className="text-center" variants={item}>
        <span className="inline-block px-4 py-1 mb-3 text-md font-medium text-[#ffb600]">
          🌟 Product Excellence
        </span>
        <h2 className="text-3xl text-gray-900 mb-2 font-semibold">
          Our Products
        </h2>
        <p className="text-[#4a5565] max-w-2xl mx-auto px-3">
          Comprehensive solutions engineered for performance, durability, and
          aesthetic excellence.
        </p>
      </motion.div>

      <motion.div
        className="mt-12 flex flex-wrap justify-center gap-6 w-[90%]"
        variants={container}
      >
        {products.map((product) => {
          const href = getPageHref(product.page);

          return (
            <motion.div
              key={product.id}
              variants={item}
              className="w-full sm:w-[48%] lg:w-[23%] flex"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col w-full h-full">
                <div className="relative h-60 w-full">
                  <Image
                    src={
                      product.image
                        ? `${origin}/api/image/${product.image}`
                        : "/images/placeholder.png"
                    }
                    alt={product.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <span className="absolute top-3 right-3 text-[12px] bg-white/90 text-[#ffb600] px-3 py-1 rounded-full font-medium">
                    {product.page}
                  </span>
                </div>

                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-[18px] font-medium text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {product.description?.slice(0, 90)}...
                    </p>
                  </div>

                  <Link href={href}>
                    <span className="mt-4 text-[#ffb600] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                      Learn More →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}