CREATE TABLE `tbl_curso` (
  `idCurso` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador numérico do curso',
  `nomeCurso` VARCHAR(100) NOT NULL COMMENT 'Nome do curso',
  `periodoCurso` VARCHAR(50) NOT NULL COMMENT 'Período do curso (Ex: Semestral, Anual)',
  `turnoCurso` VARCHAR(50) NOT NULL COMMENT 'Turno em que o curso é ofertado',
  `statusCurso` ENUM('Ativo', 'Inativo') NOT NULL COMMENT 'Status de disponibilidade do curso',
  PRIMARY KEY (`idCurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabela de cursos disponíveis';
