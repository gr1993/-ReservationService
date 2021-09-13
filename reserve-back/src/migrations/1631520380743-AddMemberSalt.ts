import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMemberSalt1631520380743 implements MigrationInterface {
    name = 'AddMemberSalt1631520380743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`member\` ADD \`salt\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`member\` DROP COLUMN \`salt\``);
    }

}
