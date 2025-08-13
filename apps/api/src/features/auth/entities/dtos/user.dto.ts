import { z } from 'zod'

const userID = z.string().uuid('Id must be an UUID')
const userEmail = z.string().email('Email is required')

const createUserDTO = z.object({
  name: z.string(),
  email: userEmail,
  avatar: z.string().url(),
  provider: z.object({
    name: z.string()
  })
})

type CreateUserDTO = z.infer<typeof createUserDTO>

export { userID, userEmail, createUserDTO, CreateUserDTO }
