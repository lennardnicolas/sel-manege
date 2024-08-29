import { DataSource } from 'typeorm'

export const dataSourceDev = new DataSource({
    type: 'mariadb',
    host: 'localhost',
    port: 1026,
    username: 'root',
    password: '123test',
    database: 'selmanege',
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
    synchronize: false,
})
