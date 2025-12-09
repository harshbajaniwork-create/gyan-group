"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const featuredProducts = [
  {
    id: 1,
    name: "4 Methyl 2 Amino 6 Nitro Phenol",
    casNumber: "CAS: 6265-07-2",
    category: "Pharma Intermediate",
    image: "/pharma1.png",
    slug: "4-methyl-2-amino-6-nitro-phenol",
  },
  {
    id: 2,
    name: "2,5 Diethoxy Aniline",
    casNumber: "CAS: 94-85-9",
    category: "API Intermediate",
    image: "/pharma2.png",
    slug: "2-5-diethoxy-aniline",
  },
  {
    id: 3,
    name: "N N Dimethyl Benzaldehyde",
    casNumber: "CAS: 100-10-7",
    category: "Specialty Chemical",
    image: "/pharma3.png",
    slug: "n-n-dimethyl-benzaldehyde",
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
            Featured Products
          </h2>
          <p className="text-pewter text-base md:text-lg max-w-3xl mx-auto mb-8">
            Explore our range of high-quality pharmaceutical intermediates and
            specialty chemicals manufactured to the highest standards.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={fadeInUp}>
              <Link
                href={`/products/pharma-and-api-intermediates/${product.slug}`}
                className="group block bg-ivory rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-[300px] bg-linear-to-br from-white to-ivory p-6 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-teal-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={220}
                    height={220}
                    className="object-contain relative z-10 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-teal-green text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 border-t-4 border-teal-green">
                  <p className="text-pewter text-sm mb-2 font-medium">
                    {product.casNumber}
                  </p>
                  <h3 className="text-ebony text-xl font-bold leading-tight mb-4 group-hover:text-teal-green transition-colors duration-300">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 text-teal-green font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
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
            href="/products/pharma-and-api-intermediates"
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
