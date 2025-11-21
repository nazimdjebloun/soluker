"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/app/admin/produits/types";

interface ProductTableProps {
  products: Product[];
  //onEdit: (product: Product) => void;
  //onDelete: (id: string) => void;
}

export function ProductTable({
  products,
}: //onEdit,
//onDelete,
ProductTableProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteConfirm(product.id);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      //onDelete(productToDelete.id);
      setDeleteConfirm(null);
      setProductToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
    setProductToDelete(null);
  };

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

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {product.description}
                  </p>
                  <div className="flex gap-4 mt-3">
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
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  //onClick={() => onEdit(product)}
                  className="gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClick(product)}
                  className="gap-2 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm !== null} onOpenChange={handleCancelDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{productToDelete?.title}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
