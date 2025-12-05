import React from "react";
import { AddBlogForm } from "../forms/add-blog-form";

export const AddBlogsView = () => {
  return (
    <section className="bg-ivory p-6">
      <h1 className="text-2xl mb-6 font-semibold">Admin Blogs Page</h1>
      <div className="bg-white rounded container mx-auto p-6 flex flex-col gap-6">
        <AddBlogForm />
      </div>
    </section>
  );
};
