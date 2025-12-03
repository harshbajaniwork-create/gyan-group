import PageBanner from "@/components/PageBanner";
import QualityPolicy from "../components/QualityPolicy";

const QualityPolicyView = () => {
  return (
    <section>
      <PageBanner
        title="Quality Policy"
        description="Discover our journey of innovation, commitment to quality, and dedication to sustainable chemical solutions that shape the future of industry."
        backgroundImage="/banner/banner-7.avif"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Quality Policy" },
        ]}
      />
      <QualityPolicy />
    </section>
  );
};

export default QualityPolicyView;
