import { GhostIcon } from '@/components/Icons'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export function NotFound() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const goHome = () => navigate('/', { replace: true })

  return (
    <main className="bg-pattern min-h-screen flex flex-col justify-center items-center">
      <GhostIcon />
      <h2 className="bg-white font-semibold text-center">{t('Not found')}</h2>
      <button
        type="button"
        className="px-4 py-2 bg-black-hue rounded-md font-semibold text-white mt-4"
        onClick={goHome}
      >
        {t('Back home')}
      </button>
    </main>
  )
}
