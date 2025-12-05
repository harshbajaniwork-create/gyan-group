import { Blogs, columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import { getAllBlogs } from "../../server/actions";

async function getData(): Promise<Blogs[]> {
  const result = await getAllBlogs();

  if (!result.success || !result.data) {
    return [];
  }

  // Transform the data to match the Blogs type
  return result.data.map((blog) => ({
    id: blog.id,
    title: blog.title,
    category: blog.category,
    featured: blog.featured,
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
  }));
}

export const AdminBlogsPageView = async () => {
  const data = await getData();
  return (
    <section className="bg-ivory p-6 min-h-screen">
      <h1 className="text-2xl mb-6 font-semibold">Admin Blogs Page</h1>
      <div className="bg-white rounded container mx-auto p-6 flex flex-col gap-6">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
};
