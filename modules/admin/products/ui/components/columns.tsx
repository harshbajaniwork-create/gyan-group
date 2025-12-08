"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { deleteProduct } from "../../server/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteDialog } from "@/components/delete-dialog";

export type Products = {
  id: string;
  title: string;
  productNumber: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};

// Action Cell Component
function ActionCell({ product }: { product: Products }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteProduct(product.id);

      if (result.success) {
        toast.success("Product deleted successfully!");
        setShowDeleteDialog(false);
        router.refresh(); // Refresh the page to update the table
      } else {
        toast.error(result.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" disabled={isDeleting}>
            <span className="sr-only">Open menu</span>
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreHorizontal className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="right">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/admin/products/view/${product.id}`} prefetch>
              <Eye />
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/products/edit/${product.id}`} prefetch>
              <Pencil />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            disabled={isDeleting}
            className="text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Product"
        description={`Are you sure you want to delete "${product.title}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </>
  );
}

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "productNumber",
    header: "Product Number",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      // Handle potential null/undefined category
      const category = row.getValue("category");
      return <span>{category ? String(category) : "Uncategorized"}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string;
      const formatted = formatDate(date, "short");
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionCell product={row.original} />,
  },
];
