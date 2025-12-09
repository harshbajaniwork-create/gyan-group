"use client";

import Link from "next/link";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const CTASection = () => {
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
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="bg-linear-to-br from-teal-green via-teal-green to-turquoise-blue py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="cta-pattern"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-pattern)" />
        </svg>
      </div>

      {/* Floating circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center"
        >
          {/* Main CTA */}
          <motion.h2
            variants={fadeInUp}
            className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          >
            Ready to Partner with Us?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-white/90 text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-12"
          >
            Let&apos;s collaborate to bring your chemical synthesis projects to
            life. Contact us today to discuss your requirements and discover how
            Gyan Group can help you achieve your goals.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInScale}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-green text-lg font-semibold rounded-lg hover:bg-ivory transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 group"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/products/pharma-and-api-intermediates"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-teal-green transition-all duration-300 group"
            >
              Browse Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <motion.a
              href="tel:+919825886288"
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white/70 text-sm mb-1">Call Us</p>
                  <p className="text-white text-lg font-semibold">
                    +91 982 588 6288
                  </p>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="mailto:info@gyangroup.in"
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white/70 text-sm mb-1">Email Us</p>
                  <p className="text-white text-lg font-semibold">
                    info@gyangroup.in
                  </p>
                </div>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
