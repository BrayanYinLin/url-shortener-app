type ProfileProps = {
  url?: string
  name?: string
}

export function Avatar({ url, name }: ProfileProps) {
  return (
    <img
      src={url ?? 'https://placehold.co/65x65?text=no+photo'}
      alt={name ?? ''}
      width={65}
      className="relative inline-block !rounded-md  object-cover object-center"
    />
  )
}
