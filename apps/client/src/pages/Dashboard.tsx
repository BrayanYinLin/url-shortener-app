import { ListLinks } from '../modules/dashboard/components/ListLinks'
import LinkForm from '../modules/dashboard/components/LinkForm'
import { createPortal } from 'react-dom'
import { Toast } from '../modules/dashboard/components/Toast'
import { useToast } from '../modules/dashboard/hooks/useToast'
import { useUser } from '../modules/dashboard/hooks/useUser'
import { useEffect } from 'react'
import { Sidebar } from '../modules/dashboard/components/Sidebar'
import { useFilter } from '../modules/dashboard/hooks/useFilter'
import { FilterBar } from '../modules/dashboard/components/FilterBar'

export function Dashboard() {
  const { user } = useUser()
  const { toast, setToast } = useToast()
  const { changeTerm, linksFiltered } = useFilter()

  useEffect(() => {
    document.title = document.title + ' | Dashboard'
  }, [])

  return (
    <main className="bg-low-opacity-pattern h-screen overflow-y-scroll flex">
      {toast &&
        createPortal(
          <Toast
            title={toast.title}
            message={toast.message}
            isError={toast.isError}
            toggle={() => setToast(null)}
          />,
          document.body
        )}
      <Sidebar avatar={user?.avatar} name={user?.name} />
      <section className="w-full p-6 overflow-y-scroll">
        <FilterBar action={changeTerm} />
        <div className="w-full flex flex-col">
          <LinkForm />
        </div>
        <ListLinks linksFiltered={linksFiltered} />
      </section>
    </main>
  )
}
