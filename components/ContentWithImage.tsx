"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ContentItem {
  text: string;
  highlight?: string[];
}

interface ContentWithImageProps {
  title: string;
  subtitle?: string;
  titleColor?: "teal" | "ebony";
  content: ContentItem[];
  listItems?: string[];
  image: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  backgroundColor?: "ivory" | "white";
}

const ContentWithImage = ({
  title,
  subtitle,
  titleColor = "teal",
  content,
  listItems,
  image,
  imageAlt,
  imagePosition = "right",
  backgroundColor = "ivory",
}: ContentWithImageProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const highlightText = (text: string, highlights?: string[]) => {
    if (!highlights || highlights.length === 0) return text;

    let result = text;
    highlights.forEach((highlight) => {
      const regex = new RegExp(`(${highlight})`, "gi");
      result = result.replace(
        regex,
        '<span class="font-bold text-ebony">$1</span>'
      );
    });
    return result;
  };

  useGSAP(
    () => {
      if (!contentRef.current || !imageRef.current) return;

      const subtitle = contentRef.current.querySelector(".content-subtitle");
      const title = contentRef.current.querySelector(".content-title");
      const paragraphs =
        contentRef.current.querySelectorAll(".content-paragraph");
      const list = contentRef.current.querySelector(".content-list");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        defaults: { ease: "power3.out" },
      });

      // Image animation
      tl.from(imageRef.current, {
        x: imagePosition === "right" ? 100 : -100,
        opacity: 0,
        duration: 1.2,
      });

      // Content animations
      if (subtitle) {
        tl.from(
          subtitle,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.8"
        );
      }

      if (title) {
        tl.from(
          title,
          {
            y: 40,
            opacity: 0,
            duration: 1,
          },
          "-=0.6"
        );
      }

      if (paragraphs.length > 0) {
        tl.from(
          paragraphs,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
          },
          "-=0.5"
        );
      }

      if (list) {
        const listItems = list.querySelectorAll("li");
        tl.from(
          listItems,
          {
            x: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.4"
        );
      }
    },
    { scope: sectionRef }
  );

  const bgColor = backgroundColor === "ivory" ? "bg-ivory" : "bg-white";
  const titleColorClass =
    titleColor === "teal" ? "text-teal-green" : "text-ebony";

  return (
    <section ref={sectionRef} className={`${bgColor} py-16 md:py-24 lg:py-32`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            imagePosition === "left" ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Content */}
          <div
            ref={contentRef}
            className={imagePosition === "left" ? "lg:order-2" : ""}
          >
            {subtitle && (
              <h3 className="content-subtitle text-teal-green text-sm md:text-base font-semibold tracking-wider uppercase mb-4">
                {subtitle}
              </h3>
            )}

            <h2
              className={`content-title ${titleColorClass} text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight`}
            >
              {title}
            </h2>

            <div className="space-y-4 text-pewter text-base md:text-lg leading-relaxed">
              {content.map((item, index) => (
                <p
                  key={index}
                  className="content-paragraph"
                  dangerouslySetInnerHTML={{
                    __html: highlightText(item.text, item.highlight),
                  }}
                />
              ))}
            </div>

            {listItems && listItems.length > 0 && (
              <ul className="content-list mt-6 space-y-3">
                {listItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start text-pewter text-base md:text-lg group"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-green mt-2 mr-3 group-hover:bg-turquoise-blue transition-colors duration-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className={`relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl group ${
              imagePosition === "left" ? "lg:order-1" : ""
            }`}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ebony/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentWithImage;
