import mariadb from 'mariadb'
export class Db {
    private static instance: Db

    private conn: mariadb.PoolConnection | null = null

    private constructor() {}

    public static getInstance(): Db {
        if (!Db.instance) {
            Db.instance = new Db()
        }

        return Db.instance
    }

    private async getConn(): Promise<mariadb.PoolConnection> {
        if (!this.conn) {
            const dbHost: string = process.env.SEL_MANEGE_DB_HOST ? process.env.SEL_MANEGE_DB_HOST : ''
            const dbPort: number = process.env.SEL_MANEGE_DB_PORT ? parseInt(process.env.SEL_MANEGE_DB_PORT, 10) : 0
            const dbPass: string = process.env.SEL_MANEGE_DB_PASS ? process.env.SEL_MANEGE_DB_PASS : ''

            console.log('Db host : ' + dbHost)
            console.log('Db port : ' + dbPort.toString())
            console.log('Db pass : ' + dbPass)
            console.log('Trying to connect to db...')

            const pool = mariadb.createPool({
                host: dbHost,
                port: dbPort,
                user: 'root',
                password: dbPass,
                connectionLimit: 1,
            })

            // Throw error if it fail
            this.conn = await pool.getConnection()

            console.log('DB connexion successful')
        }

        return this.conn
    }

    async execute(query: string, values?: any): Promise<any> {
        const conn: mariadb.PoolConnection = await this.getConn()

        // Throw error if it fail
        return await conn.execute(query, values)
    }

    async dbInit() {
        const query: string = 'CREATE DATABASE IF NOT EXISTS selmanege'

        await this.execute(query)
    }

    async waitDBConnexion(callback: CallableFunction) {
        let success: boolean = false

        try {
            await this.getConn()
            success = true
        } catch (err) {
            console.log('DB connexion not working yet...')
            this.waitDBConnexion(callback)
        }

        if (success) {
            callback()
        }
    }
}
