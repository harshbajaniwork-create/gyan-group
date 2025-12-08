import PageBanner from "@/components/PageBanner";
import { DyeIntermediates } from "../components/DyeIntermediates";
import { getProductsByCategorySlug } from "@/modules/admin/products/server/actions";

export const DyeIntermediatesView = async () => {
  const { data: products } = await getProductsByCategorySlug(
    "dye-intermediates"
  );

  const mappedProducts =
    products?.map((product) => ({
      ...product,
      category: product.categoryName,
    })) || [];

  return (
    <section>
      <PageBanner
        title="Dye Intermediates"
        description="Discover our journey of innovation, commitment to quality, and dedication to sustainable chemical solutions that shape the future of industry."
        backgroundImage="/banner/banner-2.jpg"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Dye Intermediates" },
        ]}
      />
      <DyeIntermediates products={mappedProducts} />
    </section>
  );
};
