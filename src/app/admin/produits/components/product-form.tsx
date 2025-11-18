"use client";

import { Product } from "@/app/admin/[[...rest]]/page";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface ProductFormProps {
  product?: Product | null;
  onSubmit: (product: Product | Omit<Product, "id">) => void;
  onClose: () => void;
}

export function ProductForm({ product,
  // onSubmit,
  onClose }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category: product?.category || "",
    stock: product?.stock || 0,
    images: product?.images || [],
  });

  const [imageInput, setImageInput] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageInput],
      }));
      setImageInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!formData.name || !formData.price || formData.images.length === 0) {
  //     alert("Please fill in all required fields and add at least one image");
  //     return;
  //   }

  //   if (product) {
  //     onSubmit({ ...formData, id: product.id } as Product);
  //   } else {
  //     onSubmit(formData);
  //   }
  // };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <form
          // onSubmit={handleSubmit}
          className="p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {product ? "Edit Product" : "Add New Product"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Basic Info */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Name *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
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
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Stock Quantity
                </label>
                <Input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Input
                type="text"
                name="category"
                hidden
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Electronics, Home, Fashion"
              />
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>category</SelectLabel>
                      <SelectItem value="AA">category AA</SelectItem>
                      <SelectItem value="BB">category BB</SelectItem>
                      <SelectItem value="CC">category CC</SelectItem>
                      <SelectItem value="DD">category DD</SelectItem>
                      <SelectItem value="EE">category EE</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddImage}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add category
                </Button>
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">
              Product Images * ({formData.images.length})
            </label>

            {/* Image Gallery */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mb-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="relative w-full aspect-square bg-muted rounded-md overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-destructive text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Image Input */}
            <div className="flex gap-2">
              <Input
                type="text"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="Enter image URL"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddImage())
                }
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddImage}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Image
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Add image URLs. You can use placeholder images like:
              /placeholder.svg
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {product ? "Update Product" : "Create Product"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
