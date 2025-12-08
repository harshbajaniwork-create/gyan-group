import { DyeIntermediatesDetailsView } from "@/modules/products/ui/views/dye-intermediates-details";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  return <DyeIntermediatesDetailsView slug={slug} />;
};

export default Page;
