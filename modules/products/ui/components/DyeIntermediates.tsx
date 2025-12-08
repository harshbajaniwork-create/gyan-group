"use client";

import { ProductCategorySection, Product } from "./ProductCategorySection";

interface Props {
  products: Product[];
}

export const DyeIntermediates = ({ products }: Props) => {
  return (
    <ProductCategorySection
      categoryTitle="Dye Intermediate"
      categorySlug="dye-intermediates"
      products={products}
      showHeader={true}
    />
  );
};
