"use client";

import { ProductDetailsSection } from "./ProductDetailsSection";
import { Product } from "./ProductCategorySection";

interface DyeIntermediatesDetailsProps {
  product: Product;
}

export const DyeIntermediatesDetails = ({
  product,
}: DyeIntermediatesDetailsProps) => {
  return (
    <ProductDetailsSection
      product={product}
      backLink="/products/dye-intermediates"
    />
  );
};
