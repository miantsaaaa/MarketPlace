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
  const [loadState, setLoadState] = useState<CategoryLoadState>('loading')

  useEffect(() => {
    let cancelled = false

    // Réinitialisation intentionnelle de l'état avant de lancer le fetch :
    // pattern standard pour un effet de data-fetching.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoadState('loading')

    categoryService
      .getAll()
      .then((data) => {
        if (!cancelled) {
          setCategories(data)
          setLoadState('loaded')
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCategories([])
          setLoadState('error')
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (loadState === 'loading') {
    return <p className="category-filter-status">{t.states.loading}</p>
  }

  if (loadState === 'error') {
    return <p className="category-filter-status error">{t.states.apiError}</p>
  }

  if (categories.length === 0) {
    return <p className="category-filter-status">{t.category.noCategories}</p>
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
          className={selectedCategory === category.slug ? 'active' : ''}
          onClick={() => onSelectCategory(category.slug)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter