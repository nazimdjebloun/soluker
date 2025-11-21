"use client";

import { saveProductAction } from "@/app/admin/produits/actions";
import { ProductFormState } from "@/app/admin/produits/types";
import { useState, useEffect, ChangeEvent } from "react";
import { useActionState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

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
import { toast } from "sonner";
import Image from "next/image";

interface AddProductFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function AddProductForm({ onClose, onSuccess }: AddProductFormProps) {
  const initialActionState: ProductFormState = { status: "idle" };
  const [images, setImages] = useState<string[]>([]);
  const [actionState, formAction, isSubmitting] = useActionState(
    saveProductAction,
    initialActionState
  );

  // Handle selecting new images
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    //e.target.value = ""; // Reset input
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (actionState?.status === "success") {
      toast.success(`Product added: ${actionState.product?.title}`);
    }
  }, [actionState?.status, actionState?.product]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <ScrollArea className="max-h-[90vh]">
          <form
            action={formAction}
            className="p-6"
            noValidate
            //encType="multipart/form-data"
          >
            {/* Hidden fields for category & images */}

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
                <Label className="block text-sm font-medium mb-2">
                  Product Title *
                </Label>
                <Input
                  type="text"
                  name="title"
                  defaultValue={actionState.correctFormValues?.title}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <Label className="block text-sm font-medium mb-2">
                  Description
                </Label>
                <Textarea
                  name="description"
                  placeholder="Enter product description"
                  defaultValue={actionState.correctFormValues?.description}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium mb-2">
                    Price *
                  </Label>
                  <Input
                    type="number"
                    name="price"
                    defaultValue={actionState.correctFormValues?.price}
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium mb-2">
                    Stock Quantity
                  </Label>
                  <Input
                    type="number"
                    name="stock"
                    min="0"
                    defaultValue={actionState.correctFormValues?.stock}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            {/* Image Upload */}
            <div className="">
              <Label className="block text-sm font-medium mb-2">Images</Label>

              <div className="flex gap-2 flex-wrap">
                {images.map((img, i) => (
                  <div key={i} className="relative ">
                    <div className="w-24 h-24 border rounded-xl overflow-hidden flex items-center justify-center bg-gray-50">
                      <Image
                        src={img}
                        alt={`Preview ${i}`}
                        width={100}
                        height={100}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </div>
                    <Button
                      className="absolute -top-3 -right-3 w-7 h-7 p-0 hover:bg-red-600 bg-red-400 flex items-center justify-center"
                      onClick={() => removeImage(i)}
                    >
                      <Trash2 className="w-7 h-7 text-white" />
                    </Button>
                  </div>
                ))}
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className=""
                />
              </div>
            </div>

            <div className="mb-5 h-10">
              {/* Error */}
              {actionState.status === "error" && actionState.message && (
                <div className="my-4 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
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
