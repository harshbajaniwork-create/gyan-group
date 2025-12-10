import { Metadata } from "next";
import GroupOfCompanyView from "@/modules/about/ui/views/group-of-company-view";

export const metadata: Metadata = {
  title: "Group of Company",
  description: "Explore the companies under Gyan Group.",
};

const Page = () => {
  return <GroupOfCompanyView />;
};

export default Page;
