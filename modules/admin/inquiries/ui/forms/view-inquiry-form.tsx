"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

interface ViewInquiryFormProps {
  initialData: {
    id: string;
    name: string;
    email: string;
    phone: string;
    intrest: string;
    message: string;
    createdAt: string;
  };
}

export const ViewInquiryForm = ({ initialData }: ViewInquiryFormProps) => {
  const router = useRouter();

  return (
    <div className="bg-ivory p-6 min-h-screen">
      <div className="mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">View Inquiry</h1>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={initialData.name} readOnly className="bg-gray-50" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={initialData.email}
                readOnly
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={initialData.phone}
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Interest</Label>
            <Input
              value={initialData.intrest}
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              value={initialData.message}
              readOnly
              rows={5}
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label>Created At</Label>
            <Input
              value={new Date(initialData.createdAt).toLocaleString()}
              readOnly
              className="bg-gray-50"
            />
          </div>

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
                router.push(`/admin/inquiries/edit/${initialData.id}`)
              }
              className="bg-turquoise-blue hover:bg-teal-green"
            >
              Edit Inquiry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
