import { z } from 'zod'
import { provider, user } from './features/auth/user.model'
import { link } from './features/link/link.model'
import { Profile } from 'passport'

export interface AuthenticationTokens {
  access_token: string
  refresh_token: string
}

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends Profile {}
  }
}
export type AccessToken = {
  access_token: string
}

export type RefreshToken = {
  refresh_token: string
}

type User = z.infer<typeof user>
type UserJWT = Pick<User, 'id' | 'email' | 'name' | 'created_at'>

type Provider = z.infer<typeof provider>
type Link = z.infer<typeof link>

export type EliminationType = {
  deleted: boolean
}

export type Cookies = {
  access: string
  refresh: string
}

export interface Repository<T> {
  database: T
  findUserById({ id }: Required<Pick<User, 'id'>>): Promise<User>
  findUserByEmail({ email }: Pick<User, 'email'>): Promise<User | null>
  createUser({
    provider: { provider_name },
    name,
    avatar,
    email
  }: User): Promise<User>
  findEveryLinksByUser({ id }: Required<Pick<User, 'id'>>): Promise<Link[]>
  findLinkbyShort({ short }: Pick<Link, 'short'>): Promise<Link | null>
  createLink(
    { long, short }: Pick<Link, 'long' | 'short' | 'expires_at'>,
    { id }: Required<Pick<User, 'id'>>
  ): Promise<Link>
  editLink({ id, long }: Required<Pick<Link, 'id' | 'long'>>): Promise<Link>
  increaseClickByLink({ id }: Required<Pick<Link, 'id'>>): Promise<void>
  deleteLinkById({ id }: Required<Pick<Link, 'id'>>): Promise<EliminationType>
}
