import { EditInquiryForm } from "../forms/edit-inquiry-form";
import { getInquiryById } from "../../server/actions";
import { notFound } from "next/navigation";

export const EditInquiryView = async ({ id }: { id: string }) => {
  const result = await getInquiryById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  // Pass data to form
  return <EditInquiryForm initialData={result.data} />;
};
