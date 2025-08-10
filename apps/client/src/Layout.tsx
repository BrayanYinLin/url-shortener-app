// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './modules/home/pages/Home'
import SignIn from './modules/auth/pages/SignIn'
import CallbackGithubPage from './modules/auth/pages/CallbackGithub'
import './index.css'
import { Dashboard } from './modules/dashboard/pages/Dashboard'
import CallbackGoogle from 'modules/auth/pages/CallbackGoogle'
import { Redirect } from 'modules/link/pages/Redirect'
import { NotFound } from 'modules/link/pages/NotFound'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="not-found" element={<NotFound />} />
        <Route path=":short" element={<Redirect />} />
      </Route>

      <Route path="/auth/github/callback" element={<CallbackGithubPage />} />
      <Route path="/auth/google/callback" element={<CallbackGoogle />} />
    </Routes>
  </BrowserRouter>
)
