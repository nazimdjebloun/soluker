export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: File[];
}

export interface ProductFormState {
  status: "idle" | "success" | "error";
  message?: string;
  product?: Product;
  correctFormValues?: {
    // filled on error to preserve inputs
    title: string;
    description: string;
    price: string;
    stock: string;
    category?: string;
    images?: string[];
  };
}

