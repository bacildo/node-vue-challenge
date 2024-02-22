CREATE TABLE `students` (
	`id_student` INT(10) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`email` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`register` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	`cpf` VARCHAR(14) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id_student`) USING BTREE,
	UNIQUE INDEX `register` (`register`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=''
;
