import { Popover } from '@/components/Popover'
import { Avatar } from './Avatar'
import { LanguageIcon, LogoutIcon } from '@/components/Icons'
import { useTranslation } from 'react-i18next'
import { logout } from '@auth/services/logout.service'
import { useNavigate } from 'react-router'

export interface TopbarProps {
  name?: string
  avatar?: string
}

export function Topbar({ name, avatar }: TopbarProps) {
  const { i18n } = useTranslation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    logout().then((success) => navigate('/', { replace: success }))
  }

  const changeToEs = () => {
    i18n.changeLanguage('es')
    localStorage.setItem('lang-preference', 'es')
  }

  const changeToEn = () => {
    i18n.changeLanguage('en')
    localStorage.setItem('lang-preference', 'en')
  }

  return (
    <header className="lg:hidden flex justify-between">
      <div className="flex gap-4 items-center">
        <Avatar url={avatar} name={name} size={40} />
        <h3 className="text-xl font-bold text-turquoise-blue-950">
          {name}'s dashboard
        </h3>
      </div>

      <nav className="flex gap-2 font-sans text-base font-normal text-blue-gray-700">
        <Popover
          trigger={
            <button className="cursor-pointer max-w-[180px] flex justify-center items-center w-full px-3 py-1 border border-slate-300 shadow-sm rounded-md p-2 focus:outline-none">
              <LanguageIcon />
            </button>
          }
        >
          <button
            onClick={changeToEs}
            type="button"
            className="cursor-pointer hover:bg-slate-200 px-1 rounded"
          >
            (es) Español
          </button>
          <button
            onClick={changeToEn}
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
    </header>
  )
}
