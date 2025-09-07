import { findLanguagePreference } from '@/lib/utils'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      catchPhrase:
        'Simplify your <span className="text-turquoise-blue-600">links</span>.<br/> Expand your <span className="text-turquoise-blue-600">reach</span>.',
      signin: 'Sign in',
      productDescription:
        'Shorten your links quickly and securely. Share, manage, and analyze with a simple yet powerful tool.',
      starOnGithub: '¡Star on Github!',
      getStarted: 'Get started',
      continueWithGoogle: 'Continue with Google',
      continueWithGitHub: 'Continue with GitHub',
      logout: 'Logout',
      lang: 'Lang',
      newLink: 'New Link',
      shorten: 'Shorten',
      search: 'Search',
      expires: 'Expires after'
    }
  },
  es: {
    translation: {
      catchPhrase:
        'Simplifica tus <span className="text-turquoise-blue-600">enlaces</span>.<br/> Amplía tu <span className="text-turquoise-blue-600">alcance</span>.',
      signin: 'Iniciar sesión',
      productDescription:
        'Acorta tus enlaces de forma rápida y segura. Comparte, gestiona y analiza con una herramienta sencilla pero potente.',
      starOnGithub: '¡Califícame en Github!',
      getStarted: 'Empezar',
      continueWithGoogle: 'Continuar con Google',
      continueWithGitHub: 'Continuar con GitHub',
      logout: 'Cerrar sesión',
      lang: 'Len',
      newLink: 'Nuevo enlace',
      shorten: 'Acortar',
      search: 'Buscar',
      expires: 'Vence el'
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: findLanguagePreference(),
  interpolation: {
    escapeValue: false
  }
})

export { i18n }
