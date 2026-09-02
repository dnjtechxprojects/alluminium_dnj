"use client";

import React from "react";
import { Factory, Globe2 } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Choose: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <Factory className="w-6 h-6 text-white" />,
      title: "High-Capacity Production",
      description:
        "State-of-the-art facilities equipped with advanced extrusion lines capable of handling diverse aluminium profiles with precision and efficiency.",
    },
    {
      icon: <Globe2 className="w-6 h-6 text-white" />,
      title: "Global Presence",
      description:
        "Strategic partnerships and distribution networks spanning multiple continents, ensuring reliable delivery and local support wherever you operate.",
    },
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
      className="py-20 bg-white text-gray-800"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        className="text-center mb-1"
        variants={item}
      >
        <span className="inline-block px-4 py-1 mb-3 text-md  normal-case font-medium text-yellow-400  ">
          Why Choose Us
        </span>
        <h2 className="text-3xl mb-3">Industry-Leading Capabilities</h2>
        <p className="text-[#4a5565] max-w-2xl mx-auto px-3">
          Combining decades of expertise with cutting-edge technology to deliver
          exceptional results.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6 mt-10"
        variants={container}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={item}
            className="border-2 border-[#e5e7eb] rounded-2xl p-8 hover:shadow-md transition"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-[#ffb600] rounded-lg mb-6">
              {feature.icon}
            </div>
            <h3 className="text-lg mb-3">{feature.title}</h3>
            <p className="text-[#4a5565] text-sm mb-4">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Choose;
