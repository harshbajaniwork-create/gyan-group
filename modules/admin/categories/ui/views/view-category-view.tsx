import { ViewCategoryForm } from "../forms/view-category-form";
import { getCategoryById } from "../../server/actions";
import { notFound } from "next/navigation";

export const ViewCategoryView = async ({ id }: { id: string }) => {
  const result = await getCategoryById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const serializedData = {
    ...result.data,
    createdAt: result.data.createdAt.toISOString(),
    updatedAt: result.data.updatedAt.toISOString(),
  };

  return <ViewCategoryForm initialData={serializedData} />;
};
