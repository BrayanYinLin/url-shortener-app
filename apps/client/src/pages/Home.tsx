import { GitHubIcon } from '@/components/Icons'
import { authentication } from '@auth/services/auth.service'
import { useUserStore } from '@/lib/stores'
import { Link, useNavigate } from 'react-router'
import { Trans, useTranslation } from 'react-i18next'

export function Home() {
  const { t } = useTranslation()
  const { setUser } = useUserStore()
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
    <main className="bg-pattern bg-repeat min-h-screen flex flex-col">
      <nav className="bg-white px-6 py-2.5 flex items-center justify-between">
        <h1 className="font-bold text-xs lg:text-base text-turquoise-blue-600">
          Quick Shortener
        </h1>
        <Link
          to="/signin"
          className="px-3.5 py-2 border text-shark-950 border-shark-950 hover:border-turquoise-blue-500 hover:text-turquoise-blue-500 rounded-sm transition-all duration-200 text-xs lg:text-base"
        >
          {t('signin')}
        </Link>
      </nav>
      <section className="flex flex-col items-center gap-3 lg:gap-6 my-12">
        <h1 className="inline-block w-max font-extrabold text-3xl lg:text-6xl my-2">
          <Trans i18nKey="catchPhrase" components={{ span: <span /> }} />
        </h1>
        <p className="w-4/5 lg:w-1/2 text-center font-medium text-xs lg:text-base">
          {t('productDescription')}
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            className="cursor-pointer px-5 py-2 bg-turquoise-blue-500 text-white rounded-sm transition-all duration-200 hover:bg-turquoise-blue-400 hover:shadow-turquoise-hover shadow-turquoise-simple font-bold text-base lg:text-lg"
            onClick={handleStart}
          >
            {t('getStarted')}
          </button>
          <Link
            to="https://github.com/BrayanYinLin/url-shortener-app"
            className="flex gap-2 px-5 py-2 rounded-sm border border-shark-950"
          >
            <GitHubIcon /> {t('starOnGithub')}
          </Link>
        </div>

        <img
          src="/world-internet-ilustration.webp"
          alt="world ilustration"
          className="w-72"
        />
      </section>
    </main>
  )
}
