"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductsSchema } from "../../validation";
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
import slugify from "slugify";
import { upsertProduct } from "../../server/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ImageUpload } from "@/components/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  initialData: any; // Using any for simplicity as strict type matching can be tricky with partials, but ideally should be inferred from schema or DB type
  categories: { id: string; name: string }[];
}

export const EditProductForm = ({ initialData, categories }: Props) => {
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

  const form = useForm<z.infer<typeof ProductsSchema>>({
    resolver: zodResolver(ProductsSchema),
    defaultValues: {
      title: initialData.title,
      slug: initialData.slug,
      productNumber: initialData.productNumber,
      casNumber: initialData.casNumber,
      molecularWeight: initialData.molecularWeight,
      molecularFormula: initialData.molecularFormula,
      productStatus: initialData.productStatus,
      application: initialData.application,
      specifications: initialData.specifications,
      image: initialData.image,
      categoryId: initialData.categoryId,
    },
  });

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const title = form.watch("title");
  useEffect(() => {
    if (title) {
      const slug = generateSlug(title);
      form.setValue("slug", slug);
    }
  }, [title, form]);

  const onSubmit = async (values: z.infer<typeof ProductsSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await upsertProduct(values, initialData.id);

      if (result.success) {
        toast.success("Product updated successfully!");
        router.push("/admin/products");
      } else {
        toast.error(result.error || "Failed to update product");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-teal-green" />
      </div>
    );
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Title" type="text" {...field} />
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
              name="productNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Product Number"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="casNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CAS Number</FormLabel>
                  <FormControl>
                    <Input placeholder="CAS Number" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="molecularWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Molecular Weight</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Molecular Weight"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="molecularFormula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Molecular Formula</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Molecular Formula"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Status</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. In Stock, Pre-order"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="application"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application</FormLabel>
                <FormControl>
                  <Textarea placeholder="Application details..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specifications</FormLabel>
                <FormControl>
                  <Textarea placeholder="Specifications..." {...field} />
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

          <div className="flex gap-4">
            <Button asChild variant="outline">
              <Link href="/admin/products" prefetch>
                Back to List
              </Link>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-turquoise-blue hover:bg-teal-green cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Product...
                </>
              ) : (
                "Update Product"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
