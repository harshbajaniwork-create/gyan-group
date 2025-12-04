import { BlogPage } from "../components/BlogPage";
import PageBanner from "@/components/PageBanner";

const BlogView = () => {
  return (
    <section>
      <PageBanner
        title="Latest News & Updates"
        description="Discover our journey of innovation, commitment to quality, and dedication to sustainable chemical solutions that shape the future of industry."
        backgroundImage="/banner/banner-5.avif"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blogs" }]}
      />
      <BlogPage />
    </section>
  );
};

export default BlogView;
