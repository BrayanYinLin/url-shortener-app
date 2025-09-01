// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './modules/home/pages/Home'
import SignIn from './modules/auth/pages/SignIn'
import CallbackGithubPage from './modules/auth/pages/CallbackGithub'
import './index.css'
import { Dashboard } from './modules/dashboard/pages/Dashboard'
import CallbackGoogle from 'modules/auth/pages/CallbackGoogle'
import { NotFound } from 'modules/link/pages/NotFound'
import { PAGES } from '@/config/constants'

const { dashboard, signin, notFound, googleCallback, githubCallback } = PAGES

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route>
        <Route index element={<Home />} />
        <Route path={dashboard} element={<Dashboard />} />
        <Route path={signin} element={<SignIn />} />
        <Route path={notFound} element={<NotFound />} />
        {/* <Route path=":short" element={<Redirect />} /> */}
      </Route>

      <Route path={githubCallback} element={<CallbackGithubPage />} />
      <Route path={googleCallback} element={<CallbackGoogle />} />
    </Routes>
  </BrowserRouter>
)
