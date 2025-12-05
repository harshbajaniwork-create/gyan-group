import { ViewBlogsView } from "@/modules/admin/blogs/ui/views/view-blogs-view";

interface Props {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: Props) => {
  const { id } = await params;

  return <ViewBlogsView id={id} />;
};

export default page;
