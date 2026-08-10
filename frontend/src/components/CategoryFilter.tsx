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

function CategoryFilter({
  language,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const t = getTranslations(language)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    let cancelled = false

    categoryService
      .getAll()
      .then((data) => {
        if (!cancelled) {
          setCategories(data)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCategories([])
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (categories.length === 0) {
    return null
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
