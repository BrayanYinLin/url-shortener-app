import { MagnifiyingGlassIcon } from '@/components/Icons'
import { useTranslationStore } from '@/lib/stores'
import { useRef } from 'react'

type Props = {
  action: ({ term }: { term: string }) => void
}

export function FilterBar({ action }: Props) {
  const { t } = useTranslationStore()
  const input = useRef<HTMLInputElement | null>(null)

  return (
    <section className="sticky top-0 mb-4 bg-white flex items-center py-1 border border-slate-300 shadow-sm rounded-md">
      <input
        type="text"
        name="filter"
        className="flex-1 px-1 focus:outline-none"
        placeholder={t('Search Placeholder')}
        ref={input}
      />
      <button
        type="button"
        aria-label="search links"
        className="w-11 pr-3 focus:outline-none"
        onClick={() => action({ term: input.current?.value || '' })}
      >
        <MagnifiyingGlassIcon />
      </button>
    </section>
  )
}
