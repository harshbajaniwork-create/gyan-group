import { EditCategoryForm } from "../forms/edit-category-form";
import { getCategoryById } from "../../server/actions";
import { notFound } from "next/navigation";

export const EditCategoryView = async ({ id }: { id: string }) => {
  const result = await getCategoryById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  // Ensure data matches what the form expects.
  // The form expects { id, name, slug, category }
  // DB returns { id, name, slug, category, createdAt, updatedAt }
  // We can pass the whole object.
  return <EditCategoryForm initialData={result.data} />;
};
