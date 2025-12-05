import { Search } from "lucide-react";
import { Blogs, columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

async function getData(): Promise<Blogs[]> {
  return [
    {
      id: "728ed52f",
      title: "Blog 1",
      category: "Category 1",
      featured: true,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
    },
    {
      id: "728ed52f",
      title: "Blog 2",
      category: "Category 2",
      featured: false,
      createdAt: "2023-01-02T00:00:00.000Z",
      updatedAt: "2023-01-02T00:00:00.000Z",
    },
    {
      id: "728ed52f",
      title: "Blog 3",
      category: "Category 3",
      featured: true,
      createdAt: "2023-01-03T00:00:00.000Z",
      updatedAt: "2023-01-03T00:00:00.000Z",
    },
  ];
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
