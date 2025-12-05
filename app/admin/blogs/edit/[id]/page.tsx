import { EditBlogsView } from "@/modules/admin/blogs/ui/views/edit-blogs-view";

interface Props {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: Props) => {
  const { id } = await params;

  return <EditBlogsView id={id} />;
};

export default page;
