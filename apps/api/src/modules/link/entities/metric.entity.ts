import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class Metric {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar' })
  ipAddress!: string

  @Column({ type: 'varchar' })
  userAgent!: string

  @Column({ type: 'varchar' })
  referer!: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date
}

export { Metric }
