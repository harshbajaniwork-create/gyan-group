"use client";

import { ProductDetailsSection } from "./ProductDetailsSection";
import { Product } from "./ProductCategorySection";

interface PigmentIntermediatesDetailsProps {
  product: Product;
}

export const PigmentIntermediatesDetails = ({
  product,
}: PigmentIntermediatesDetailsProps) => {
  return (
    <ProductDetailsSection
      product={product}
      backLink="/products/pigment-intermediates"
    />
  );
};
