import { apiClient } from '../api/client'
import type { ProductImage } from '../types/productImage'

export const productImageService = {
  getAll(productId: number): Promise<ProductImage[]> {
    return apiClient.get<ProductImage[]>(
      `/api/products/${productId}/images`
    )
  },

  getPrimary(productId: number): Promise<ProductImage> {
    return apiClient.get<ProductImage>(
      `/api/products/${productId}/images/primary`
    )
  },
}