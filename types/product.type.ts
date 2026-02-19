export interface Product {
  _id: string;
  name: string;
  price: number;
  category: "club" | "country";
  sizes?: string[];
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
