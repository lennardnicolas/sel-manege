import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeNewsPriceToString1725353025129 implements MigrationInterface {
    name = 'ChangeNewsPriceToString1725353025129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`news\` DROP COLUMN \`price\``)
        await queryRunner.query(`ALTER TABLE \`news\` ADD \`price\` varchar(255) NULL`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`news\` DROP COLUMN \`price\``)
        await queryRunner.query(`ALTER TABLE \`news\` ADD \`price\` decimal(10,2) NULL`)
    }
}
