export type Link = {
  long: string
  short: string
  clicks: number
  id?: string | undefined
  created_at?: string | undefined
  expires_at?: string | undefined
}

export type User = {
  id?: string
  name: string
  email: string
  avatar: string
  provider: {
    provider_id?: string
    provider_name: string
  }
  created_at?: string
  index?: number
}
