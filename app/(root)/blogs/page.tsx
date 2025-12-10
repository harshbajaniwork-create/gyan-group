import { Metadata } from "next";
import BlogsView from "@/modules/blogs/ui/views/blogs-view";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Read latest updates, insights and news from Gyan Group.",
};

const Page = () => {
  return <BlogsView />;
};

export default Page;
