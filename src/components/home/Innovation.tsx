"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface Step {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

const Innovation: React.FC = () => {
  const steps: Step[] = [
    { id: 1, title: "01", subtitle: "Design", description: "Custom engineering" },
    { id: 2, title: "02", subtitle: "Extrude", description: "Precision shaping" },
    { id: 3, title: "03", subtitle: "Finish", description: "Quality control" },
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
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="flex justify-center items-center"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div
        className="lg:h-[80%] w-[80%] flex justify-center py-10 rounded-2xl"
        style={{
          backgroundImage: "url('/images/process-bg.png')",
        }}
      >
        <motion.div
          className="flex flex-col items-center text-center"
          variants={container}
        >
          <motion.div
            className="text-[#FFB600] pb-5 text-md normal-case flex justify-center items-center h-9 w-44 "
            variants={item}
          >
            Innovation in Motion
          </motion.div>

          <motion.div className="lg:text-5xl text-white" variants={item}>
            Discover the Extrusion Process
          </motion.div>

          <motion.p className="mt-5 text-[#99a1af] w-[70%]" variants={item}>
            Experience cutting-edge technology and precision engineering that
            transforms raw aluminium into architectural masterpieces.
          </motion.p>

          <motion.div
            className="h-16 w-16 bg-[#ffb600] rounded-full mt-6 flex justify-center items-center hover:scale-90 hover:cursor-pointer transition-transform duration-300"
            variants={item}
          >
            <a
              // href=""
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="h-8 w-8 bg-no-repeat bg-center bg-contain cursor-pointer"
                style={{
                  backgroundImage: "url('/icons/videoicon.png')",
                }}
              ></div>
            </a>
          </motion.div>

          <motion.div className="text-[#6a7282] mt-6" variants={item}>
            Watch our process video
          </motion.div>

          <motion.div
            className="flex flex-wrap md:flex-wrap lg:flex-nowrap gap-6 justify-center lg:justify-between items-stretch mt-12 px-3"
            variants={container}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={item}
                className={`h-26 bg-[rgba(255,255,255,0.08)] rounded-2xl p-3 text-center border border-white/10 hover:border-[#ffb600]/40 transition-all duration-300 
                w-[45%] sm:w-[45%] md:w-[45%] lg:flex-1 lg:min-w-60 lg:max-w-[220px]
                ${index === 2 ? "mx-auto" : ""}`}
              >
                <h3 className="text-[#ffb600] text-sm mb-2">{step.title}</h3>
                <p className="text-sm text-white">{step.subtitle}</p>
                <p className="text-xs text-[#99a1af] mt-2">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Innovation;
