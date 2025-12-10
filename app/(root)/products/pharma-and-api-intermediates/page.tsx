import { Metadata } from "next";
import { PharmaAndApiIntermediatesView } from "@/modules/products/ui/views/pharma-and-api-intermediates";

export const metadata: Metadata = {
  title: "Pharma and API Intermediates",
  description: "High quality Pharma and API intermediates.",
};

const Page = () => {
  return <PharmaAndApiIntermediatesView />;
};

export default Page;
