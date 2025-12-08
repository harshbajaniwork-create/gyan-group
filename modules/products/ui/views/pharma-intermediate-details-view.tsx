import PageBanner from "@/components/PageBanner";
import { PharmaDetails } from "../components/PharmaDetails";
import { getProductBySlug } from "@/modules/admin/products/server/actions";
import { notFound } from "next/navigation";

interface Props {
  slug: string;
}

export const PharmaIntermediateDetailsView = async ({ slug }: Props) => {
  const { data: product } = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const mappedProduct = {
    ...product,
    category: product.categoryName || "",
  };

  return (
    <section>
      <PageBanner
        title="Pharma & API Intermediates"
        description="Discover our journey of innovation, commitment to quality, and dedication to sustainable chemical solutions that shape the future of industry."
        backgroundImage="/banner/banner-2.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          {
            label: "Pharma & API Intermediates",
            href: "/products/pharma-and-api-intermediates",
          },
          { label: product.title },
        ]}
      />
      <PharmaDetails product={mappedProduct} />
    </section>
  );
};
