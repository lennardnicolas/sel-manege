import { ExpressServer } from './express-server.js'
import { Db } from './utilities/db.js'
import { dataSource } from './data-source.js'

const db = Db.getInstance()
const express_server = new ExpressServer()

db.waitDBConnexion(() => {
    db.dbInit().then(() => {
        dataSource.initialize().then(() => {
            dataSource.runMigrations().then(() => {
                express_server.start()
            })
        })
    })
})
