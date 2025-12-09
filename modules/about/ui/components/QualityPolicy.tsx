"use client";

import {
  Target,
  Truck,
  Shield,
  CheckCircle,
  Lock,
  Users,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const initiatives = [
  {
    icon: Target,
    text: "In order to achieve the goals of our Quality Policy, quality-related objectives will be set for each department, and the state of their implementation will be monitored.",
  },
  {
    icon: Truck,
    text: "Deliver our products on time and consistently invent optimal distribution routes to minimize costs and shipment time.",
  },
  {
    icon: Shield,
    text: "Operations are conducted in compliance with applicable regulations and standards.",
  },
  {
    icon: CheckCircle,
    text: "Ensure uncompromised quality throughout processing.",
  },
  {
    icon: Lock,
    text: "Preserve the intellectual property rights of our clients, and practice confidentiality in the intermediate discovery and development of processes.",
  },
  {
    icon: Users,
    text: "Our employees will be familiar with every aspect of our Quality Policy, and will promote the creation of a level of quality that can satisfy our customers.",
  },
];

const QualityPolicy = () => {
  const headerVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const paragraphVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const cardStaggerContainer = {
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

  const bannerQuoteVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1, ease: [0.34, 1.56, 0.64, 1] as const },
    },
  };

  const bannerValuesContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const valueVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
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
          variants={headerVariants}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-teal-green text-3xl md:text-4xl lg:text-5xl font-bold">
            Quality Policy
          </h2>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center mb-12 md:mb-16 space-y-4"
        >
          <motion.p
            variants={paragraphVariants}
            className="text-pewter text-base md:text-lg leading-relaxed"
          >
            We strive for continuous{" "}
            <span className="font-semibold text-ebony">improvements</span> to
            meet or exceed the expectations of our{" "}
            <span className="font-semibold text-ebony">customers</span> in
            respect of <span className="font-semibold text-ebony">quality</span>
            , delivery of products and completion of{" "}
            <span className="font-semibold text-ebony">projects</span> on
            schedule.
          </motion.p>
          <motion.p
            variants={paragraphVariants}
            className="text-pewter text-base md:text-lg leading-relaxed"
          >
            We empower our{" "}
            <span className="font-semibold text-ebony">employees</span> and
            maintain an environment that enables individuals to achieve
            functional excellence, continuous{" "}
            <span className="font-semibold text-ebony">improvement</span>,
            teamwork and{" "}
            <span className="font-semibold text-ebony">innovation</span>. We
            shall achieve this through the following initiatives:
          </motion.p>
        </motion.div>

        {/* Initiative Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardStaggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-20"
        >
          {initiatives.map((initiative, index) => {
            const Icon = initiative.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="w-14 h-14 rounded-full bg-teal-green/10 flex items-center justify-center mb-4 group-hover:bg-teal-green/20 transition-all duration-500 group-hover:scale-110">
                  <Icon className="w-7 h-7 text-teal-green group-hover:text-turquoise-blue transition-colors duration-300" />
                </div>
                <p className="text-pewter text-base leading-relaxed">
                  {initiative.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quote Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative bg-linear-to-r from-teal-green to-turquoise-blue rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="20" cy="20" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10">
            {/* Quote */}
            <motion.div
              variants={bannerQuoteVariants}
              className="text-center mb-8 md:mb-12"
            >
              <svg
                className="w-12 h-12 md:w-16 md:h-16 text-white/40 mx-auto mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold italic leading-relaxed">
                &quot;Where Innovation, Technology & Quality Drive Responsible
                Chemistry&quot;
              </h3>
            </motion.div>

            {/* Values */}
            <motion.div
              variants={bannerValuesContainer}
              className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12"
            >
              <motion.div
                variants={valueVariants}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-base md:text-lg font-semibold uppercase tracking-wider">
                  Trust
                </span>
              </motion.div>

              <motion.div
                variants={valueVariants}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-base md:text-lg font-semibold uppercase tracking-wider">
                  Innovation
                </span>
              </motion.div>

              <motion.div
                variants={valueVariants}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-base md:text-lg font-semibold uppercase tracking-wider">
                  Safety
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QualityPolicy;
