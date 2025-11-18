"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
}


interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export  function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (products.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground text-lg">
          No products yet. Create your first product!
        </p>
      </Card>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 p-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="p-4 hover:shadow-lg transition-shadow "
          >
            <div className="flex items-start justify-between gap-4">
              {/* Product Info */}
              <div className="flex gap-4 flex-1">
                {/* Thumbnail */}
                <div className="shrink-0">
                  <div className="relative w-20 h-20 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {product.description}
                  </p>
                  <div className="flex gap-4 mt-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Category</p>
                      <p className="text-sm font-medium">{product.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="text-sm font-medium">${product.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Stock</p>
                      <p className="text-sm font-medium">
                        {product.stock} units
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Images</p>
                      <p className="text-sm font-medium">
                        {product.images.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(product)}
                  className="gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                {deleteConfirm === product.id ? (
                  <div className="flex gap-1">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        onDelete(product.id);
                        setDeleteConfirm(null);
                      }}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteConfirm(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteConfirm(product.id)}
                    className="gap-2 text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
