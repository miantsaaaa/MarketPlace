import { apiClient } from '../api/client'
import type { Stock } from '../types/stock'

export const stockService = {
  getByProductId(productId: number): Promise<Stock> {
    return apiClient.get<Stock>(
      `/api/products/${productId}/stock`
    )
  },
}