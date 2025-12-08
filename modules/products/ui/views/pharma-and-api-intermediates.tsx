import PageBanner from "@/components/PageBanner";
import { PharmaAndApiIntermediates } from "../components/PharmaAndApiIntermediates";
import { getProductsByCategorySlug } from "@/modules/admin/products/server/actions";

export const PharmaAndApiIntermediatesView = async () => {
  const { data: products } = await getProductsByCategorySlug(
    "pharma-and-api-intermediates"
  );

  const mappedProducts =
    products?.map((product) => ({
      ...product,
      category: product.categoryName,
    })) || [];

  return (
    <section>
      <PageBanner
        title="Pharma & API Intermediates"
        description="Discover our journey of innovation, commitment to quality, and dedication to sustainable chemical solutions that shape the future of industry."
        backgroundImage="/banner/banner-2.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Pharma & API Intermediates" },
        ]}
      />
      <PharmaAndApiIntermediates products={mappedProducts} />
    </section>
  );
};
