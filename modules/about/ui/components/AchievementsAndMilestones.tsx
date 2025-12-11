"use client";

import { useRef } from "react";
import { Award, Calendar, Building2, MapPin, TrendingUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: number;
  company: string;
  abbreviation: string;
  description: string;
  address: string;
  position: "left" | "right";
}

const milestones: Milestone[] = [
  {
    year: 2008,
    company: "Gyan Technology (GT)",
    abbreviation: "GT",
    description: "Inception of our journey in Chemical Technology",
    address:
      "Plot No 13, J Nanji Industrial Park, Chhiri, Vapi - 396191, Gujarat, INDIA",
    position: "left",
  },
  {
    year: 2013,
    company: "Gyan Health Care (GHC)",
    abbreviation: "GHC",
    description: "Expansion with state-of-the-art bulk production facility",
    address:
      "Survey No 146 D, Off NH 8 D, Chowki (Sorath), Junagadh - 362315, Gujarat, INDIA",
    position: "right",
  },
  {
    year: 2017,
    company: "Reliable Life Science (RLS)",
    abbreviation: "RLS",
    description: "Further consolidation of manufacturing capabilities",
    address:
      "Plot No 05/12, Road No 7, Opp. Fire Station, Sarigam - 396155, Gujarat, INDIA",
    position: "left",
  },
];

const AchievementsAndMilestones = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const futureRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header animation
      if (headerRef.current) {
        const title = headerRef.current.querySelector(".header-title");
        const subtitle = headerRef.current.querySelector(".header-subtitle");

        gsap.from(title, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        gsap.from(subtitle, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
        });
      }

      // Intro section animation
      if (introRef.current) {
        const paragraphs = introRef.current.querySelectorAll("p");
        const quote = introRef.current.querySelector(".intro-quote");

        gsap.from(paragraphs, {
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        });

        gsap.from(quote, {
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 75%",
          },
          scale: 0.95,
          opacity: 0,
          duration: 1,
          delay: 0.4,
          ease: "back.out(1.2)",
        });
      }

      // Timeline animations
      if (timelineRef.current) {
        const timelineLine =
          timelineRef.current.querySelector(".timeline-line");

        gsap.from(timelineLine, {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
          },
          scaleY: 0,
          transformOrigin: "top",
          duration: 1.5,
          ease: "power2.out",
        });

        milestones.forEach((_, index) => {
          const item = timelineRef.current?.querySelector(
            `.timeline-item-${index}`
          );
          if (item) {
            gsap.from(item, {
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
              },
              x: milestones[index].position === "left" ? -100 : 100,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
            });
          }
        });
      }

      // Future section animation
      if (futureRef.current) {
        const icon = futureRef.current.querySelector(".future-icon");
        const title = futureRef.current.querySelector(".future-title");
        const text = futureRef.current.querySelector(".future-text");

        gsap.from(icon, {
          scrollTrigger: {
            trigger: futureRef.current,
            start: "top 80%",
          },
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        });

        gsap.from(title, {
          scrollTrigger: {
            trigger: futureRef.current,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
        });

        gsap.from(text, {
          scrollTrigger: {
            trigger: futureRef.current,
            start: "top 80%",
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-ivory py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-6 h-6 md:w-10 md:h-10 text-teal-green" />
            <h2 className="header-title text-teal-green text-2xl md:text-4xl lg:text-5xl font-bold">
              Achievements & Milestones
            </h2>
          </div>
          <p className="header-subtitle text-pewter text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            Our journey of growth and excellence in Chemical Technology
          </p>
        </div>

        {/* Introduction */}
        <div
          ref={introRef}
          className="max-w-4xl mx-auto mb-16 md:mb-20 bg-white rounded-2xl p-8 md:p-10 shadow-lg"
        >
          <p className="text-pewter text-base md:text-lg leading-relaxed mb-4">
            <span className="font-semibold text-ebony">Gyan</span> started its
            journey to become a{" "}
            <span className="font-semibold text-ebony">little giant</span> in
            the field of Chemical Technology by inception of{" "}
            <span className="font-semibold text-ebony">Gyan Technology</span> in{" "}
            <span className="font-semibold text-ebony">2008</span> in a Chemical
            industrial township of{" "}
            <span className="font-semibold text-ebony">
              Vapi, Gujarat, India
            </span>
            . Expanding its scale of production, in{" "}
            <span className="font-semibold text-ebony">2013</span> Gyan came up
            with{" "}
            <span className="font-semibold text-ebony">Gyan Healthcare</span>{" "}
            state-of-the-art bulk production facility at{" "}
            <span className="font-semibold text-ebony">
              Junagadh, Gujarat, India
            </span>{" "}
            and further consolidated its manufacturing facility by adding up
            another production facility at{" "}
            <span className="font-semibold text-ebony">
              Sarigam, Gujarat, India
            </span>{" "}
            namely{" "}
            <span className="font-semibold text-ebony">
              Reliable life Science
            </span>{" "}
            in <span className="font-semibold text-ebony">2017</span>.
          </p>

          <div className="intro-quote mt-8 border-l-4 border-teal-green pl-6 py-4 bg-teal-green/5 rounded-r-xl">
            <div className="flex items-start gap-3">
              <svg
                className="w-8 h-8 text-teal-green shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-ebony text-lg md:text-xl italic leading-relaxed">
                Gyan group is constantly looking for growth and achieve new
                milestones by forward and backward integration.
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}

        <div ref={timelineRef} className="relative">
          {/* Vertical Line — only on large screens */}
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-teal-green h-full hidden lg:block" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`timeline-item-${index} relative flex justify-center lg:justify-start`}
              >
                {/* Center dot — only on large screens */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -translate-y-4 z-10">
                  <div className="w-6 h-6 rounded-full bg-teal-green border-4 border-ivory shadow-lg" />
                </div>

                {/* Milestone Card */}
                <div
                  className={`
            w-full max-w-4xl
            bg-white rounded-2xl p-6 md:p-8
            shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1
            lg:w-[45%] lg:max-w-none
            ${
              milestone.position === "right"
                ? "lg:ml-auto lg:pl-12"
                : "lg:mr-auto lg:pr-12"
            }
          `}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-6 h-6 text-teal-green" />
                    <h3 className="text-teal-green text-2xl md:text-3xl font-bold">
                      {milestone.year}
                    </h3>
                  </div>
                  <div className="flex items-start gap-3 mb-3">
                    <Building2 className="w-5 h-5 text-ebony shrink-0 mt-1" />
                    <h4 className="text-ebony text-xl md:text-2xl font-semibold">
                      {milestone.company}
                    </h4>
                  </div>
                  <p className="text-pewter text-base md:text-lg mb-4">
                    {milestone.description}
                  </p>
                  <div className="flex items-start gap-2 p-2 text-ebony text-sm md:text-base bg-turquoise-blue/10 border-l-4 border-teal-green rounded-xl">
                    <MapPin className="w-4 h-4 shrink-0 mt-1 text-teal-green" />
                    <p>{milestone.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Looking to the Future */}
        <div
          ref={futureRef}
          className="mt-20 md:mt-28 text-center max-w-3xl mx-auto"
        >
          <div className="future-icon inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-teal-green/10 mb-6">
            <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-teal-green" />
          </div>
          <h3 className="future-title text-ebony text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Looking to the Future
          </h3>
          <p className="future-text text-pewter text-base md:text-lg leading-relaxed">
            We continue to innovate and expand, setting new benchmarks in the
            chemical and pharmaceutical industry.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AchievementsAndMilestones;
