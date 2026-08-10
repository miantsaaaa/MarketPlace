export type ShopStatus =
  | 'PENDING'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'CLOSED'

export interface Shop {
  id: number
  ownerUserId: number
  name: string
  slug: string
  description: string | null
  logoUrl: string | null
  status: ShopStatus
  createdAt: string
  updatedAt: string
}