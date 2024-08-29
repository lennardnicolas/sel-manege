import { MigrationInterface, QueryRunner } from 'typeorm'
import { AuthService } from '../services/auth-service.js'

export class InitialMigration1724861104823 implements MigrationInterface {
    name = 'InitialMigration1724861104823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`auth\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`userId\` int NOT NULL, INDEX \`idx_email_password\` (\`email\`, \`password\`), UNIQUE INDEX \`IDX_b54f616411ef3824f6a5c06ea4\` (\`email\`), UNIQUE INDEX \`REL_373ead146f110f04dad6084815\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `CREATE TABLE \`news\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`date\` date NULL, \`time\` time NULL, \`location\` varchar(255) NULL, \`price\` decimal(10,2) NULL, \`description\` text NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `ALTER TABLE \`auth\` ADD CONSTRAINT \`FK_373ead146f110f04dad60848154\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
        )
        await queryRunner.query(
            `ALTER TABLE \`news\` ADD CONSTRAINT \`FK_9198b86c4c22bf6852c43f3b44e\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        )

        // Seeding user table
        const userFirstName: string = process.env.SEL_MANEGE_BASE_USER_FIRST_NAME
            ? process.env.SEL_MANEGE_BASE_USER_FIRST_NAME
            : ''
        const userLastName: string = process.env.SEL_MANEGE_BASE_USER_LAST_NAME
            ? process.env.SEL_MANEGE_BASE_USER_LAST_NAME
            : ''

        let sql = `
            INSERT INTO user (firstname, lastname)
            VALUES (?, ?)
            `

        let values = [userFirstName, userLastName]

        await queryRunner.query(sql, values)

        // Seeding auth table
        const userMail: string = process.env.SEL_MANEGE_BASE_USER_MAIL ? process.env.SEL_MANEGE_BASE_USER_MAIL : ''
        const userPass: string = process.env.SEL_MANEGE_BASE_USER_PASS ? process.env.SEL_MANEGE_BASE_USER_PASS : ''

        const authService = new AuthService()
        const encryptedUserPass = await authService.getEncryptedPass(userPass)

        sql = `
            INSERT INTO auth (email, password, userId)
            VALUES (?, ?, ?)
            `

        values = [userMail, encryptedUserPass, '1']

        await queryRunner.query(sql, values)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`news\` DROP FOREIGN KEY \`FK_9198b86c4c22bf6852c43f3b44e\``)
        await queryRunner.query(`ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_373ead146f110f04dad60848154\``)
        await queryRunner.query(`DROP TABLE \`user\``)
        await queryRunner.query(`DROP TABLE \`news\``)
        await queryRunner.query(`DROP INDEX \`REL_373ead146f110f04dad6084815\` ON \`auth\``)
        await queryRunner.query(`DROP INDEX \`IDX_b54f616411ef3824f6a5c06ea4\` ON \`auth\``)
        await queryRunner.query(`DROP INDEX \`idx_email_password\` ON \`auth\``)
        await queryRunner.query(`DROP TABLE \`auth\``)
    }
}
