"use client";

import { ProductCategorySection, Product } from "./ProductCategorySection";

interface Props {
  products: Product[];
}

export const PharmaAndApiIntermediates = ({ products }: Props) => {
  return (
    <ProductCategorySection
      categoryTitle="Pharma & API Intermediate"
      categorySlug="pharma-and-api-intermediates"
      products={products}
      showHeader={true}
    />
  );
};
