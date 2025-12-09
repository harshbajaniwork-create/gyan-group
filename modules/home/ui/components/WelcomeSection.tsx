"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  {
    icon: Award,
    value: "18+",
    label: "Years of Excellence",
    color: "text-teal-green",
  },
  {
    icon: Target,
    value: "100%",
    label: "Quality Commitment",
    color: "text-turquoise-blue",
  },
  {
    icon: TrendingUp,
    value: "10+",
    label: "Countries Served",
    color: "text-turquoise-blue",
  },
];

const fadeInLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const WelcomeSection = () => {
  return (
    <section className="bg-white py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h3
              variants={fadeInLeft}
              className="text-teal-green text-sm md:text-base font-semibold tracking-wider uppercase mb-4"
            >
              Welcome to Gyan Group
            </motion.h3>
            <motion.h2
              variants={fadeInLeft}
              className="text-ebony text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            >
              Leading Innovation in Chemical Technology
            </motion.h2>
            <motion.p
              variants={fadeInLeft}
              className="text-pewter text-base md:text-lg leading-relaxed mb-6"
            >
              At Gyan Group, we are dedicated to excellence in pharmaceutical
              and chemical manufacturing. With over 18 years of experience,
              we&apos;ve established ourselves as a trusted partner in
              delivering high-quality specialty chemicals and pharmaceutical
              intermediates.
            </motion.p>
            <motion.p
              variants={fadeInLeft}
              className="text-pewter text-base md:text-lg leading-relaxed mb-8"
            >
              Our commitment to innovation, sustainability, and customer
              satisfaction drives us to continuously improve our processes and
              expand our capabilities across multiple facilities in India.
            </motion.p>
            <motion.div variants={fadeInLeft}>
              <Link
                href="/about/company-profile"
                className="inline-flex items-center gap-2 px-8 py-3 bg-teal-green text-white font-semibold rounded-lg hover:bg-turquoise-blue transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                Discover Our Story
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/aboutimg1.jpg"
              alt="Gyan Group Facility"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ebony/40 to-transparent" />
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-6"
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-ivory rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-ebony text-3xl md:text-4xl font-bold mb-2">
                  {item.value}
                </h3>
                <p className="text-pewter text-base font-medium">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
