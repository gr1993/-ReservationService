import {MigrationInterface, QueryRunner} from "typeorm";

export class addTicket1632275532515 implements MigrationInterface {
    name = 'addTicket1632275532515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`reservation\`.\`ticket\` (\`srl\` int NOT NULL AUTO_INCREMENT, \`airline\` varchar(255) NOT NULL, \`start_airport\` varchar(255) NOT NULL, \`end_airport\` varchar(255) NULL, \`start_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`duration_time\` float NULL, \`price\` int NULL, \`count\` int NULL, \`rest\` int NULL, \`create_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`srl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservation\`.\`reservation\` (\`srl\` int NOT NULL AUTO_INCREMENT, \`member_srl\` int NOT NULL, \`ticket_srl\` int NOT NULL, \`count\` int NOT NULL, \`create_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`srl\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reservation\`.\`code\` (\`code_type\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`desc\` varchar(255) NULL, PRIMARY KEY (\`code_type\`, \`code\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`reservation\` ADD CONSTRAINT \`FK_e6bb075836a5d1deebcb61585d3\` FOREIGN KEY (\`member_srl\`) REFERENCES \`reservation\`.\`member\`(\`srl\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`reservation\` ADD CONSTRAINT \`FK_7f4e65c0e58144f542607f113e3\` FOREIGN KEY (\`ticket_srl\`) REFERENCES \`reservation\`.\`ticket\`(\`srl\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`reservation\` DROP FOREIGN KEY \`FK_7f4e65c0e58144f542607f113e3\``);
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`reservation\` DROP FOREIGN KEY \`FK_e6bb075836a5d1deebcb61585d3\``);
        await queryRunner.query(`DROP TABLE \`reservation\`.\`code\``);
        await queryRunner.query(`DROP TABLE \`reservation\`.\`reservation\``);
        await queryRunner.query(`DROP TABLE \`reservation\`.\`ticket\``);
    }

}
