import type { Product } from '../types/product'
import type { SupportedLanguage } from '../i18n'
import ProductCard from './ProductCard'

interface ProductListProps {
  products: Product[]
  language: SupportedLanguage
}

function ProductList({ products, language }: ProductListProps) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          language={language}
        />
      ))}
    </div>
  )
}

export default ProductList
