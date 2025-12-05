import { EditBlogForm } from "../forms/edit-blog-form";

export const EditBlogsView = ({ id }: { id: string }) => {
  return (
    <section className="bg-ivory p-6 min-h-screen">
      <h1 className="text-2xl mb-6 font-semibold">Admin Blogs Page</h1>
      <div className="bg-white rounded container mx-auto p-6 flex flex-col gap-6">
        <EditBlogForm id={id} />
      </div>
    </section>
  );
};
