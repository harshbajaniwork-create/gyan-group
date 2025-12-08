import React from "react";
import { DataTable } from "../components/data-table";
import { columns, Inquiry } from "../components/columns";
import { getAllInquiries } from "../../server/actions";

async function getData(): Promise<Inquiry[]> {
  const result = await getAllInquiries();

  if (!result.success || !result.data) {
    return [];
  }

  // Transform the data
  return result.data.map((inquiry) => ({
    id: inquiry.id,
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    intrest: inquiry.intrest,
    message: inquiry.message,
    createdAt: inquiry.createdAt.toISOString(),
    updatedAt: inquiry.updatedAt.toISOString(),
  }));
}

export const InquiriesPageView = async () => {
  const data = await getData();
  return (
    <section className="bg-ivory p-6 min-h-screen">
      <h1 className="text-2xl mb-6 font-semibold">Inquiries</h1>
      <div className="bg-white rounded container mx-auto p-6 flex flex-col gap-6">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
};
