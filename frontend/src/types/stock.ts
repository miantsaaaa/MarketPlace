export interface Stock {
  id: number
  productId: number
  quantityAvailable: number
  quantityReserved: number
  reorderThreshold: number
  updatedAt: string
}