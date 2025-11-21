export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
}

export interface ProductFormState {
  status: "idle" | "success" | "error";
  message?: string;
  product?: Product;
}

