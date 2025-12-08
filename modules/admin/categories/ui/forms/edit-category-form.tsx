"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CategorySchema } from "../../validations";
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
import { Loader2 } from "lucide-react";
import slugify from "slugify";
import { upsertCategory } from "../../server/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface EditCategoryFormProps {
  initialData: {
    id: string;
    name: string;
    slug: string;
  };
}

export const EditCategoryForm = ({ initialData }: EditCategoryFormProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: initialData.name,
      slug: initialData.slug,
    },
  });

  const generateSlug = (name: string) => {
    return slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });
  };

  // Only auto-update slug if the user modifies the name and it no longer matches the initial name
  // Or explicitly if requested. For now, let's keep it simple: if name changes, update slug.
  const name = form.watch("name");
  useEffect(() => {
    if (name && name !== initialData.name) {
      const slug = generateSlug(name);
      form.setValue("slug", slug);
    }
  }, [name, form, initialData.name]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
    setIsSubmitting(true);
    try {
      const result = await upsertCategory(values, initialData.id);

      if (result.success) {
        toast.success("Category updated successfully!");
        router.push("/admin/categories");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update category");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to update category. Please try again.");
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
        <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="category-slug" {...field} readOnly />
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
                  "Update Category"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
