import PageBanner from "@/components/PageBanner";
import CountriesWeExport from "../components/WeExport";

const WeExportView = () => {
  return (
    <section>
      <PageBanner
        title="Global Presence"
        description="Discover our journey of innovation, commitment to quality, and dedication to sustainable chemical solutions that shape the future of industry."
        backgroundImage="/banner/banner-6.avif"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Global Presence" },
        ]}
      />
      <CountriesWeExport />
    </section>
  );
};

export default WeExportView;
