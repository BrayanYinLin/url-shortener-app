import { GitHubIcon, GoogleIcon } from '@/components/Icons'
import { ENDPOINTS } from '@/lib/definitions'
import { useTranslation } from 'react-i18next'

export const GoogleSignInButton = () => {
  const { t } = useTranslation()
  const handleSignIn = async () => {
    window.location.href = `${ENDPOINTS.AUTH}google`
  }

  return (
    <button
      type="button"
      className="cursor-pointer flex gap-2 font-semibold px-4 py-2 border-[1px] bg-white border-[#808080] my-2 rounded-md"
      onClick={handleSignIn}
    >
      <GoogleIcon />
      {t('continueWithGoogle')}
    </button>
  )
}

export const GithubSignInButton = () => {
  const { t } = useTranslation()
  const handleGithubSignIn = async () => {
    window.location.href = `${ENDPOINTS.AUTH}github`
  }

  return (
    <button
      type="button"
      className="cursor-pointer flex gap-2 font-semibold px-4 py-2 border-[1px] bg-white border-[#808080] my-2 rounded-md"
      onClick={handleGithubSignIn}
    >
      <GitHubIcon />
      {t('continueWithGitHub')}
    </button>
  )
}
