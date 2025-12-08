"use client";

import { ProductCategorySection, Product } from "./ProductCategorySection";

interface Props {
  products: Product[];
}

export const PigmentIntermediates = ({ products }: Props) => {
  return (
    <ProductCategorySection
      categoryTitle="Pigment Intermediate"
      categorySlug="pigment-intermediates"
      products={products}
      showHeader={true}
    />
  );
};
