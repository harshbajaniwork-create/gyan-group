import { EditInquiryView } from "@/modules/admin/inquiries/ui/views/edit-inquiry-view";

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return <EditInquiryView id={id} />;
};

export default Page;
