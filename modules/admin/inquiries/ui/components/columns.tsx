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
import { deleteInquiry } from "../../server/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteDialog } from "@/components/delete-dialog";

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  intrest: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

// Action Cell Component
function ActionCell({ inquiry }: { inquiry: Inquiry }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteInquiry(inquiry.id);

      if (result.success) {
        toast.success("Inquiry deleted successfully!");
        setShowDeleteDialog(false);
        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete inquiry");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete inquiry. Please try again.");
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
            <Link href={`/admin/inquiries/view/${inquiry.id}`} prefetch>
              <Eye />
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/inquiries/edit/${inquiry.id}`} prefetch>
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
        title="Delete Inquiry"
        description={`Are you sure you want to delete inquiry from "${inquiry.name}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </>
  );
}

export const columns: ColumnDef<Inquiry>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "intrest",
    header: "Interest",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
        >
          Date
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
    cell: ({ row }) => <ActionCell inquiry={row.original} />,
  },
];
