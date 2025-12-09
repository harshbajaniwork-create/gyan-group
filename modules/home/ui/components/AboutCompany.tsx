"use client";

import Image from "next/image";
import Link from "next/link";
import { Building2, Target, Users, Beaker, Microscope } from "lucide-react";
import { motion } from "framer-motion";

export const AboutCompanySection = () => {
  const features = [
    {
      icon: Building2,
      title: "A vast experience in custom synthesis since 2003.",
    },
    {
      icon: Target,
      title: "A partner who ensure that your requirements are met.",
    },
    {
      icon: Users,
      title: "A dedicated attentive and responsive team working.",
    },
    {
      icon: Microscope,
      title:
        "A wide range of innovative and not available molecules with high performance.",
    },
    {
      icon: Beaker,
      title:
        "A constant supply of exclusive chemicals coming from our collaboration.",
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const fadeInUpLarge = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const fadeInLeft = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const fadeInRight = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
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

  const scaleInSmall = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] as const },
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

  const staggerContainerFast = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="bg-ivory py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Section - About Gyan Group */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-32">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h3
              variants={fadeInUp}
              className="text-teal-green text-sm md:text-base font-semibold tracking-wider uppercase mb-4"
            >
              ABOUT GYAN GROUP
            </motion.h3>
            <motion.h2
              variants={fadeInUpLarge}
              className="text-ebony text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            >
              Gaining knowledge, is the first step to wisdom. Sharing it, is the
              first step to humanity.
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              className="space-y-4 text-pewter text-base md:text-lg leading-relaxed"
            >
              <motion.p variants={fadeInUp}>
                <span className="font-semibold text-ebony">
                  Gyan (knowledge)
                </span>{" "}
                is considered as all{" "}
                <span className="font-semibold text-ebony">
                  powerful / omnipotent
                </span>
                , a thing one has to strive to achieve not only for wellbeing of
                all <span className="font-semibold text-ebony">mankind</span>{" "}
                but even for emancipation of its{" "}
                <span className="font-semibold text-ebony">soul</span>.
              </motion.p>
              <motion.p variants={fadeInUp}>
                <span className="font-semibold text-ebony">Gyan</span> is
                dedicated to{" "}
                <span className="font-semibold text-ebony">
                  Green Chemistry
                </span>{" "}
                with facilities and technical know how available from{" "}
                <span className="font-semibold text-ebony">
                  Research & Development
                </span>{" "}
                work to bulk production of Speciality Chemicals for Bulk Drugs,
                Agro-chemicals, Dyes & Pigments, Polymers, perfumery chemicals.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl group"
          >
            <Image
              src="/aboutimg1.jpg"
              alt="Chemical molecules structure"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ebony/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </div>

        {/* Second Section - Our History */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInLeft}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl lg:order-1 group"
          >
            <Image
              src="/aboutimg2.jpg"
              alt="Laboratory research"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ebony/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:order-2"
          >
            <motion.h2
              variants={fadeInRight}
              className="text-teal-green text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Our History
            </motion.h2>
            <motion.div
              variants={staggerContainerFast}
              className="space-y-4 text-pewter text-base md:text-lg leading-relaxed mb-8"
            >
              <motion.p variants={fadeInUp}>
                Gyan started its journey to become a{" "}
                <span className="font-semibold text-ebony">little giant</span>{" "}
                in the field of Chemical Technology by inception of{" "}
                <span className="font-semibold text-ebony">
                  Gyan Technology
                </span>{" "}
                in <span className="font-semibold text-ebony">2008</span> in a
                Chemical industrial township of{" "}
                <span className="font-semibold text-ebony">
                  Vapi, Gujarat, India
                </span>
                . Expanding its scale of production, in{" "}
                <span className="font-semibold text-ebony">2013 Gyan</span> came
                up with{" "}
                <span className="font-semibold text-ebony">
                  Gyan Healthcare
                </span>{" "}
                state-of-the-art bulk production facility at{" "}
                <span className="font-semibold text-ebony">
                  Junagadh, Gujarat, India
                </span>{" "}
                and further consolidated its manufacturing facility by adding up
                another production facility at{" "}
                <span className="font-semibold text-ebony">
                  Sarigam, Gujarat, India
                </span>{" "}
                namely Reliable life Science in{" "}
                <span className="font-semibold text-ebony">2017</span>.
              </motion.p>
            </motion.div>

            {/* Quote */}
            <motion.div
              variants={scaleInSmall}
              className="border-l-4 border-teal-green pl-6 py-4 mb-8 bg-teal-green/10 rounded-r-lg transition-colors duration-300"
            >
              <p className="text-ebony text-lg md:text-xl italic leading-relaxed">
                &quot;We strive to become acknowledged Global Leaders and
                preferred Partners in helping our Clients succeed in the rapidly
                evolving Pharmaceutical markets.&quot;
              </p>
            </motion.div>

            {/* Read More Button */}
            <motion.div variants={fadeInUp}>
              <Link
                href="/about/company-profile"
                className="inline-flex items-center gap-2 px-8 py-3 bg-teal-green text-white font-semibold rounded-lg hover:bg-turquoise-blue transition-all duration-300 shadow-lg hover:shadow-xl hover:gap-3 group"
              >
                Read More
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Custom Synthesis Section */}
        <div className="mt-20 lg:mt-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUpLarge}
                className="text-teal-green text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              >
                Custom Synthesis
              </motion.h2>
              <motion.div
                variants={staggerContainer}
                className="space-y-4 text-pewter text-base md:text-lg leading-relaxed mb-8"
              >
                <motion.p variants={fadeInUp}>
                  <span className="font-semibold text-ebony">
                    Custom synthesis
                  </span>{" "}
                  is the process where a{" "}
                  <span className="font-semibold text-ebony">molecule</span> is
                  made exclusively for a particular client according to{" "}
                  <span className="font-semibold text-ebony">
                    specifications
                  </span>{" "}
                  at their scale. As a reminder, in the chemistry world the
                  synthesis of{" "}
                  <span className="font-semibold text-ebony">chemicals</span> is
                  set up on a single or several chemical reactions process which{" "}
                  <span className="font-semibold text-ebony">targets</span> the
                  development of a{" "}
                  <span className="font-semibold text-ebony">
                    complex chemical
                  </span>{" "}
                  from reactants or other substances.
                </motion.p>
                <motion.p variants={fadeInUp}>
                  We are involved in numerous{" "}
                  <span className="font-semibold text-ebony">
                    industrial projects
                  </span>{" "}
                  and collaborative partnerships, and we are attached to{" "}
                  <span className="font-semibold text-ebony">continuously</span>{" "}
                  expand our internal{" "}
                  <span className="font-semibold text-ebony">R&D programs</span>{" "}
                  to maintain a high level of competence and innovation in many
                  fields of{" "}
                  <span className="font-semibold text-ebony">
                    organic chemistry
                  </span>
                  .
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <Image
                src="/aboutimg3.jpg"
                alt="Custom synthesis laboratory"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ebony/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainerFast}
            className="mt-16"
          >
            <motion.h3
              variants={fadeInUp}
              className="text-ebony text-2xl md:text-3xl font-bold mb-8 text-center"
            >
              You must work with us if you are looking for:
            </motion.h3>
            <motion.div
              variants={staggerContainerFast}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-teal-green/10 hover:border-teal-green/30 hover:-translate-y-2 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-teal-green/10 flex items-center justify-center mb-4 group-hover:bg-teal-green/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon className="w-7 h-7 text-teal-green group-hover:text-turquoise-blue transition-colors duration-300" />
                    </div>
                    <p className="text-ebony text-base font-medium leading-relaxed">
                      {feature.title}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
