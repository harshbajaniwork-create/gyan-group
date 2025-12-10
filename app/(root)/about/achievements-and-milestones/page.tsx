import { Metadata } from "next";
import AchievementsAndMilestonesView from "@/modules/about/ui/views/achievements-and-milestones";

export const metadata: Metadata = {
  title: "Achievements and Milestones",
  description: "Our key achievements and milestones.",
};

const Page = () => {
  return <AchievementsAndMilestonesView />;
};

export default Page;
