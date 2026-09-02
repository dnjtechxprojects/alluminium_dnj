
"use client";

import { useEffect, useRef, useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SectionHeader from "@/components/common/SectionHeader";
import StaticContent from "./StaticContent";
import Image from "next/image";
import AuthContext from "@/context/AuthProvider";

interface ContactInfo {
  image: string;
  title: string;
  description: string;
  secondtitle: string;
  seconddescription: string;
}

const LIMIT = 1000;

export default function ProductPage({
  title,
  pageKey,
  contactInfo,
}: {
  title: string;
  pageKey: string;
  contactInfo?: ContactInfo;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startPage = Number(searchParams.get("page")) || 1;

  const { products, productLoader, setProductLoader } =
    useContext(AuthContext)!;

  const [page, setPage] = useState(startPage);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const filteredProducts = products.filter(
    (p) => p.page === pageKey
  );

  const totalPages = Math.ceil(filteredProducts.length / LIMIT) || 1;


  useEffect(() => {
    setProductLoader((prev) => ({
      ...prev,
      [pageKey]: true,
    }));

    const timer = setTimeout(() => {
      setProductLoader((prev) => ({
        ...prev,
        [pageKey]: false,
      }));
    }, 600);

    return () => clearTimeout(timer);
  }, [pageKey]);

  useEffect(() => {
    router.replace(`?page=${page}`, { scroll: false });
  }, [page]);

  useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && page < totalPages) {
        setPage((p) => p + 1);
      }
    });

    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [page, totalPages]);

  return (
    <section className="w-full bg-white pb-6">
      <SectionHeader title={title} maintitle="Products" />

      <div className="max-w-7xl mx-auto px-4">

        <div className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden 3xl:flex flex-col gap-3">
          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => {
                  pageRefs.current[p]?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setPage(p);
                }}
              >
                {p}
              </button>
            );
          })}
        </div>

        <div className="mt-16">

          {filteredProducts.length === 0 &&
            productLoader[pageKey] && (
              <div className="flex justify-center mt-10">
                <div className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
              </div>
            )}

          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, i) => {
              const pageNo = Math.floor(i / LIMIT) + 1;

              return (
                <div key={product.id}>
                  {i % LIMIT === 0 && (
                    <div
                      ref={(el) => {
                        pageRefs.current[pageNo] = el;
                      }}
                    />
                  )}

                  <div className="mb-24">
                    <div
                      className={`flex flex-col mt-10 lg:flex-row items-center md:gap-12 ${
                        i % 2 !== 0
                          ? "lg:flex-row-reverse"
                          : ""
                      }`}
                    >
                      <div className="w-full lg:w-[560px] h-full lg:p-6">
                        <div className="relative w-full max-sm:h-[250px] md:h-[400px] ">
                          <Image
                            src={
                              product.image
                                ? `/api/image/${product.image}`
                                : "/images/placeholder.png"
                            }
                            alt={product.title}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      </div>

                      <div className="flex-1 max-sm:mt-3 lg:px-12 xl:px-12 space-y-4 
                        max-md:flex max-md:flex-col max-md:items-center max-md:justify-center lg:mt-1">

                        <h3 className="text-lg lg:text-2xl xl:text-2xl  
                          text-center lg:text-left text-[#FFB600] tracking-wider">
                          {product.title}
                        </h3>

                        <h4 className="mt-1 max-sm:text-md text-black text-lg font-medium
                          text-center lg:text-left">
                          {product.slug}
                        </h4>

                        <p className="mt-3 text-gray-600 max-sm:text-sm lg:text-lg 
                          text-center lg:text-left">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {i === 0 && contactInfo && (
                    <StaticContent
                      image={contactInfo.image}
                      title={contactInfo.title}
                      description={contactInfo.description}
                      secondtitle={contactInfo.secondtitle}
                      seconddescription={
                        contactInfo.seconddescription
                      }
                    />
                  )}
                </div>
              );
            })
          ) : (
            !productLoader[pageKey] &&
            contactInfo && (
              <StaticContent
                image={contactInfo.image}
                title={contactInfo.title}
                description={contactInfo.description}
                secondtitle={contactInfo.secondtitle}
                seconddescription={
                  contactInfo.seconddescription
                }
              />
            )
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  );
}