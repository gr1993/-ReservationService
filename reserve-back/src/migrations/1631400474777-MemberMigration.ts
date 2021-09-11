import {MigrationInterface, QueryRunner} from "typeorm";

export class MemberMigration1631400474777 implements MigrationInterface {
    name = 'MemberMigration1631400474777'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reservation\`.\`member\` (\`srl\` int NOT NULL AUTO_INCREMENT, \`id\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`mobile\` varchar(255) NULL, \`create_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`srl\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`reservation\`.\`member\``);
    }

}
