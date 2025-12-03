"use client";

import { useRef } from "react";
import Image from "next/image";
import { Building2, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export interface Company {
  id: number;
  name: string;
  badge: string;
  description: string;
  address: string;
  image: string;
  imagePosition: "left" | "right";
}

export const companies: Company[] = [
  {
    id: 1,
    name: "Gyan Health Care",
    badge: "GHC",
    description:
      "Leading healthcare solutions provider specializing in pharmaceutical research and development.",
    address:
      "Survey No 146 D, Off NH 8D, Chowki (Sorath), Junagadh - 362315, Gujarat, INDIA",
    image: "/aboutimg1.jpg",
    imagePosition: "left",
  },
  {
    id: 2,
    name: "Gyan Technology",
    badge: "GT",
    description:
      "Innovative technology solutions for the pharmaceutical and chemical industries.",
    address: "Plot No 13, J Nanji Industrial Park, Chhiri, Vapi 396191, INDIA",
    image: "/aboutimg2.jpg",
    imagePosition: "right",
  },
  {
    id: 3,
    name: "Reliable Life Science",
    badge: "RLS",
    description:
      "Specialized in life science research and development of cutting-edge pharmaceutical products.",
    address:
      "Plot No 05/12, Road No 7, Opp. Fire Station, Sarigam, 396155, Gujarat, INDIA",
    image: "/aboutimg1.jpg",
    imagePosition: "left",
  },
  {
    id: 4,
    name: "Venus Lab",
    badge: "VNL",
    description:
      "State-of-the-art laboratory facilities for pharmaceutical testing and research.",
    address:
      "206, Nikisha Ind Estate Pandurang Wadi, Mira Road Mumbai 400107, INDIA",
    image: "/aboutimg3.jpg",
    imagePosition: "right",
  },
];

const GroupCompanies = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Title animation
      if (titleRef.current) {
        const title = titleRef.current.querySelector(".section-title");
        const subtitle = titleRef.current.querySelector(".section-subtitle");

        gsap.from(title, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        gsap.from(subtitle, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
        });
      }

      // Company cards animation
      companies.forEach((_, index) => {
        const card = sectionRef.current?.querySelector(
          `.company-card-${index}`
        );
        if (card) {
          const image = card.querySelector(".company-image");
          const content = card.querySelector(".company-content");
          const contentItems = content?.querySelectorAll(".content-item");

          gsap.from(image, {
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
            x: companies[index].imagePosition === "left" ? -100 : 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          });

          if (contentItems) {
            gsap.from(contentItems, {
              scrollTrigger: {
                trigger: card,
                start: "top 75%",
              },
              y: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.15,
              delay: 0.3,
              ease: "power3.out",
            });
          }
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="bg-ivory py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <h2 className="section-title text-teal-green text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our Group of Companies
          </h2>
          <p className="section-subtitle text-pewter text-base md:text-lg lg:text-xl max-w-3xl mx-auto">
            A synergy of innovation, expertise, and excellence across
            healthcare, technology, and life sciences
          </p>
        </div>

        {/* Companies */}
        <div className="space-y-16 md:space-y-24">
          {companies.map((company, index) => (
            <div
              key={company.id}
              className={`company-card-${index} grid lg:grid-cols-2 gap-8 lg:gap-12 items-center`}
            >
              {/* Image */}
              <div
                className={`company-image relative h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl group ${
                  company.imagePosition === "right" ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={company.image}
                  alt={company.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ebony/60 to-transparent" />

                {/* Badge */}
                <div className="absolute bottom-6 left-6">
                  <div className="bg-teal-green text-white text-sm md:text-base font-bold px-6 py-2 rounded-full shadow-lg">
                    {company.badge}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div
                className={`company-content ${
                  company.imagePosition === "right" ? "lg:order-1" : ""
                }`}
              >
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-shadow duration-500">
                  {/* Icon & Title */}
                  <div className="content-item flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-teal-green/10 flex items-center justify-center shrink-0 mt-1">
                      <Building2 className="w-6 h-6 text-teal-green" />
                    </div>
                    <div>
                      <h3 className="text-ebony text-2xl md:text-3xl font-bold">
                        {company.name}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="content-item text-pewter text-base md:text-lg leading-relaxed mb-6">
                    {company.description}
                  </p>

                  {/* Address */}
                  <div className="content-item flex items-start gap-3 p-4 bg-teal-green/5 rounded-xl border-l-4 border-teal-green">
                    <MapPin className="w-5 h-5 text-teal-green shrink-0 mt-1" />
                    <p className="text-pewter text-sm md:text-base leading-relaxed">
                      {company.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GroupCompanies;
