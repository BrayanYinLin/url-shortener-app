type Environment = 'dev' | 'pro'
type Configs = {
  environment: {
    [key in Environment]: {
      auth: string
      link: string
      origin: string
    }
  }
}

const configs: Configs = {
  environment: {
    dev: {
      auth: 'http://localhost:5373/api/auth/',
      link: 'http://localhost:5373/api/link/',
      origin: 'http://localhost:5173/'
    },
    pro: {
      auth: 'https://cool-shortener-production.up.railway.app/api/auth/',
      link: 'https://cool-shortener-production.up.railway.app/api/link/',
      origin: 'https://best-shorter.vercel.app/'
    }
  }
}

const setEnvironment = ({ env }: { env: Environment }) => {
  const devOrigin = 'http://localhost:5173'
  const { environment } = configs

  if (window.location.origin === devOrigin) {
    env = 'dev'
  }

  return {
    AUTH: environment[env].auth,
    LINK: environment[env].link,
    ORIGIN: environment[env].origin
  }
}

const { AUTH, LINK, ORIGIN } = setEnvironment({ env: 'pro' })

export const ENDPOINTS = {
  AUTH: AUTH,
  LINK: LINK
}

export const WEBSITE = ORIGIN
