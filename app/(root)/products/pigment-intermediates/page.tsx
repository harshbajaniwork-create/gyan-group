import { Metadata } from "next";
import { PigmentIntermediatesView } from "@/modules/products/ui/views/pigment-intermediates-view";

export const metadata: Metadata = {
  title: "Pigment Intermediates",
  description: "Premium pigment intermediates.",
};

const Page = () => {
  return <PigmentIntermediatesView />;
};

export default Page;
