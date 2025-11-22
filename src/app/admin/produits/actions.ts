"use server";

import { Product, ProductFormState } from "@/app/admin/produits/types";
import apiClient, { apiRequest } from "@/lib/api-client";

const ADD_PRODUCT_ERROR_STATE = (
  message: string,
  correctFormValues?: ProductFormState["correctFormValues"]
): ProductFormState => ({
  status: "error",
  message,
  correctFormValues,
});

export async function saveProductAction(
  prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const title = (formData.get("title") ?? "").toString().trim();
  const description = (formData.get("description") ?? "").toString().trim();
  const priceValue = (formData.get("price") ?? "").toString();
  const stockQuantity = (formData.get("stock") ?? "").toString();
  const price = Number(priceValue);
  const stock = Number(stockQuantity);
  const images = formData.getAll("images") as File[];

  const correctFormValues = {
    title,
    description,
    price: priceValue,
    stock: stockQuantity,
  };

    const product = {
      title,
      description,
      price: priceValue,
      stock: stockQuantity,
      images,
    };

    if (!title) {
      return ADD_PRODUCT_ERROR_STATE(
        "Product name is required.",
        correctFormValues
      );
    }

    if (!priceValue || Number.isNaN(price)) {
      return ADD_PRODUCT_ERROR_STATE(
        "Please enter a valid price.",
        correctFormValues
      );
    }

    if (price < 0) {
      return ADD_PRODUCT_ERROR_STATE(
        "Price cannot be negative.",
        correctFormValues
      );
    }

    if (Number.isNaN(stock) || stock < 0) {
      return ADD_PRODUCT_ERROR_STATE(
        "Stock must be a positive number.",
        correctFormValues
      );
    }

    try {
      const result = await apiRequest<{ data: Product }>(
        "POST",
        "/catalog/products",
        product
      );
      return {
        status: "success",
        message: "Product saved successfully.",
        product: result.data,
      };
    } catch (err: any) {
      console.error(err);
      return ADD_PRODUCT_ERROR_STATE(
        err.response?.data?.message || "Failed to save product.",
        correctFormValues
      );
    }
}


const LIST_ERROR_STATE = (message: string): ProductListState => ({
  status: "error",
  message,
});



export interface ProductListState {
  status: "idle" | "success" | "error";
  message?: string;
  products?: Product[];
  total?: number;
  page?: number;
  limit?: number;
}

interface ListProductsParams {
  page?: number;
  limit?: number;
  search?: string;
}

/**
 * Fetch products from the backend API with optional pagination and search.
 */
export async function listProductsAction({
  page = 1,
  limit = 10,
  search = "",
}: ListProductsParams = {}): Promise<ProductListState> {
  try {
    const params = new URLSearchParams();

    // Only add non-default values to keep URLs cleaner
    if (page > 1) params.append("page", page.toString());
    if (limit !== 10) params.append("limit", limit.toString());
    if (search) params.append("search", search);

    const queryString = params.toString();
    const url = `/catalog/products${queryString ? `?${queryString}` : ""}`;

    const result = await apiRequest<{ data: Product[]; total: number }>(
      "GET",
      url
    );

    return {
      status: "success",
      message: "Products loaded successfully",
      products: result.data,
      total: result.total,
      page,
      limit,
    };
  } catch (err: any) {
    console.error(err);
    return LIST_ERROR_STATE(
      err.response?.data?.message || "Failed to fetch products."
    );
  }
}