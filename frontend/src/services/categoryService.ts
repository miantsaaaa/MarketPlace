import { apiClient } from '../api/client'
import type { Category } from '../types/category'
import type { Product } from '../types/product'

export const categoryService = {
  getAll(): Promise<Category[]> {
    return apiClient.get<Category[]>('/api/categories')
  },

  getBySlug(slug: string): Promise<Category> {
    return apiClient.get<Category>(
      `/api/categories/${encodeURIComponent(slug)}`
    )
  },

  getProducts(slug: string): Promise<Product[]> {
    return apiClient.get<Product[]>(
      `/api/categories/${encodeURIComponent(slug)}/products`
    )
  },
}