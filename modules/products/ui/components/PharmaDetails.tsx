"use client";

import { ProductDetailsSection } from "./ProductDetailsSection";
import { Product } from "./ProductCategorySection";

interface PharmaDetailsProps {
  product: Product;
}

export const PharmaDetails = ({ product }: PharmaDetailsProps) => {
  return (
    <ProductDetailsSection
      product={product}
      backLink="/products/pharma-and-api-intermediates"
    />
  );
};
