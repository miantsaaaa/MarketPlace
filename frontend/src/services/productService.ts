import { apiClient } from '../api/client'
import type { Product } from '../types/product'

export interface ProductFilters {
  search?: string
  category?: string
  shop?: string
  minPrice?: number
  maxPrice?: number
}

export const productService = {
  getAll(): Promise<Product[]> {
    return apiClient.get<Product[]>('/api/products')
  },

  getBySlug(slug: string): Promise<Product> {
    return apiClient.get<Product>(
      `/api/products/${encodeURIComponent(slug)}`
    )
  },

  search(query: string): Promise<Product[]> {
    return apiClient.get<Product[]>(
      `/api/products?search=${encodeURIComponent(query)}`
    )
  },

  getByCategory(categorySlug: string): Promise<Product[]> {
    return apiClient.get<Product[]>(
      `/api/products?category=${encodeURIComponent(categorySlug)}`
    )
  },

  getByShop(shopSlug: string): Promise<Product[]> {
    return apiClient.get<Product[]>(
      `/api/products?shop=${encodeURIComponent(shopSlug)}`
    )
  },

  getByPrice(minPrice: number, maxPrice: number): Promise<Product[]> {
    return apiClient.get<Product[]>(
      `/api/products?minPrice=${encodeURIComponent(minPrice)}&maxPrice=${encodeURIComponent(maxPrice)}`
    )
  },

  getFiltered(filters: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams()

    if (filters.search) {
      params.append('search', filters.search)
    }

    if (filters.category) {
      params.append('category', filters.category)
    }

    if (filters.shop) {
      params.append('shop', filters.shop)
    }

    if (filters.minPrice !== undefined) {
      params.append('minPrice', String(filters.minPrice))
    }

    if (filters.maxPrice !== undefined) {
      params.append('maxPrice', String(filters.maxPrice))
    }

    const query = params.toString()

    return apiClient.get<Product[]>(
      `/api/products${query ? `?${query}` : ''}`
    )
  },
}