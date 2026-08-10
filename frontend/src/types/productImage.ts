export interface ProductImage {
  id: number
  productId: number
  imageUrl: string
  altText: string | null
  sortOrder: number
  isPrimary: boolean
  createdAt: string
}