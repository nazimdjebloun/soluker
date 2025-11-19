"use client";
import { useState } from "react";
import { ProductTable } from "@/app/admin/produits/components/products-table";
import { ProductForm } from "@/app/admin/produits/components/product-form";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, Plus } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      description: "High-quality sound with noise cancellation",
      price: 199.99,
      category: "Electronics",
      stock: 45,
      images: ["/wireless-headphones.png"],
    },
    {
      id: "2",
      name: "Classic Coffee Mug",
      description: "Ceramic mug for everyday use",
      price: 12.99,
      category: "Home",
      stock: 120,
      images: ["/simple-coffee-mug.png"],
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
    };
    setProducts([...products, product]);
    setIsFormOpen(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

    return (
      <div className="  p-2 ">
        <div className="flex w-full justify-between items-center mb-6 p-4 rounded-md  ">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>

          <Button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            size="lg"
            className="gap-2 bg-emerald-800"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </Button>
        </div>

        {isFormOpen && (
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            onClose={handleCloseForm}
          />
        )}
        <div>
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDeleteProduct}
          />
        </div>
      </div>
    );
}