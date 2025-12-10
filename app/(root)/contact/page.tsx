import { Metadata } from "next";
import ContactView from "@/modules/contact-us/ui/views/contact-view";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Gyan Group for inquiries and support.",
};

const Page = () => {
  return <ContactView />;
};

export default Page;
