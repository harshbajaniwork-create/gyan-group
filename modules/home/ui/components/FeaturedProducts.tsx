"use client";

import Link from "next/link";
import { ArrowRight, Beaker, Droplet, Palette } from "lucide-react";
import { motion } from "framer-motion";

const productCategories = [
  {
    id: 1,
    name: "Pharma & API Intermediates",
    description:
      "High-quality pharmaceutical intermediates and Active Pharmaceutical Ingredients for drug manufacturing.",
    icon: Beaker,
    productCount: "50+",
    image: "/pharma1.png",
    slug: "pharma-and-api-intermediates",
  },
  {
    id: 2,
    name: "Dye Intermediates",
    description:
      "Essential intermediates for textile dyes and colorants with superior quality and consistency.",
    icon: Droplet,
    productCount: "40+",
    image: "/pharma2.png",
    slug: "pigment-intermediates",
  },
  {
    id: 3,
    name: "Pigment Intermediates",
    description:
      "Specialized intermediates for paint, coating, and printing ink industries.",
    icon: Palette,
    productCount: "30+",
    image: "/pharma3.png",
    slug: "dye-intermediates",
  },
];

export const FeaturedProductsSection = () => {
  const fadeInUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
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

  return (
    <section className="bg-white py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-ebony text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our Product Categories
          </h2>
          <p className="text-pewter text-base md:text-lg max-w-3xl mx-auto mb-8">
            Explore our comprehensive range of chemical intermediates
            manufactured to meet the highest industry standards across
            pharmaceutical, dye, and pigment sectors.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {productCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div key={category.id} variants={fadeInUp}>
                <Link
                  href={`/products/${category.slug}`}
                  className="group block bg-ivory rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full"
                >
                  {/* Icon Container */}
                  <div className="relative h-[200px] bg-linear-to-br from-teal-green to-turquoise-blue p-8 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-ebony/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                      <Icon className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 text-teal-green text-sm font-bold px-4 py-2 rounded-full">
                      {category.productCount} Products
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-ebony text-xl font-bold leading-tight mb-3 group-hover:text-teal-green transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-pewter text-sm leading-relaxed mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-2 text-teal-green font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                      Explore Category
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-green text-white text-lg font-semibold rounded-lg hover:bg-turquoise-blue transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
