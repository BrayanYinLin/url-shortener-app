import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Home } from '@pages/Home'
import { SignIn } from '@pages/SignIn'
import { Dashboard } from '@pages/Dashboard'
import { NotFound } from '@pages/NotFound'
import { PAGES } from '@/config/constants'
import '@providers/i18n'
import '../index.css'

const { dashboard, signin, notFound } = PAGES

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route>
        <Route index element={<Home />} />
        <Route path={dashboard} element={<Dashboard />} />
        <Route path={signin} element={<SignIn />} />
        <Route path={notFound} element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
