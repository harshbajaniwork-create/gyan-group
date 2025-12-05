"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { HeroSliderData } from "@/constants";
import { useGSAP } from "@gsap/react";
import CountUp from "react-countup";
import { Package, Users, Building2, Globe } from "lucide-react";

const stats = [
  {
    icon: Package,
    value: 120,
    suffix: "+",
    label: "Products",
  },
  {
    icon: Users,
    value: 15,
    suffix: "+",
    label: "Employees",
  },
  {
    icon: Building2,
    value: 50,
    suffix: "+",
    label: "Clients",
  },
  {
    icon: Globe,
    value: 10,
    suffix: "+",
    label: "Countries We Export",
  },
];

export const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Animation function
  const animateSlide = useCallback((prevIndex: number, nextIndex: number) => {
    const tl = gsap.timeline();
    timelineRef.current = tl;

    const prevSlide = slideRefs.current[prevIndex];
    const nextSlide = slideRefs.current[nextIndex];
    const nextContent = contentRefs.current[nextIndex];

    if (!prevSlide || !nextSlide) return;

    // Reset next slide z-index to be on top
    gsap.set(nextSlide, { zIndex: 2 });
    gsap.set(prevSlide, { zIndex: 1 });

    // Fade in next slide
    tl.fromTo(
      nextSlide,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.inOut" }
    ).to(
      prevSlide,
      { opacity: 0, duration: 1.5, ease: "power2.inOut", zIndex: 0 },
      "<"
    );

    // Animate content
    if (nextContent) {
      const elements = nextContent.children;
      tl.fromTo(
        elements,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
        "-=1"
      );
    }
  }, []);

  // Next slide function
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % HeroSliderData.length;
      animateSlide(prevIndex, nextIndex);
      return nextIndex;
    });
  }, [animateSlide]);

  // Initial GSAP setup
  useGSAP(() => {
    gsap.set(slideRefs.current, { opacity: 0, zIndex: 0 });
    gsap.set(slideRefs.current[0], { opacity: 1, zIndex: 1 });
  }, []);

  // Auto-play interval
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="w-full bg-ebony">
      {/* Hero Slider - 70-75vh */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {HeroSliderData.map((slide, index) => (
          <div
            key={index}
            ref={(el) => {
              slideRefs.current[index] = el;
            }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt="Hero Slide"
                fill
                className="object-cover"
                priority={index === 0}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-ebony/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div
                ref={(el) => {
                  contentRefs.current[index] = el;
                }}
                className="max-w-3xl"
              >
                <div
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                  className="mb-6 text-ivory text-4xl md:text-5xl lg:text-6xl/17 font-bold"
                />
                <p className="text-base md:text-lg lg:text-xl text-ivory mb-8 md:w-3/4 leading-relaxed">
                  {slide.description}
                </p>
                <Link
                  href="/about/company-profile"
                  className="inline-block px-8 py-3 bg-teal-green text-white font-semibold rounded hover:bg-turquoise-blue transition-colors duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section - 20-25vh */}
      <div className="bg-ebony py-12 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center text-center group"
                >
                  {/* Number */}
                  <div className="p-4 mb-4 rounded-full bg-teal-green/10 group-hover:bg-teal-green/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 md:w-14 md:h-14 text-teal-green group-hover:text-turquoise-blue transition-colors duration-300" />
                  </div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-ivory mb-2 flex flex-col items-center justify-center gap-4">
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    {/* Label */}
                    <p className="text-pewter text-sm md:text-base lg:text-lg font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
