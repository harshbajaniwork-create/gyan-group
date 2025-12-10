import { Metadata } from "next";
import CompanyProfileView from "@/modules/about/ui/views/company-profile-view";

export const metadata: Metadata = {
  title: "Company Profile",
  description: "Learn about Gyan Group's journey and vision.",
};

const Page = () => {
  return <CompanyProfileView />;
};

export default Page;
