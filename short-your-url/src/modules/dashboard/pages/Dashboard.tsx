import { HeaderProfile } from '../components/HeaderProfile'
import { ListLinks } from '../components/ListLinks'
import LinkForm from '../components/LinkForm'
import { createPortal } from 'react-dom'
import { Toast } from '../components/Toast'
import { useToast } from '../hooks/useToast'
import { useUser } from '../hooks/useUser'
import { useEffect } from 'react'

export function Dashboard() {
  const { user } = useUser()
  const { toast, setToast } = useToast()

  useEffect(() => {
    document.title = document.title + ' | Dashboard'
  }, [])

  return (
    <main className="bg-low-opacity-pattern h-screen  overflow-y-scroll">
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
      <section className="h-full xs:max-w-[90%] md:max-w-[70%] xl:max-w-[50%] 2xl:max-w-[40%] min-[2560px]:max-w-[25%]  mx-2 xs:mx-auto py-5 flex flex-col">
        <div className="w-full flex flex-col">
          {user && <HeaderProfile user={user} />}
          <LinkForm />
        </div>
        <ListLinks />
      </section>
    </main>
  )
}
