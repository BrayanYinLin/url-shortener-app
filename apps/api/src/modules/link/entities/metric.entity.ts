import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Link } from './link.entity'

@Entity()
class Metric {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => Link, (link) => link.metrics)
  @JoinColumn({ name: 'link_id' })
  link!: Link

  @Column({ type: 'varchar', nullable: true })
  userAgent: string | null = null

  @Column({ type: 'varchar', nullable: true })
  referer: string | null = null

  @Column({ type: 'timestamptz', nullable: false })
  accessDate!: Date
}

export { Metric }
