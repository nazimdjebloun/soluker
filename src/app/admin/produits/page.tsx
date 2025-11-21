"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ProductTable } from "@/app/admin/produits/components/products-table";
import { AddProductForm } from "@/app/admin/produits/components/product-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import { Plus, Search, X, Loader2 } from "lucide-react";
import type { Product } from "@/app/admin/produits/types";

import { useQuery } from "@tanstack/react-query";
import { listProductsAction } from "@/app/admin/produits/actions";

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100];

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // -----------------------------
  //   INITIAL STATE FROM URL
  // -----------------------------
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [limit, setLimit] = useState(Number(searchParams.get("limit")) || 5);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // -----------------------------
  //   URL SYNC
  // -----------------------------
  const updateURL = (params: Record<string, any>) => {
    const sp = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(params)) {
      if (value === "" || value === null) sp.delete(key);
      else sp.set(key, String(value));
    }

    router.replace(`?${sp.toString()}`);
  };

  // -----------------------------
  //   FETCH DATA
  // -----------------------------
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", page, limit, search],
    queryFn: () => listProductsAction({ page, limit, search }),
  });

  const products = data?.products || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  // -----------------------------
  //   HANDLERS
  // -----------------------------
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateURL({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLimitChange = (newLimit: string) => {
    const value = Number(newLimit);
    setLimit(value);
    setPage(1);
    updateURL({ limit: value, page: 1 });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    updateURL({ search: value, page: 1 });
  };

  const handleClearSearch = () => {
    setSearch("");
    setPage(1);
    updateURL({ search: "", page: 1 });
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your product catalog ({total}{" "}
            {total === 1 ? "product" : "products"})
          </p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          size="lg"
          className="gap-2 bg-emerald-800 hover:bg-emerald-900"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Button>
      </div>

      {/* Search + Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />

            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-10"
            />

            {search && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Items per page */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Per page:
            </span>

            <select
              value={limit}
              onChange={(e) => handleLimitChange(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm bg-background"
            >
              {ITEMS_PER_PAGE_OPTIONS.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Error */}
      {error && (
        <Card className="p-6 border-destructive">
          <p className="text-destructive text-center">
            Failed to load products. Please try again.
          </p>
        </Card>
      )}

      {/* Loading */}
      {isLoading ? (
        <Card className="p-12 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </Card>
      ) : products.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            {search
              ? "No products found matching your search."
              : "No products yet. Add your first product!"}
          </p>
        </Card>
      ) : (
        <>
          {/* Table */}
          <ProductTable products={products} />

          <div className="flex justify-between items-center">
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(Math.max(1, page - 1))}
                      className={
                        page === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                    let pageNum: number;

                    if (totalPages <= 7) {
                      pageNum = i + 1;
                    } else if (page <= 4) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 3) {
                      pageNum = totalPages - 6 + i;
                    } else {
                      pageNum = page - 3 + i;
                    }

                    const showEllipsisBefore =
                      totalPages > 7 && page > 4 && i === 0;
                    const showEllipsisAfter =
                      totalPages > 7 && page < totalPages - 3 && i === 6;

                    if (showEllipsisBefore) {
                      return <PaginationEllipsis key="start" />;
                    }
                    if (showEllipsisAfter) {
                      return <PaginationEllipsis key="end" />;
                    }

                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNum)}
                          isActive={page === pageNum}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, page + 1))
                      }
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}

            <div className="text-sm text-muted-foreground">
              Showing {(page - 1) * limit + 1} to{" "}
              {Math.min(page * limit, total)} of {total} products
            </div>
          </div>
        </>
      )}

      {/* Add Product Modal */}
      {isFormOpen && (
        <AddProductForm
          onClose={() => {
            setIsFormOpen(false);
            refetch();
          }}
        />
      )}
    </div>
  );
}
