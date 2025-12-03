"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  description: string;
  backgroundImage: string;
  breadcrumbs?: BreadcrumbItem[];
}

const PageBanner = ({
  title,
  description,
  backgroundImage,
  breadcrumbs = [{ label: "Home", href: "/" }],
}: PageBannerProps) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Breadcrumb animation
      if (breadcrumbRef.current) {
        tl.from(breadcrumbRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.8,
        });
      }

      // Title animation
      if (titleRef.current) {
        tl.from(
          titleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          "-=0.4"
        );
      }

      // Description animation
      if (descriptionRef.current) {
        tl.from(
          descriptionRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        );
      }
    },
    { scope: bannerRef }
  );

  return (
    <div
      ref={bannerRef}
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-teal-green/80 via-teal-green/70 to-turquoise-blue/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        {/* Breadcrumbs */}
        <nav ref={breadcrumbRef} className="flex items-center space-x-2 mb-6">
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center">
              {index === 0 && <Home className="w-4 h-4 text-ivory mr-2" />}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-ivory hover:text-turquoise-blue transition-colors duration-300 text-sm md:text-base font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-ivory/80 text-sm md:text-base font-medium">
                  {item.label}
                </span>
              )}
              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="w-4 h-4 text-ivory mx-2" />
              )}
            </div>
          ))}
        </nav>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-ivory text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
        >
          {title}
        </h1>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="text-ivory text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed"
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default PageBanner;
