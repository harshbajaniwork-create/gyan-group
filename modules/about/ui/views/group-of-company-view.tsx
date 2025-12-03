import PageBanner from "@/components/PageBanner";
import GroupCompanies from "../components/GroupOfCompany";

const GroupOfCompanyView = () => {
  return (
    <section>
      <PageBanner
        title="Group of Companies"
        description="Discover our journey of innovation, commitment to quality, and dedication to sustainable chemical solutions that shape the future of industry."
        backgroundImage="/banner/banner-1.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Group of Companies" },
        ]}
      />
      <GroupCompanies />
    </section>
  );
};

export default GroupOfCompanyView;
