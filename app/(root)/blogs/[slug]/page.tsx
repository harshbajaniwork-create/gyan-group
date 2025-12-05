import BlogView from "@/modules/blogs/ui/views/blog-view";
import React from "react";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <BlogView slug={slug} />;
};

export default Page;
