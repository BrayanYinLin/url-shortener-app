import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Provider } from './provider.entity'

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
