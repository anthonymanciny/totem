CREATE TABLE `tbl_curso` (
  `idCurso` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador do curso',
  `nomeCurso` VARCHAR(100) NOT NULL COMMENT 'Nome do curso',
  `descricaoCurso` TEXT COMMENT 'Descrição do curso',
  PRIMARY KEY (`idCurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabela de cursos disponíveis';
