"use client";

import { saveProductAction } from "@/app/admin/produits/actions";
import { ProductFormState } from "@/app/admin/produits/types";
import { useState, useEffect } from "react";
import { useActionState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { X, Plus, Trash2 } from "lucide-react";

interface AddProductFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function AddProductForm({ onClose, onSuccess }: AddProductFormProps) {
  const [formData, setFormData] = useState({
    images: [] as string[],
    category: "",
  });

  const initialActionState: ProductFormState = { status: "idle" };
  const [actionState, formAction, isSubmitting] = useActionState(
    saveProductAction,
    initialActionState
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <ScrollArea className="max-h-[90vh]">
          <form action={formAction} className="p-6" noValidate>
            {/* Hidden fields for category & images */}
            <input type="hidden" name="category" value={formData.category} />
            {formData.images.map((img, i) => (
              <input key={i} type="hidden" name="images" value={img} />
            ))}

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Add New Product</h2>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Product Info */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Product Title *
                </label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <Textarea
                  name="description"
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price *
                  </label>
                  <Input
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Stock Quantity
                  </label>
                  <Input type="number" name="stock" min="0" placeholder="0" />
                </div>
              </div>
            </div>
            <div className="mb-5 h-10">
              {/* Error */}
              {actionState.status === "error" && actionState.message && (
                <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {actionState.message}
                </div>
              )}
              {/* Success */}
              {actionState.status === "success" && actionState.message && (
                <div className="mb-4 rounded-md border border-emerald-400 bg-emerald-100 px-3 py-2 text-sm text-emerald-800">
                  {actionState.message}
                </div>
              )}
            </div>
            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Product"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </Card>
    </div>
  );
}
