
"use client";

import { useEffect, useRef, useState, useContext, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SectionHeader from "@/components/common/SectionHeader";
import PaperBackground from "@/components/common/PaperBackground";
import StaticContent from "./StaticContent";
import Image from "next/image";
import AuthContext from "@/context/AuthProvider";
import { getImageSrc } from "@/lib/image";

interface ContactInfo {
  image?: string;
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
  children,
}: {
  title: string;
  pageKey: string;
  contactInfo?: ContactInfo;
  /** Rendered after the product list, on the same paper surface. */
  children?: ReactNode;
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
    <section className="w-full">
      <SectionHeader title={title} maintitle="Products" />

      <PaperBackground className="pb-6">
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
                    {/* Same image/text row as the Segments pages: the photo
                        fills half the row at its natural aspect ratio. */}
                    <div
                      className={`mt-10 grid grid-cols-1 gap-7 md:gap-10 items-center ${
                        product.image ? "md:grid-cols-2" : ""
                      }`}
                    >
                      {product.image && (
                        // Uploads have unknown dimensions, so let CSS size
                        // the image from the column width.
                        <Image
                          src={getImageSrc(product.image)}
                          alt={product.title}
                          width={0}
                          height={0}
                          sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw"
                          quality={90}
                          className={`object-cover w-full h-[250px] md:h-auto ${
                            i % 2 !== 0 ? "md:order-last" : ""
                          }`}
                          loading={i === 0 ? "eager" : "lazy"}
                          fetchPriority={i === 0 ? "high" : "auto"}
                        />
                      )}

                      <div className="lg:px-6 xl:px-9 space-y-4 text-center md:text-left">
                        <h3 className="text-lg lg:text-2xl xl:text-2xl text-[#FFB600] tracking-wider">
                          {product.title}
                        </h3>

                        <h4 className="mt-1 max-sm:text-md text-black text-lg font-medium">
                          {product.slug}
                        </h4>

                        <p className="mt-3 text-gray-600 max-sm:text-sm lg:text-lg">
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
      {children}
      </PaperBackground>
    </section>
  );
}