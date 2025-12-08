import PageBanner from "@/components/PageBanner";
import { DyeIntermediatesDetails } from "../components/DyeIntermediatesDetails";
import { getProductBySlug } from "@/modules/admin/products/server/actions";
import { notFound } from "next/navigation";

interface Props {
  slug: string;
}

export const DyeIntermediatesDetailsView = async ({ slug }: Props) => {
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
        title="Dye Intermediates"
        description="Discover our journey of innovation, commitment to quality, and dedication to sustainable chemical solutions that shape the future of industry."
        backgroundImage="/banner/banner-2.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          {
            label: "Dye Intermediates",
            href: "/products/dye-intermediates",
          },
          { label: product.title },
        ]}
      />
      <DyeIntermediatesDetails product={mappedProduct} />
    </section>
  );
};
