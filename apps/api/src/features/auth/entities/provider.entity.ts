import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
class Provider {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 500, nullable: false })
  name!: string

  @OneToMany(() => User, (user) => user.provider, { eager: false })
  users?: User[]
}

export { Provider }
