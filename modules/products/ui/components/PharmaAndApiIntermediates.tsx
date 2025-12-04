"use client";

import { ProductCategorySection, Product } from "./ProductCategorySection";

const pharmaProducts: Product[] = [
  {
    id: 1,
    name: "4 Methyl 2 Amino 6 Nitro Phenol",
    casNumber: "6265-07-2",
    image:
      "https://www.gyangroup.in/upload_data/images/Product/62/GHP-1023.png",
    slug: "4-methyl-2-amino-6-nitro-phenol",
    productNumber: "GHP-1023",
    category: "Pharma and API Intermediates",
    molecularWeight: "168.15",
    molecularFormula: "C7H8N2O3",
    productStatus: "Campaign Basis",
    application: "PHARMA",
    specifications: "On Request",
  },
  {
    id: 2,
    name: "2,5 Diethoxy Aniline",
    casNumber: "94-85-9",
    image:
      "https://www.gyangroup.in/upload_data/images/Product/59/GHP-1021.png",
    slug: "2-5-diethoxy-aniline",
    productNumber: "GHP-1021",
    category: "Pharma and API Intermediates",
    molecularWeight: "181.23",
    molecularFormula: "C10H15NO2",
    productStatus: "Campaign Basis",
    application: "PHARMA",
    specifications: "On Request",
  },
  {
    id: 3,
    name: "N N Dimethyl Benzaldehyde",
    casNumber: "100-10-7",
    image:
      "https://www.gyangroup.in/upload_data/images/Product/57/GHP-1004.png",
    slug: "n-n-dimethyl-benzaldehyde",
    productNumber: "GHP-1004",
    category: "Pharma and API Intermediates",
    molecularWeight: "149.19",
    molecularFormula: "C9H11NO",
    productStatus: "Campaign Basis",
    application: "PHARMA",
    specifications: "On Request",
  },
  {
    id: 4,
    name: "1 Amino 7 Naphthol",
    casNumber: "116-46-7",
    image:
      "https://www.gyangroup.in/upload_data/images/Product/56/GHP-1001.png",
    slug: "1-amino-7-naphthol",
    productNumber: "GHP-1001",
    category: "Pharma and API Intermediates",
    molecularWeight: "159.18",
    molecularFormula: "C10H9NO",
    productStatus: "Campaign Basis",
    application: "PHARMA",
    specifications: "On Request",
  },
];

export const PharmaAndApiIntermediates = () => {
  return (
    <ProductCategorySection
      categoryTitle="Pharma & API Intermediate"
      categorySlug="pharma-and-api-intermediates"
      products={pharmaProducts}
      showHeader={true}
    />
  );
};

export { pharmaProducts };
