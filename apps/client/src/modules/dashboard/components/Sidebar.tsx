import { LanguageIcon } from '@/components/Icons'
import { Avatar } from './Avatar'
import { logout } from '@auth/services/logout.service'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

export interface SidebarProps {
  name?: string
  avatar?: string
}

export function Sidebar({ avatar, name }: SidebarProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    logout().then((success) => navigate('/', { replace: success }))
  }

  return (
    <div className="relative flex h-full w-full max-w-[16rem] flex-col justify-between bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
      <div className="flex flex-col items-center p-4 mb-2">
        <Avatar url={avatar} name={name} />
        <h5 className="inline-block text-center font-sans text-xl antialiased font-bold leading-snug tracking-normal text-turquoise-blue-800">
          {name}'s <br /> Dashboard
        </h5>
      </div>
      <nav className="flex flex-col items-center gap-1 font-sans text-base font-normal text-blue-gray-700">
        <button className="cursor-pointer max-w-[180px] flex justify-center items-center w-full px-3 py-1 text-shark-950 border border-shark-950 rounded-sm">
          <div className="grid mr-4 place-items-center">
            <LanguageIcon />
          </div>
          {t('lang')}
        </button>
        <button
          onClick={handleLogout}
          className="cursor-pointer max-w-[180px] flex justify-center items-center w-full px-3 py-1 text-[#E62727] border border-[#E62727] rounded-sm"
        >
          {t('logout')}
        </button>
      </nav>
    </div>
  )
}
