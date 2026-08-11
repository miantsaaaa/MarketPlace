export interface Product {
  id: number
  shopId: number
  categoryId: number
  name: string
  slug: string
  description: string | null
  unitPrice: number
  currency: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}