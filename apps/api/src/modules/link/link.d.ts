import { CreateLinkDto, ResponseLinkDto } from './entities/dtos/link.dto'
import { Link } from './entities/link.entity'

type AuthContext = { token: string }
type CreateLinkInput = { linkDto: CreateLinkDto } & AuthContext
type EditLinkInput = { id: string; linkDto: CreateLinkDto } & AuthContext
type ShortParams = { short: string }
type DeleteParams = { id: string }

export interface LinkService {
  findLinksByUser({ token }: AuthContext): Promise<Link[]>
  create({ linkDto, token }: CreateLinkInput): Promise<Link>
  edit({ id, linkDto, token }: EditLinkInput): Promise<Link>
  findByShort({ short }: ShortParams): Promise<ResponseLinkDto>
  increaseClicksCounter({ short }: ShortParams): Promise<void>
  delete({ id }: DeleteParams): Promise<boolean>
}
