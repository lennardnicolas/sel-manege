import { DataSource } from 'typeorm'

const dbHost: string = process.env.SEL_MANEGE_DB_HOST ? process.env.SEL_MANEGE_DB_HOST : ''
const dbPort: number = process.env.SEL_MANEGE_DB_PORT ? parseInt(process.env.SEL_MANEGE_DB_PORT, 10) : 0
const dbPass: string = process.env.SEL_MANEGE_DB_PASS ? process.env.SEL_MANEGE_DB_PASS : ''
const profil: string = process.env.SEL_MANEGE_PROFIL ? process.env.SEL_MANEGE_PROFIL : 'prod'

let entitiesPath: string[] = []
let migrationsPath: string[] = []

switch (profil) {
    case 'prod':
        entitiesPath = ['dist/entities/**/*.js']
        migrationsPath = ['dist/migrations/**/*.js']
        break
    case 'dev':
        entitiesPath = ['src/entities/**/*.ts']
        migrationsPath = ['src/migrations/**/*.ts']
        break
}

export const dataSource = new DataSource({
    type: 'mariadb',
    host: dbHost,
    port: dbPort,
    username: 'root',
    password: dbPass,
    database: 'selmanege',
    entities: entitiesPath,
    migrations: migrationsPath,
    synchronize: false,
})
