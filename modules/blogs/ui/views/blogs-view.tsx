import PageBanner from "@/components/PageBanner";
import { BlogsPage } from "../components/BlogsPage";

const BlogsView = () => {
  return (
    <section>
      <PageBanner
        title="Latest News & Updates"
        description="Discover our journey of innovation, commitment to quality, and dedication to sustainable chemical solutions that shape the future of industry."
        backgroundImage="/banner/banner-5.avif"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blogs" }]}
      />
      <BlogsPage />
    </section>
  );
};

export default BlogsView;
