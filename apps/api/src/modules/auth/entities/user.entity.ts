import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Provider } from './provider.entity'
import { Link } from '@root/modules/link/entities/link.entity'

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 500, nullable: false })
  name!: string

  @Column({ type: 'varchar', length: 500, nullable: false })
  email!: string

  @Column({ type: 'varchar', length: 500, nullable: false })
  avatar!: string

  @ManyToOne(() => Provider)
  provider!: Provider

  @OneToMany(() => Link, (link) => link.user)
  links!: Link[]

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt?: Date

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt?: Date
}

export { User }
