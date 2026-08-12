import { useEffect, useState } from 'react'
import { categoryService } from '../services/categoryService'
import type { Category } from '../types/category'
import type { SupportedLanguage } from '../i18n'
import { getTranslations } from '../i18n'

interface CategoryFilterProps {
  language: SupportedLanguage
  selectedCategory: string | null
  onSelectCategory: (categorySlug: string | null) => void
}

type CategoryLoadState = 'loading' | 'loaded' | 'error'

function CategoryFilter({
  language,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const t = getTranslations(language)

  const [categories, setCategories] = useState<Category[]>([])
  const [loadState, setLoadState] =
    useState<CategoryLoadState>('loading')

  useEffect(() => {
    let cancelled = false

    const loadCategories = async () => {
      try {
        setLoadState('loading')

        const data = await categoryService.getAll()

        console.log('[CategoryFilter] Catégories reçues :', data)

        if (cancelled) {
          return
        }

        setCategories(data)
        setLoadState('loaded')
      } catch (error) {
        console.error(
          '[CategoryFilter] Erreur lors du chargement des catégories :',
          error
        )

        if (cancelled) {
          return
        }

        setCategories([])
        setLoadState('error')
      }
    }

    void loadCategories()

    return () => {
      cancelled = true
    }
  }, [])

  if (loadState === 'loading') {
    return (
      <p className="category-filter-status">
        {t.states.loading}
      </p>
    )
  }

  if (loadState === 'error') {
    return (
      <p className="category-filter-status error">
        {t.states.apiError}
      </p>
    )
  }

  if (categories.length === 0) {
    return (
      <p className="category-filter-status">
        {t.category.noCategories}
      </p>
    )
  }

  return (
    <div className="category-filter">
      <button
        type="button"
        className={selectedCategory === null ? 'active' : ''}
        onClick={() => onSelectCategory(null)}
      >
        {t.catalogue.allProducts}
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={
            selectedCategory === category.slug ? 'active' : ''
          }
          onClick={() => onSelectCategory(category.slug)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter