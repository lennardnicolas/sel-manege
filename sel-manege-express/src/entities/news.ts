import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './user.js'

@Entity('news')
export class News {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: 255 })
    title!: string

    @Column({ type: 'date', nullable: true })
    date!: Date | null

    @Column({ type: 'time', nullable: true })
    time!: string | null

    @Column({ type: 'varchar', length: 255, nullable: true })
    location!: string | null

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    price!: number | null

    @Column({ type: 'text' })
    description!: string

    @Column({ type: 'int' })
    userId!: number

    @ManyToOne(() => User, (User) => User.id)
    @JoinColumn()
    user!: User
}
