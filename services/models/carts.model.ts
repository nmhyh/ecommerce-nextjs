import { Product } from "@/services/models/products.model";

export interface ProductInCart {
  id: number
  products: Product[]
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
}

export interface Cart {
  carts: ProductInCart[];
}
