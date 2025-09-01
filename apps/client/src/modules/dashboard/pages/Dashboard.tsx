import { ListLinks } from '../components/ListLinks'
import LinkForm from '../components/LinkForm'
import { createPortal } from 'react-dom'
import { Toast } from '../components/Toast'
import { useToast } from '../hooks/useToast'
import { useUser } from '../hooks/useUser'
import { useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { useFilter } from '../hooks/useFilter'
import { FilterBar } from '../components/FilterBar'

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
