import ContentWithImage from "@/components/ContentWithImage";
import PageBanner from "@/components/PageBanner";
import React from "react";
import HistoryWhyChoose from "../components/HistoryWhyChoose";

const CompanyProfileView = () => {
  return (
    <section>
      <PageBanner
        title="About Us"
        description="Discover our journey of innovation, commitment to quality, and dedication to sustainable chemical solutions that shape the future of industry."
        backgroundImage="/banner/banner-8.avif"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />
      <ContentWithImage
        subtitle="ABOUT GYAN GROUP"
        title="About Gyan Group"
        titleColor="teal"
        content={[
          {
            text: "Gaining knowledge is the first step to wisdom. Sharing it is the first step to humanity.",
          },
          {
            text: "Gyan (knowledge) is considered as all-powerful, something to be strived for-not only for the well-being of humanity but also for the enlightenment of the soul. Dedicated to Green Chemistry, we specialize in R&D, bulk production, and high-quality specialty chemicals for various industries, including:",
            highlight: [
              "Gyan (knowledge)",
              "well-being of humanity",
              "enlightenment of the soul",
              "Green Chemistry",
              "R&D",
              "bulk production",
              "high-quality specialty chemicals",
            ],
          },
        ]}
        listItems={[
          "Bulk Drugs",
          "Agro-chemicals",
          "Dyes & Pigments",
          "Polymers & Perfumery Chemicals",
        ]}
        image="/aboutimg1.jpg"
        imageAlt="Chemical molecules structure"
        imagePosition="right"
        backgroundColor="ivory"
      />
      <HistoryWhyChoose />
    </section>
  );
};

export default CompanyProfileView;
