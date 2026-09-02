"use client";

import Image from "next/image";
import React from "react";
import { motion, Variants } from "framer-motion";

interface Stat {
  value: string;
  label: string;
}

const Capabilities: React.FC = () => {
  const stats: Stat[] = [
    { value: "500+", label: "Projects Completed" },
    { value: "99.8%", label: "Quality Rate" },
    { value: "24/7", label: "Support Available" },
  ];

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      className="relative w-full flex justify-center items-center py-10"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="relative w-[80%] h-[70vh] flex justify-center items-center">
      
       <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
  <Image
    src="/images/capabilities-bg.png"
    alt="Capabilities"
    fill
    className="object-cover"
    priority
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
</div>

        <div className="absolute " />

        <motion.div
          className="absolute inset-0 flex flex-col justify-center px-3 md:px-20 text-white space-y-6"
          variants={container}
        >
          <motion.div
            className="normal-case backdrop-blur-[1px] md:mt-7 text-md px-4 py-1 font-semibold rounded-full w-fit text-[#8ec5ff] "
            variants={item}
          >
            Our Capabilities
          </motion.div>

          <motion.h2
            className="lg:text-5xl leading-tight text-2xl font-semibold lg:font-normal"
            variants={item}
          >
            Boundless Choices, <br /> Tailored Outcomes.
          </motion.h2>

          <motion.p
            className="max-w-xl text-[#ffffffe6] text-sm leading-relaxed -mt-5"
            variants={item}
          >
            From custom profiles to standard solutions, our comprehensive range
            meets the unique demands of every project with precision and
            excellence.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-2 items-center lg:flex-nowrap lg:flex-row lg:justify-start -mt-4"
            variants={container}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={item}
                className={`bg-white/10 backdrop-blur-[3px] rounded-lg px-4 py-3 border border-gray-500 
                  w-[45%] sm:w-[45%] md:w-[45%] h-auto lg:w-52 lg:h-16 text-center sm:text-left 
                  ${index === 2 ? "w-[90%]" : ""}`}
              >
                <span className="block text-sm sm:text-base md:text-lg lg:text-xl truncate">
                  {stat.value}
                </span>
                <span className="block text-gray-300 text-xs sm:text-sm truncate">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Capabilities;
