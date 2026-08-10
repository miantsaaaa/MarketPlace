import { useEffect, useState } from 'react'
import { productService } from '../services/productService'
import type { Product } from '../types/product'
import type { SupportedLanguage } from '../i18n'
import { getTranslations } from '../i18n'
import ProductList from '../components/ProductList'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'

interface CataloguePageProps {
  language: SupportedLanguage
}

function CataloguePage({ language }: CataloguePageProps) {
  const t = getTranslations(language)

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null
  )

  useEffect(() => {
    let cancelled = false

    setLoading(true)
    setError(null)

    productService
      .getFiltered({
        search: searchQuery || undefined,
        category: selectedCategory || undefined,
      })
      .then((data) => {
        if (!cancelled) {
          setProducts(data)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(t.states.apiError)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [searchQuery, selectedCategory, t.states.apiError])

  return (
    <div className="catalogue-page">
      <h1>{t.catalogue.title}</h1>
      <p>{t.catalogue.subtitle}</p>

      <SearchBar language={language} onSearch={setSearchQuery} />

      <CategoryFilter
        language={language}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {loading && <p>{t.states.loading}</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p>{t.catalogue.noProducts}</p>
      )}
      {!loading && !error && products.length > 0 && (
        <ProductList products={products} language={language} />
      )}
    </div>
  )
}

export default CataloguePage