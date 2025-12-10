import { Metadata } from "next";
import QualityPolicyView from "@/modules/about/ui/views/quality-policy-view";

export const metadata: Metadata = {
  title: "Quality Policy",
  description: "Our commitment to quality.",
};

const Page = () => {
  return <QualityPolicyView />;
};

export default Page;
