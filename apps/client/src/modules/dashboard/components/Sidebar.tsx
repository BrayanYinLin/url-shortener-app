import { LanguageIcon, LogoutIcon } from '@/components/Icons'
import { Avatar } from './Avatar'
import { logout } from '@auth/services/logout.service'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Popover } from '@/components/Popover'

export interface SidebarProps {
  name?: string
  avatar?: string
}

export function Sidebar({ avatar, name }: SidebarProps) {
  const { i18n } = useTranslation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    logout().then((success) => navigate('/', { replace: success }))
  }

  return (
    <div className="hidden lg:flex relative h-full w-full max-w-[16rem] flex-col justify-between bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
      <div className="flex flex-col items-center p-4 mb-2">
        <Avatar url={avatar} name={name} />
        <h5 className="inline-block text-center font-sans text-xl antialiased font-bold leading-snug tracking-normal text-turquoise-blue-800">
          {name}'s <br /> Dashboard
        </h5>
      </div>
      <nav className="mx-auto flex gap-5 font-sans text-base font-normal text-blue-gray-700">
        <Popover
          trigger={
            <button className="cursor-pointer max-w-[180px] flex justify-center items-center w-full px-3 py-1 border border-slate-300 shadow-sm rounded-md p-2 focus:outline-none">
              <LanguageIcon />
            </button>
          }
        >
          <button
            onClick={() => i18n.changeLanguage('es')}
            type="button"
            className="cursor-pointer hover:bg-slate-200 px-1 rounded"
          >
            (es) Español
          </button>
          <button
            onClick={() => i18n.changeLanguage('en')}
            type="button"
            className="cursor-pointer hover:bg-slate-200 px-1 rounded"
          >
            (en) English
          </button>
        </Popover>
        <button
          onClick={handleLogout}
          className="cursor-pointer px-3 py-1 text-[#E62727] border border-[#E62727]/30 shadow-sm rounded-md"
        >
          <LogoutIcon />
        </button>
      </nav>
    </div>
  )
}
