"use client";

import { ProductDetailsSection } from "./ProductDetailsSection";
import { dyeProducts } from "./DyeIntermediates";

interface DyeIntermediatesDetailsProps {
  slug?: string;
}

export const DyeIntermediatesDetails = ({
  slug,
}: DyeIntermediatesDetailsProps) => {
  // For now, using the first product as example
  // In production, you'd fetch based on slug
  const product = dyeProducts.find((p) => p.slug === slug) || dyeProducts[0];

  return (
    <ProductDetailsSection
      product={product}
      backLink="/products/dye-intermediates"
    />
  );
};
