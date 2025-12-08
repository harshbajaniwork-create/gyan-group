"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BlogsSchema } from "../../validation";
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
import { Switch } from "@/components/ui/switch";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/image-upload";
import slugify from "slugify";
import { upsertBlog } from "../../server/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RichTextEditorWrapper = dynamic(() => import("../components/rich-text"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export const AddBlogForm = () => {
  const generateSlug = (name: string) => {
    return slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });
  };
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof BlogsSchema>>({
    resolver: zodResolver(BlogsSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      image: "",
      category: "",
      tags: [],
      featured: false,
      author: "",
      status: "draft",
    },
  });

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (values: z.infer<typeof BlogsSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await upsertBlog(values);

      if (result.success) {
        toast.success("Blog created successfully!");
        form.reset();
        router.push("/admin/blogs");
      } else {
        toast.error(result.error || "Failed to create blog");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to create blog. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = form.watch("title");
  useEffect(() => {
    if (title) {
      const slug = generateSlug(title);
      form.setValue("slug", slug);
    }
  }, [title, form]);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-teal-green" />
      </div>
    );
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" type="text" {...field} />
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
                    <Input placeholder="slug" type="text" {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="category" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., technology, web, coding"
                      type="text"
                      value={field.value?.join(", ") || ""}
                      onChange={(e) => {
                        const tagsArray = e.target.value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter((tag) => tag.length > 0);
                        field.onChange(tagsArray);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <RichTextEditorWrapper
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload value={field.value!} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        React.startTransition(() => {
                          field.onChange(checked);
                        });
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Status</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value === "published"}
                      onCheckedChange={(checked) => {
                        React.startTransition(() => {
                          field.onChange(checked ? "published" : "draft");
                        });
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-turquoise-blue hover:bg-teal-green cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Blog...
              </>
            ) : (
              "Create Blog"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};
