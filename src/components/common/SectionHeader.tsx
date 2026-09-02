"use client";

import Link from "next/link";

interface IndustryHeaderProps {
  title: string;
  maintitle:string;
}

export default function IndustryHeader({ title , maintitle }: IndustryHeaderProps) {
  return (
    <div className="w-full bg-[#212121] mt-16">
      <div className=" mx-auto px-10 py-9  lg:py-16 flex justify-center items-center flex-col lg:items-start ">
      <h3 className="uppercase text-white md:font-semibold">
        {maintitle}
      </h3>
      
        <h1 className="text-white text-3xl md:font-semibold sm:text-5xl md:text-6xl  mb-6 ">
          {title}
        </h1>

        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">{title}</span>
        </div>

      </div>
    </div>
  );
}
