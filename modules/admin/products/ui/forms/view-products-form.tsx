"use client";

import React, { useState } from "react";
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
  initialData: any;
  categories: { id: string; name: string }[];
}

export const ViewProductForm = ({ initialData, categories }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

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
        <div className="space-y-8 pointer-events-none opacity-80">
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
                    disabled
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
                  <ImageUpload
                    value={field.value!}
                    onChange={field.onChange}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 mt-8">
          <Button asChild variant="outline">
            <Link href="/admin/products" prefetch>
              Back to List
            </Link>
          </Button>
          <Button
            className="bg-turquoise-blue hover:bg-teal-green cursor-pointer disabled:opacity-50"
            asChild
          >
            <Link href={`/admin/products/edit/${initialData.id}`} prefetch>
              Edit Product
            </Link>
          </Button>
        </div>
      </Form>
    </div>
  );
};
