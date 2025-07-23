import { ShortYourURLIcon } from '@/components/Icons'
import {
  GithubSignInButton,
  GoogleSignInButton
} from '../components/SignInButtons'

export default function SignIn() {
  return (
    <main className="bg-pattern bg-repeat min-h-screen flex flex-col items-center justify-center">
      <ShortYourURLIcon />
      <section className="m-4 flex flex-col">
        <GoogleSignInButton />
        <GithubSignInButton />
      </section>
    </main>
  )
}
