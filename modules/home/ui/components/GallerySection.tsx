"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const industries = [
  { id: 1, name: "Pharmaceutical Research", image: "/gallery/gallery1.jpg" },
  { id: 2, name: "Agrochemicals", image: "/gallery/gallery2.jpg" },
  { id: 3, name: "Research & Development", image: "/gallery/gallery3.jpg" },
  { id: 4, name: "Pharmaceutical Manufacture", image: "/gallery/gallery4.jpg" },
  { id: 5, name: "Automotive Coatings", image: "/gallery/gallery5.jpg" },
  { id: 6, name: "Industrial Lubricants", image: "/gallery/gallery6.jpg" },
  { id: 7, name: "Color & Pigments", image: "/gallery/gallery7.jpg" },
  { id: 8, name: "Chemical", image: "/gallery/gallery8.jpg" },
  { id: 9, name: "Color & Pigments", image: "/gallery/gallery9.jpg" },
  { id: 10, name: "Veterinary Medicine", image: "/gallery/gallery10.jpg" },
  { id: 11, name: "Pesticide", image: "/gallery/gallery11.jpg" },
  { id: 12, name: "Medical", image: "/gallery/gallery12.jpg" },
];

export const IndustriesGallerySection = () => {
  const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="bg-ivory py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
          className="text-teal-green text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16"
        >
          Industries We Served
        </motion.h2>

        {/* Gallery Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.id}
              variants={cardVariants}
              className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <Image
                src={industry.image}
                alt={industry.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-ebony via-ebony/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Title */}
              <div className="absolute inset-0 flex items-end p-6">
                <h3 className="text-ivory text-xl font-bold transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                  {industry.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
