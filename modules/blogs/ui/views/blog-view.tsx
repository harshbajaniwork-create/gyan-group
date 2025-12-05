import { BlogPage } from "../components/BlogPage";
import PageBanner from "@/components/PageBanner";

interface BlogViewProps {
  slug: string;
}

const BlogView = ({ slug }: BlogViewProps) => {
  return (
    <section>
      <PageBanner
        title="Latest News & Updates"
        description="Discover our journey of innovation, commitment to quality, and dedication to sustainable chemical solutions that shape the future of industry."
        backgroundImage="/banner/banner-5.avif"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: "Blog Post" },
        ]}
      />
      <BlogPage slug={slug} />
    </section>
  );
};

export default BlogView;
