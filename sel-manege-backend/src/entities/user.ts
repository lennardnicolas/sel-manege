import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm'
import { Auth } from './auth.js'
import { News } from './news.js'

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar', length: 255 })
    firstname!: string

    @Column({ type: 'varchar', length: 255 })
    lastname!: string

    @OneToOne(() => Auth, (auth) => auth.user, { cascade: true })
    auth!: Auth

    @OneToMany(() => News, (news) => news.user)
    newsList!: News[]
}
