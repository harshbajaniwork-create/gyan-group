import { Metadata } from "next";
import { DyeIntermediatesView } from "@/modules/products/ui/views/dye-intermediates";

export const metadata: Metadata = {
  title: "Dye Intermediates",
  description: "Reliable dye intermediates.",
};

const Page = () => {
  return <DyeIntermediatesView />;
};

export default Page;
