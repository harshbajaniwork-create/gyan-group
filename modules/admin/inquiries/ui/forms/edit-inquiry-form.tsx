"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InquirySchema } from "../../validations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { updateInquiry } from "../../server/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface EditInquiryFormProps {
  initialData: {
    id: string;
    name: string;
    email: string;
    phone: string;
    intrest: string;
    message: string;
  };
}

export const EditInquiryForm = ({ initialData }: EditInquiryFormProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof InquirySchema>>({
    resolver: zodResolver(InquirySchema),
    defaultValues: {
      name: initialData.name,
      email: initialData.email,
      phone: initialData.phone,
      intrest: initialData.intrest,
      message: initialData.message,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (values: z.infer<typeof InquirySchema>) => {
    setIsSubmitting(true);
    try {
      const result = await updateInquiry(initialData.id, values);

      if (result.success) {
        toast.success("Inquiry updated successfully!");
        router.push("/admin/inquiries");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update inquiry");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to update inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-ivory p-6 min-h-screen">
      <div className="mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Edit Inquiry</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="intrest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest</FormLabel>
                  <FormControl>
                    <Input placeholder="Product/Service" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="Message..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-turquoise-blue hover:bg-teal-green"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Inquiry"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
