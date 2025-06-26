import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1750132269206 implements MigrationInterface {
    name = 'Init1750132269206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`public_user\` (\`id\` int NOT NULL, \`username\` varchar(50) NOT NULL, \`avatar\` varchar(100) NULL, \`location\` varchar(150) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`private_user\` (\`id\` int NOT NULL, \`last_name\` varchar(50) NOT NULL, \`first_name\` varchar(50) NOT NULL, \`email\` varchar(100) NOT NULL, \`password_hash\` varchar(60) NOT NULL, \`phone\` varchar(50) NOT NULL, \`address\` varchar(150) NULL, \`document_number\` varchar(50) NOT NULL, \`rol\` enum ('admin', 'volunteer', 'veterinarian') NOT NULL DEFAULT 'volunteer', \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_0a75ebd1982611f6b96082a903\` (\`email\`), UNIQUE INDEX \`IDX_50eebdc1965b5fad324d5d369d\` (\`document_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`evaluations\` (\`id\` varchar(36) NOT NULL, \`has_garden\` tinyint NOT NULL DEFAULT 0, \`has_near_park\` tinyint NOT NULL DEFAULT 0, \`count_kids\` int NOT NULL DEFAULT '0', \`count_dogs\` int NOT NULL DEFAULT '0', \`count_cats\` int NOT NULL DEFAULT '0', \`count_other_pets\` int NOT NULL DEFAULT '0', \`comments\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`adopter_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`adopters\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fisrt_name\` varchar(50) NOT NULL, \`last_name\` varchar(50) NOT NULL, \`document_number\` varchar(20) NOT NULL, \`phone\` varchar(20) NOT NULL, \`district\` varchar(20) NULL, \`is_banned\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_38e3130566d9e7842726b165cf\` (\`document_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`activities\` (\`id\` int NOT NULL, \`title\` varchar(150) NOT NULL, \`image_url\` varchar(200) NULL, \`resource_url\` varchar(200) NULL, \`schedule_start_at\` datetime NULL, \`schedule_end_at\` datetime NULL, \`finished\` tinyint NOT NULL DEFAULT 0, \`admin\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`finished_by\` int NULL, \`adopted_followup\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`adopted_animals\` (\`id\` varchar(36) NOT NULL, \`status_followup\` enum ('scheduled_followup', 'verified', 'in_followup', 'scheduled_sterilization', 'cancelled') NOT NULL DEFAULT 'scheduled_followup', \`is_returned\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`adoption_id\` varchar(36) NULL, \`animal_id\` int NULL, \`supervised_by_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`medical_checkups\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` enum ('registered', 'in_attention', 'completed', 'cancelled') NOT NULL DEFAULT 'registered', \`schedule_start_at\` datetime NULL, \`schedule_end_at\` datetime NULL, \`checkup_at\` datetime NULL, \`weight_kg\` float(6,2) NULL, \`temperature_c\` float(6,2) NULL, \`observations\` text NULL, \`diagnosis\` text NULL, \`treatment\` text NULL, \`chechup_image_url\` varchar(150) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`animal_id\` int NULL, \`veterinarian_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`animals\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nickname\` varchar(50) NOT NULL, \`type\` enum ('dog', 'cat') NOT NULL DEFAULT 'dog', \`breed\` varchar(20) NOT NULL, \`size\` enum ('small', 'medium', 'large', 'giant') NOT NULL DEFAULT 'medium', \`sex\` enum ('male', 'female') NOT NULL DEFAULT 'female', \`birthdate\` date NULL, \`description_history\` text NULL, \`status\` enum ('in_adoption', 'in_observation', 'adopted', 'dead') NOT NULL DEFAULT 'in_observation', \`isSterilized\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`adoptions\` (\`id\` varchar(36) NOT NULL, \`status_result\` enum ('not_evaluated', 'approved', 'rejected', 'banned') NOT NULL DEFAULT 'not_evaluated', \`status_request\` enum ('created', 'suitable', 'selected_animal', 'cancelled', 'adoption_completed') NOT NULL DEFAULT 'created', \`review_request_notes\` text NULL, \`review_request_at\` datetime NULL, \`selected_animal_at\` datetime NULL, \`contract_signed\` tinyint NOT NULL DEFAULT 0, \`is_web_visible\` tinyint NOT NULL DEFAULT 0, \`adoption_history\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`adopter_id\` int NULL, \`evaluated_by_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`selected_animals_temp\` (\`adoptionsId\` varchar(36) NOT NULL, \`animalsId\` int NOT NULL, INDEX \`IDX_86dcd100183660f785ffa678f2\` (\`adoptionsId\`), INDEX \`IDX_0f006862d382c0ac409e4ef213\` (\`animalsId\`), PRIMARY KEY (\`adoptionsId\`, \`animalsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`public_user\` ADD CONSTRAINT \`FK_03b91d2b8321aa7ba32257dc321\` FOREIGN KEY (\`id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`private_user\` ADD CONSTRAINT \`FK_1ad8e1ec506e436bdcc89744037\` FOREIGN KEY (\`id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`evaluations\` ADD CONSTRAINT \`FK_ab1dc49c790942bebc184507129\` FOREIGN KEY (\`adopter_id\`) REFERENCES \`adopters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activities\` ADD CONSTRAINT \`FK_bdf3d62128e1c5a260a975b2519\` FOREIGN KEY (\`finished_by\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`activities\` ADD CONSTRAINT \`FK_5744ac2e7428514eff0a70060ce\` FOREIGN KEY (\`adopted_followup\`) REFERENCES \`adopted_animals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adopted_animals\` ADD CONSTRAINT \`FK_cf24a56eb4b5c0504e56756c234\` FOREIGN KEY (\`adoption_id\`) REFERENCES \`adoptions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adopted_animals\` ADD CONSTRAINT \`FK_2dea68a2b31f35e5c04156d6339\` FOREIGN KEY (\`animal_id\`) REFERENCES \`animals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adopted_animals\` ADD CONSTRAINT \`FK_f29dbc9e5617ad2dc0509865f18\` FOREIGN KEY (\`supervised_by_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`medical_checkups\` ADD CONSTRAINT \`FK_ec3c197f76a50c1f7f4b78b7fbd\` FOREIGN KEY (\`animal_id\`) REFERENCES \`animals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`medical_checkups\` ADD CONSTRAINT \`FK_6bc9f4109d58501a19889dfd6dd\` FOREIGN KEY (\`veterinarian_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adoptions\` ADD CONSTRAINT \`FK_9a401881ecb9d48d0d252c3bd20\` FOREIGN KEY (\`adopter_id\`) REFERENCES \`adopters\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`adoptions\` ADD CONSTRAINT \`FK_9bc9bfb7670933b3ba61f1472b1\` FOREIGN KEY (\`evaluated_by_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`selected_animals_temp\` ADD CONSTRAINT \`FK_86dcd100183660f785ffa678f2b\` FOREIGN KEY (\`adoptionsId\`) REFERENCES \`adoptions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`selected_animals_temp\` ADD CONSTRAINT \`FK_0f006862d382c0ac409e4ef2138\` FOREIGN KEY (\`animalsId\`) REFERENCES \`animals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`selected_animals_temp\` DROP FOREIGN KEY \`FK_0f006862d382c0ac409e4ef2138\``);
        await queryRunner.query(`ALTER TABLE \`selected_animals_temp\` DROP FOREIGN KEY \`FK_86dcd100183660f785ffa678f2b\``);
        await queryRunner.query(`ALTER TABLE \`adoptions\` DROP FOREIGN KEY \`FK_9bc9bfb7670933b3ba61f1472b1\``);
        await queryRunner.query(`ALTER TABLE \`adoptions\` DROP FOREIGN KEY \`FK_9a401881ecb9d48d0d252c3bd20\``);
        await queryRunner.query(`ALTER TABLE \`medical_checkups\` DROP FOREIGN KEY \`FK_6bc9f4109d58501a19889dfd6dd\``);
        await queryRunner.query(`ALTER TABLE \`medical_checkups\` DROP FOREIGN KEY \`FK_ec3c197f76a50c1f7f4b78b7fbd\``);
        await queryRunner.query(`ALTER TABLE \`adopted_animals\` DROP FOREIGN KEY \`FK_f29dbc9e5617ad2dc0509865f18\``);
        await queryRunner.query(`ALTER TABLE \`adopted_animals\` DROP FOREIGN KEY \`FK_2dea68a2b31f35e5c04156d6339\``);
        await queryRunner.query(`ALTER TABLE \`adopted_animals\` DROP FOREIGN KEY \`FK_cf24a56eb4b5c0504e56756c234\``);
        await queryRunner.query(`ALTER TABLE \`activities\` DROP FOREIGN KEY \`FK_5744ac2e7428514eff0a70060ce\``);
        await queryRunner.query(`ALTER TABLE \`activities\` DROP FOREIGN KEY \`FK_bdf3d62128e1c5a260a975b2519\``);
        await queryRunner.query(`ALTER TABLE \`evaluations\` DROP FOREIGN KEY \`FK_ab1dc49c790942bebc184507129\``);
        await queryRunner.query(`ALTER TABLE \`private_user\` DROP FOREIGN KEY \`FK_1ad8e1ec506e436bdcc89744037\``);
        await queryRunner.query(`ALTER TABLE \`public_user\` DROP FOREIGN KEY \`FK_03b91d2b8321aa7ba32257dc321\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f006862d382c0ac409e4ef213\` ON \`selected_animals_temp\``);
        await queryRunner.query(`DROP INDEX \`IDX_86dcd100183660f785ffa678f2\` ON \`selected_animals_temp\``);
        await queryRunner.query(`DROP TABLE \`selected_animals_temp\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`adoptions\``);
        await queryRunner.query(`DROP TABLE \`animals\``);
        await queryRunner.query(`DROP TABLE \`medical_checkups\``);
        await queryRunner.query(`DROP TABLE \`adopted_animals\``);
        await queryRunner.query(`DROP TABLE \`activities\``);
        await queryRunner.query(`DROP INDEX \`IDX_38e3130566d9e7842726b165cf\` ON \`adopters\``);
        await queryRunner.query(`DROP TABLE \`adopters\``);
        await queryRunner.query(`DROP TABLE \`evaluations\``);
        await queryRunner.query(`DROP INDEX \`IDX_50eebdc1965b5fad324d5d369d\` ON \`private_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a75ebd1982611f6b96082a903\` ON \`private_user\``);
        await queryRunner.query(`DROP TABLE \`private_user\``);
        await queryRunner.query(`DROP TABLE \`public_user\``);
    }

}
