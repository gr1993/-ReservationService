import {MigrationInterface, QueryRunner} from "typeorm";

export class TicketMigration1631666399492 implements MigrationInterface {
    name = 'TicketMigration1631666399492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`ticket\` CHANGE \`end_airport\` \`end_airport\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`ticket\` CHANGE \`start_date\` \`start_date\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`ticket\` CHANGE \`duration_time\` \`duration_time\` float NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`ticket\` CHANGE \`price\` \`price\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`ticket\` CHANGE \`count\` \`count\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`ticket\` CHANGE \`rest\` \`rest\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`ticket\` CHANGE \`rest\` \`rest\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`ticket\` CHANGE \`count\` \`count\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`ticket\` CHANGE \`price\` \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`ticket\` CHANGE \`duration_time\` \`duration_time\` float(12) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`ticket\` CHANGE \`start_date\` \`start_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`reservation\`.\`ticket\` CHANGE \`end_airport\` \`end_airport\` varchar(255) NOT NULL`);
    }

}
