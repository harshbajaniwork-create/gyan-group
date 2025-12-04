"use client";

import { ProductDetailsSection } from "./ProductDetailsSection";
import { pigmentProducts } from "./PigmentIntermediates";

interface PigmentIntermediatesDetailsProps {
  slug?: string;
}

export const PigmentIntermediatesDetails = ({
  slug,
}: PigmentIntermediatesDetailsProps) => {
  // For now, using the first product as example
  // In production, you'd fetch based on slug
  const product =
    pigmentProducts.find((p) => p.slug === slug) || pigmentProducts[0];

  return (
    <ProductDetailsSection
      product={product}
      backLink="/products/pigment-intermediates"
    />
  );
};
