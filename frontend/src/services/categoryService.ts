import { apiClient } from '../api/client'
import type { Category, CategoryPage } from '../types/category'
import type { Product } from '../types/product'

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const response = await apiClient.get<CategoryPage>('/api/categories')

    return response.content
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