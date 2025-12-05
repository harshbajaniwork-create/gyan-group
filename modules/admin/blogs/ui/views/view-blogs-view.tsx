import { ViewBlogForm } from "../forms/view-blog-form";

export const ViewBlogsView = ({ id }: { id: string }) => {
  return (
    <section className="bg-ivory p-6">
      <h1 className="text-2xl mb-6 font-semibold">Admin Blogs Page</h1>
      <div className="bg-white rounded container mx-auto p-6 flex flex-col gap-6">
        <ViewBlogForm id={id} />
      </div>
    </section>
  );
};
