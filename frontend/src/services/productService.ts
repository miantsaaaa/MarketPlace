import { apiClient } from '../api/client'
import type { Product } from '../types/product'
import type { PageResponse } from '../types/page'

export interface ProductFilters {
  search?: string
  category?: string
  shop?: string
  minPrice?: number
  maxPrice?: number
}

export const productService = {
  getAll(): Promise<PageResponse<Product>> {
    return apiClient.get<PageResponse<Product>>('/api/products')
  },

  getBySlug(slug: string): Promise<Product> {
    return apiClient.get<Product>(
      `/api/products/${encodeURIComponent(slug)}`
    )
  },

  search(query: string): Promise<PageResponse<Product>> {
    return apiClient.get<PageResponse<Product>>(
      `/api/products?search=${encodeURIComponent(query)}`
    )
  },

  getByCategory(categorySlug: string): Promise<PageResponse<Product>> {
    return apiClient.get<PageResponse<Product>>(
      `/api/products?category=${encodeURIComponent(categorySlug)}`
    )
  },

  getByShop(shopSlug: string): Promise<PageResponse<Product>> {
    return apiClient.get<PageResponse<Product>>(
      `/api/products?shop=${encodeURIComponent(shopSlug)}`
    )
  },

  getByPrice(
    minPrice: number,
    maxPrice: number
  ): Promise<PageResponse<Product>> {
    return apiClient.get<PageResponse<Product>>(
      `/api/products?minPrice=${encodeURIComponent(minPrice)}&maxPrice=${encodeURIComponent(maxPrice)}`
    )
  },

  getFiltered(
    filters: ProductFilters
  ): Promise<PageResponse<Product>> {
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

    return apiClient.get<PageResponse<Product>>(
      `/api/products${query ? `?${query}` : ''}`
    )
  },
}