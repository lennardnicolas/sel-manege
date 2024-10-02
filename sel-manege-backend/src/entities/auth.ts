import { Entity, PrimaryGeneratedColumn, Column, Index, OneToOne, JoinColumn } from 'typeorm'
import { User } from './user.js'

@Entity('auth')
@Index('idx_email_password', ['email', 'password'])
export class Auth {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: 255, unique: true })
    email!: string

    @Column({ type: 'varchar', length: 255 })
    password!: string

    @Column({ type: 'int' })
    userId!: number

    @OneToOne(() => User, (User) => User.id, { onDelete: 'CASCADE' })
    @JoinColumn()
    user!: User
}
