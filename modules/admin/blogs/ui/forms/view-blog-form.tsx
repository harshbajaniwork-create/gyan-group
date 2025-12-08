"use client";

import React, { useState } from "react";
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
import { getBlogById } from "../../server/actions";
import Link from "next/link";
import { toast } from "sonner";

const RichTextEditorWrapper = dynamic(() => import("../components/rich-text"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

export const ViewBlogForm = ({ id }: { id: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    // Fetch blog data
    const loadBlog = async () => {
      try {
        const result = await getBlogById(id);
        if (result.success && result.data) {
          form.reset({
            title: result.data.title,
            slug: result.data.slug,
            content: result.data.content,
            image: result.data.image,
            category: result.data.category,
            tags: result.data.tags,
            featured: result.data.featured,
            author: result.data.author,
            status: result.data.status,
          });
        } else {
          toast.error("Failed to load blog data");
        }
      } catch (error) {
        console.error("Load error:", error);
        toast.error("Failed to load blog");
      } finally {
        setIsLoading(false);
      }
    };
    loadBlog();
  }, [id, form]);

  if (!isMounted || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-teal-green" />
      </div>
    );
  }

  return (
    <div>
      <Form {...form}>
        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly className="bg-gray-50" />
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
                    <Input {...field} readOnly className="bg-gray-50" />
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
                    <Input {...field} readOnly className="bg-gray-50" />
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
                    <Input {...field} readOnly className="bg-gray-50" />
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
                  <div className="pointer-events-none opacity-75">
                    <RichTextEditorWrapper
                      value={field.value}
                      onChange={() => {}}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly className="bg-gray-50" />
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
                      value={field.value?.join(", ") || ""}
                      readOnly
                      className="bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-gray-50">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured</FormLabel>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-gray-50">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Status</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      {field.value === "published" ? "Published" : "Draft"}
                    </div>
                  </div>
                  <FormControl>
                    <Switch checked={field.value === "published"} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/admin/blogs">Back to List</Link>
            </Button>
            <Button asChild className="bg-turquoise-blue hover:bg-teal-green">
              <Link href={`/admin/blogs/edit/${id}`}>Edit Blog</Link>
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};
