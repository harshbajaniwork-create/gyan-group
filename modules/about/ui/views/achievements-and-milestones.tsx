import PageBanner from "@/components/PageBanner";
import AchievementsAndMilestones from "../components/AchievementsAndMilestones";

const AchievementsAndMilestonesView = () => {
  return (
    <section>
      <PageBanner
        title="Achievements and Milestones"
        description="Discover our journey of innovation, commitment to quality, and dedication to sustainable chemical solutions that shape the future of industry."
        backgroundImage="/banner/banner-2.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Achievements and Milestones" },
        ]}
      />
      <AchievementsAndMilestones />
    </section>
  );
};

export default AchievementsAndMilestonesView;
