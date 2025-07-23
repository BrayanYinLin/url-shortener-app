import { useNavigate } from 'react-router'
import { logoutUser } from '../lib/services'
import { useTranslationStore } from '@/lib/stores'

export function LogoutButton() {
  const { t } = useTranslationStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    logoutUser().then((success) => navigate('/', { replace: success }))
  }

  return (
    <button type="button" className="text-[#d3102f]" onClick={handleLogout}>
      {t('Logout')}
    </button>
  )
}
