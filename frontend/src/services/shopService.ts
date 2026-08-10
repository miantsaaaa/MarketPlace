import { apiClient } from '../api/client'
import type { Shop } from '../types/shop'
import type { Product } from '../types/product'

export const shopService = {
  getAll(): Promise<Shop[]> {
    return apiClient.get<Shop[]>('/api/shops')
  },

  getBySlug(slug: string): Promise<Shop> {
    return apiClient.get<Shop>(
      `/api/shops/${encodeURIComponent(slug)}`
    )
  },

  getProducts(slug: string): Promise<Product[]> {
    return apiClient.get<Product[]>(
      `/api/shops/${encodeURIComponent(slug)}/products`
    )
  },
}