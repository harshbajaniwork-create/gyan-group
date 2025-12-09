"use client";

import Link from "next/link";
import { MapPin, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const countries = [
  "Germany",
  "USA",
  "China",
  "Japan",
  "Switzerland",
  "France",
  "Italy",
  "South Africa",
];

export const GlobalReachSection = () => {
  const fadeInUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const fadeInScale = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="bg-ebony py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="global-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#global-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-12 rounded-full bg-teal-green/20 flex items-center justify-center">
                <Globe className="w-6 h-6 text-teal-green" />
              </div>
              <h2 className="text-ivory text-3xl md:text-4xl lg:text-5xl font-bold">
                Global Reach
              </h2>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-ivory/90 text-base md:text-lg leading-relaxed mb-8"
            >
              Gyan Group serves customers across continents, delivering premium
              pharmaceutical intermediates and specialty chemicals to meet
              global demands. Our commitment to quality and reliability has made
              us a trusted partner in the international chemical industry.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link
                href="/we-export"
                className="inline-flex items-center gap-2 px-8 py-3 bg-teal-green text-white font-semibold rounded-lg hover:bg-turquoise-blue transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                View Our Global Presence
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Countries List */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInScale}
            className="bg-ivory/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-teal-green/20"
          >
            <h3 className="text-ivory text-2xl font-bold mb-6 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-teal-green" />
              Countries We Export To
            </h3>
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4"
            >
              {countries.map((country, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-2 h-2 rounded-full bg-coral-red group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-ivory/80 text-base group-hover:text-turquoise-blue transition-colors duration-300">
                    {country}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 pt-8 border-t border-ivory/10">
              <p className="text-ivory/70 text-sm italic">
                &quot;Delivering excellence across borders, building
                partnerships worldwide.&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
