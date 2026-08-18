import { Link } from 'react-router-dom'
import type { Product } from '../types/product'
import type { SupportedLanguage } from '../i18n'
import { getTranslations } from '../i18n'

interface ProductCardProps {
  product: Product
  language: SupportedLanguage
}

function ProductCard({ product, language }: ProductCardProps) {
  const t = getTranslations(language)

  return (
    <article className="product-card">
      <div className="product-card-image-placeholder" />

      <h3 className="product-card-name">{product.name}</h3>

      <p className="product-card-price">
        {product.unitPrice} {product.currency}
      </p>

      <p className="product-card-status">
        {t.common.available}
      </p>

      <Link
        to={`/produit/${product.slug}`}
        className="product-card-link"
      >
        {t.common.viewDetails}
      </Link>
    </article>
  )
}

export default ProductCard