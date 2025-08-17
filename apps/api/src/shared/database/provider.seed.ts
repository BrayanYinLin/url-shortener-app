import { Provider } from '@auth/entities/provider.entity'
import { AppDataSource } from './data-source'
import { PROVIDERS } from '@root/common/definitions'

const createProviders = async () => {
  const repository = AppDataSource.getRepository(Provider)

  for (const provider of Object.values(PROVIDERS)) {
    const existing = await repository.findOne({
      where: {
        name: provider
      }
    })

    if (!existing) {
      await repository.save({
        name: provider
      })
    }
  }
}

export { createProviders }
