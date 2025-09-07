import { ListLinks } from '../modules/dashboard/components/ListLinks'
import LinkForm from '../modules/dashboard/components/LinkForm'
import { useUser } from '../modules/dashboard/hooks/useUser'
import { useEffect } from 'react'
import { Sidebar } from '../modules/dashboard/components/Sidebar'
import { useFilter } from '../modules/dashboard/hooks/useFilter'
import { FilterBar } from '../modules/dashboard/components/FilterBar'
import { Topbar } from 'modules/dashboard/components/Topbar'

export function Dashboard() {
  const { user } = useUser()
  const { changeTerm, result } = useFilter()

  useEffect(() => {
    document.title = 'Quick Shortener | Dashboard'
  }, [])

  return (
    <main className="bg-low-opacity-pattern h-screen overflow-y-scroll flex">
      <Sidebar avatar={user?.avatar} name={user?.name} />
      <section className="w-full p-6 overflow-y-scroll">
        <Topbar avatar={user?.avatar} name={user?.name} />
        <FilterBar action={changeTerm} />
        <div className="w-full flex flex-col">
          <LinkForm />
        </div>
        <ListLinks linksFiltered={result} />
      </section>
    </main>
  )
}
