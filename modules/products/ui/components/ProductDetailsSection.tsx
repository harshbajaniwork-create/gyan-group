"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  Package,
  Tag,
  Beaker,
  Scale,
  Atom,
  CheckCircle,
  Sparkles,
  FileText,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

export interface ProductDetail {
  id: number;
  name: string;
  casNumber: string;
  image: string;
  slug: string;
  productNumber: string;
  category: string;
  molecularWeight: string;
  molecularFormula: string;
  productStatus: string;
  application: string;
  specifications: string;
}

interface ProductDetailsSectionProps {
  product: ProductDetail;
  backLink: string;
}

export const ProductDetailsSection = ({
  product,
  backLink,
}: ProductDetailsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const backButtonRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Only animate the back button and header — skip all detail cards
  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Back button animation
      if (backButtonRef.current) {
        tl.from(backButtonRef.current, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      // Only animate the main header (not the cards or buttons)
      if (contentRef.current) {
        const header = contentRef.current.querySelector(".product-header");
        const imageCard = contentRef.current.querySelector(".image-card");

        if (header) {
          tl.from(
            header,
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.3"
          );
        }

        if (imageCard) {
          tl.from(
            imageCard,
            {
              scale: 0.95,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.5"
          );
        }
      }
    },
    { scope: sectionRef, dependencies: [product] }
  );

  const detailsData = [
    {
      icon: Package,
      label: "Product No",
      value: product.productNumber,
    },
    {
      icon: Tag,
      label: "Category",
      value: product.category,
    },
    {
      icon: Beaker,
      label: "CAS No",
      value: product.casNumber,
    },
    {
      icon: Scale,
      label: "Molecular Weight",
      value: product.molecularWeight,
    },
    {
      icon: Atom,
      label: "Molecular Formula",
      value: product.molecularFormula,
      mono: true,
    },
    {
      icon: CheckCircle,
      label: "Product Status",
      value: product.productStatus,
    },
    {
      icon: Sparkles,
      label: "Application",
      value: product.application,
    },
    {
      icon: FileText,
      label: "Specification",
      value: product.specifications,
    },
  ];

  return (
    <section ref={sectionRef} className="bg-ivory py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div ref={backButtonRef} className="mb-6">
          <Link
            href={backLink}
            className="inline-flex items-center gap-2 text-teal-green hover:text-teal-green/80 transition-colors duration-300 font-semibold group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Products
          </Link>
        </div>

        <div ref={contentRef}>
          {/* Product Header */}
          <div className="product-header mb-8">
            <p className="text-pewter text-sm md:text-base mb-2 font-medium">
              CAS: {product.casNumber}
            </p>
            <h1 className="text-teal-green text-3xl md:text-4xl lg:text-5xl font-bold">
              {product.name}
            </h1>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-5 gap-8 mb-8">
            {/* Product Image - Takes 2 columns */}
            <div className="lg:col-span-2">
              <Card className="image-card overflow-hidden border-2 border-teal-green/20 shadow-xl sticky top-8">
                <CardContent className="p-0">
                  <div className="relative bg-linear-to-br from-ivory to-white p-8 md:p-10 flex items-center justify-center min-h-[350px] lg:min-h-[450px]">
                    <div className="absolute inset-0 bg-teal-green/5" />
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={350}
                      height={350}
                      className="object-contain relative z-10"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Details Grid - Takes 3 columns (NO ANIMATION CLASSES NEEDED) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Details Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {detailsData.map((detail, index) => {
                  const Icon = detail.icon;
                  return (
                    <Card
                      key={index}
                      className="border-l-4 border-l-teal-green shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-teal-green/10 flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-teal-green" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs uppercase tracking-wide text-pewter font-semibold mb-1">
                              {detail.label}
                            </p>
                            <p
                              className={`text-ebony font-bold text-base leading-tight ${
                                detail.mono ? "font-mono" : ""
                              }`}
                            >
                              {detail.value}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Inquiry Button */}
              <div>
                <Button
                  size="lg"
                  className="w-full bg-teal-green hover:bg-teal-green/90 text-white font-semibold text-base py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  asChild
                >
                  <Link href="/contact">
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    Inquiry Now
                  </Link>
                </Button>
              </div>

              {/* Safety Information */}
              <Card className="border-2 border-amber-400/50 bg-amber-50/50 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center shrink-0">
                      <svg
                        className="w-5 h-5 text-amber-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-amber-900 font-bold text-base mb-1">
                        Safety Information
                      </h3>
                      <p className="text-amber-800 text-sm leading-relaxed">
                        Please refer to the Material Safety Data Sheet (MSDS)
                        for detailed handling instructions and safety
                        precautions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
