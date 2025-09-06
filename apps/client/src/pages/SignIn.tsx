import {
  GithubSignInButton,
  GoogleSignInButton
} from '../modules/auth/components/SignInButtons'

export function SignIn() {
  return (
    <main className="bg-pattern bg-repeat min-h-screen flex flex-col items-center justify-center">
      <img
        src="/world-internet-ilustration.webp"
        alt="world ilustration"
        className="w-50"
      />
      <section className="m-4 flex flex-col">
        <GoogleSignInButton />
        <GithubSignInButton />
      </section>
    </main>
  )
}
