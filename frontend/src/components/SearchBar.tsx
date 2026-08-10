import { useState } from 'react'
import type { SupportedLanguage } from '../i18n'
import { getTranslations } from '../i18n'

interface SearchBarProps {
  language: SupportedLanguage
  onSearch: (query: string) => void
}

function SearchBar({ language, onSearch }: SearchBarProps) {
  const t = getTranslations(language)
  const [query, setQuery] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSearch(query)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t.common.searchPlaceholder}
      />
      <button type="submit">{t.common.search}</button>
    </form>
  )
}

export default SearchBar
