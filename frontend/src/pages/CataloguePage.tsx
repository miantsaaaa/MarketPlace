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
  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await productService.getFiltered({
          search: searchQuery.trim() || undefined,
          category: selectedCategory || undefined,
        })

        console.log('[CataloguePage] Produits reçus :', data)

        if (cancelled) {
          return
        }

        setProducts(data.content)
      } catch (error) {
        console.error(
          '[CataloguePage] Erreur lors du chargement des produits :',
          error
        )

        if (cancelled) {
          return
        }

        setProducts([])
        setError(t.states.apiError)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadProducts()

    return () => {
      cancelled = true
    }
  }, [
    searchQuery,
    selectedCategory,
    t.states.apiError,
  ])

  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="catalogue-page">
      <h1>{t.catalogue.title}</h1>

      <p>{t.catalogue.subtitle}</p>

      <SearchBar
        language={language}
        onSearch={handleSearch}
      />

      <CategoryFilter
        language={language}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />

      {loading && (
        <p className="catalogue-status">
          {t.states.loading}
        </p>
      )}

      {!loading && error && (
        <p className="catalogue-status error">
          {error}
        </p>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="catalogue-status">
          {t.catalogue.noProducts}
        </p>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductList
          products={products}
          language={language}
        />
      )}
    </div>
  )
}

export default CataloguePage