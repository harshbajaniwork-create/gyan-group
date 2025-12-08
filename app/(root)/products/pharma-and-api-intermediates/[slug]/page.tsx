import { PharmaIntermediateDetailsView } from "@/modules/products/ui/views/pharma-intermediate-details-view";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  return <PharmaIntermediateDetailsView slug={slug} />;
};

export default Page;
