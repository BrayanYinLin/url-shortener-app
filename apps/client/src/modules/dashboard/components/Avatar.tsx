type ProfileProps = {
  url?: string
  name?: string
  size: number
}

export function Avatar({ url, name, size = 65 }: ProfileProps) {
  return (
    <img
      src={url ?? 'https://placehold.co/65x65?text=no+photo'}
      alt={name ?? ''}
      width={size}
      className="relative inline-block !rounded-md  object-cover object-center"
    />
  )
}
