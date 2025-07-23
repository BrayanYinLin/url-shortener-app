const createError = ({ name }: { name: string }) => {
  return class CustomError extends Error {
    constructor(message: string) {
      super(message)
      this.name = name
    }
  }
}

export const GoogleAuthenticationError = createError({
  name: 'GoogleAuthenticationError'
})
export const UserNotAuthorized = createError({ name: 'UserNotAuthorized' })
export const TokenNotRefreshed = createError({ name: 'TokenNotRefreshed' })
export const LinkError = createError({ name: 'LinkError' })
export const AuthenticationError = createError({ name: 'AuthenticationError' })
export const UnauthorizedAction = createError({ name: 'UnauthorizedAction' })
export const UnexpectedError = createError({ name: 'UnexpectedError' })
