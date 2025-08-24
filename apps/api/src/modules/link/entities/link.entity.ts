import { User } from '@auth/entities/user.entity'
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Metric } from './metric.entity'

@Entity()
class Link {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar' })
  long!: string

  @Column({ type: 'varchar', unique: true })
  short!: string

  @Column({ type: 'int', default: 0 })
  clicks!: number

  @ManyToOne(() => User, (user) => user.links)
  user!: User

  @OneToMany(() => Metric, (metric) => metric.link)
  metrics!: Metric[]

  @Column({
    type: 'timestamp with time zone',
    nullable: true
  })
  expiresAt?: Date | null

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

export { Link }
