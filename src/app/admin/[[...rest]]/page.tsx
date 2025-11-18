import React from 'react'
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
}
export default function page() {
  return (
    <div>admin</div>
  )
}
