import PageBanner from "@/components/PageBanner";
import Contact from "../components/Contact";

const ContactView = () => {
  return (
    <section>
      <PageBanner
        title="Get In Touch"
        description="Discover our journey of innovation, commitment to quality, and dedication to sustainable chemical solutions that shape the future of industry."
        backgroundImage="/banner/banner-4.jpg"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get In Touch" }]}
      />
      <Contact />
    </section>
  );
};

export default ContactView;
