import { ViewInquiryView } from "@/modules/admin/inquiries/ui/views/view-inquiry-view";

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return <ViewInquiryView id={id} />;
};

export default Page;
