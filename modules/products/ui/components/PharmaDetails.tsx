"use client";

import { ProductDetailsSection } from "./ProductDetailsSection";
import { pharmaProducts } from "./PharmaAndApiIntermediates";

interface PharmaDetailsProps {
  slug?: string;
}

export const PharmaDetails = ({ slug }: PharmaDetailsProps) => {
  // For now, using the first product as example
  // In production, you'd fetch based on slug
  const product =
    pharmaProducts.find((p) => p.slug === slug) || pharmaProducts[0];

  return (
    <ProductDetailsSection
      product={product}
      backLink="/products/pharma-and-api-intermediates"
    />
  );
};
