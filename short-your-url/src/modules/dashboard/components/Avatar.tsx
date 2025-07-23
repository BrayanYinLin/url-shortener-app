type ProfileProps = {
  url: string
  name: string
}

export function Avatar({ url, name }: ProfileProps) {
  return (
    <img
      src={url ?? ''}
      alt={name}
      width={35}
      className="relative inline-block h-9 w-9 !rounded-md  object-cover object-center"
    />
  )
}
