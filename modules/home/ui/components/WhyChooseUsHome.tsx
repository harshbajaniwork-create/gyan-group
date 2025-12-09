"use client";

import { Shield, Zap, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "ISO certified processes ensuring the highest standards in every product we manufacture.",
  },
  {
    icon: Zap,
    title: "Rapid Delivery",
    description:
      "Efficient logistics and production systems for timely delivery across the globe.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Highly skilled chemists and technicians with decades of combined experience.",
  },
  {
    icon: CheckCircle,
    title: "Custom Solutions",
    description:
      "Tailored chemical synthesis to meet your specific requirements and specifications.",
  },
];

export const WhyChooseUsHome = () => {
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
    <section className="bg-ivory py-16 md:py-24 lg:py-32">
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
            Why Choose Gyan Group?
          </h2>
          <p className="text-pewter text-base md:text-lg max-w-3xl mx-auto">
            We combine expertise, innovation, and dedication to deliver
            exceptional chemical solutions that drive your success.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="w-14 h-14 rounded-full bg-teal-green/10 flex items-center justify-center mb-6 group-hover:bg-teal-green/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="w-7 h-7 text-teal-green group-hover:text-turquoise-blue transition-colors duration-300" />
                </div>
                <h3 className="text-ebony text-xl font-bold mb-3 group-hover:text-teal-green transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-pewter text-base leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
