import {
  ArrowCornerIcon,
  GitHubIcon,
  LinkedInIcon,
  ShortYourURLIcon
} from '@/components/Icons'
import { authentication } from '../lib/services'
import { useTranslationStore, useUserStore } from '@/lib/stores'
import { useNavigate } from 'react-router'
import { LanguageButton } from '@/components/LanguageButton'

export default function Home() {
  const { setUser } = useUserStore()
  const { t } = useTranslationStore()
  const navigate = useNavigate()

  const handleStart = () => {
    authentication()
      .then((user) => {
        setUser(user)
        navigate('/dashboard')
      })
      .catch((e) => {
        console.error(e)
        navigate('/signin')
      })
  }

  return (
    <main className="bg-pattern bg-repeat min-h-screen flex flex-col items-center justify-center">
      <div className="fixed top-3 right-3">
        <LanguageButton />
      </div>
      <ShortYourURLIcon />

      <h1 className="font-bold text-4xl my-2">{t('Main Title')}</h1>

      <section className="m-4 flex flex-col xs:flex-row gap-2">
        <button
          type="button"
          className="rounded-md bg-[#222] text-white px-6 py-2 text-xl font-semibold"
          onClick={handleStart}
        >
          {t('Get Started')}
        </button>
        <a
          href="https://github.com/BrayanYinLin/best-shortener"
          type="button"
          className="bg-white-hue border border-slate-300 shadow-sm rounded-md px-6 py-2 flex items-center gap-2 text-xl font-semibold"
        >
          <GitHubIcon /> <span>{t('Star on Github')}</span>
        </a>
      </section>

      <footer className="fixed bottom-6 left-6">
        <a
          href="https://www.linkedin.com/in/brayan-yin-lin-4b9a6a2ba/"
          className="flex gap-2 items-center"
          target="_blank"
          rel="noopener"
        >
          <LinkedInIcon /> Brayan Yin Lin <ArrowCornerIcon />
        </a>
      </footer>
    </main>
  )
}
