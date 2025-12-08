import { ViewInquiryForm } from "../forms/view-inquiry-form";
import { getInquiryById } from "../../server/actions";
import { notFound } from "next/navigation";

export const ViewInquiryView = async ({ id }: { id: string }) => {
  const result = await getInquiryById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const serializedData = {
    ...result.data,
    createdAt: result.data.createdAt.toISOString(),
  };

  return <ViewInquiryForm initialData={serializedData} />;
};
