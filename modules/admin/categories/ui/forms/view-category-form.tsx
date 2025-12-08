"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface ViewCategoryFormProps {
  initialData: {
    id: string;
    name: string;
    slug: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

export const ViewCategoryForm = ({ initialData }: ViewCategoryFormProps) => {
  const router = useRouter();

  return (
    <div className="bg-ivory p-6 min-h-screen">
      <div className=" mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">View Category</h1>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={initialData.name} readOnly className="bg-gray-50" />
          </div>

          <div className="space-y-2">
            <Label>Slug</Label>
            <Input value={initialData.slug} readOnly className="bg-gray-50" />
          </div>

          {initialData.createdAt && (
            <div className="space-y-2">
              <Label>Created At</Label>
              <Input
                value={new Date(initialData.createdAt).toLocaleString()}
                readOnly
                className="bg-gray-50"
              />
            </div>
          )}

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Back
            </Button>
            <Button
              onClick={() =>
                router.push(`/admin/categories/edit/${initialData.id}`)
              }
              className="bg-turquoise-blue hover:bg-teal-green"
            >
              Edit Category
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
