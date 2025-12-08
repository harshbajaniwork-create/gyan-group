import { PigmentIntermediatesDetailsView } from "@/modules/products/ui/views/pigment-intermediates-details-view";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  return <PigmentIntermediatesDetailsView slug={slug} />;
};

export default Page;
