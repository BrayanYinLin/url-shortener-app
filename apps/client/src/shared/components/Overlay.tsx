export function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="overlay w-full min-h-screen fixed z-50 top-0 left-0 bg-slate-950 bg-opacity-40 grid place-content-center">
      {children}
    </div>
  )
}
