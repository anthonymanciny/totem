CREATE TABLE `tbl_matricula` (
  `idMatricula` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador numérico da matrícula',
  `idAluno` INT NOT NULL COMMENT 'Referência ao aluno matriculado',
  `idCurso` INT NOT NULL COMMENT 'Referência ao curso matriculado',
  `statusMatricula` ENUM('Ativo', 'Inativo', 'Cancelado') NOT NULL COMMENT 'Status da matrícula',
  PRIMARY KEY (`idMatricula`),
  CONSTRAINT `fk_matricula_aluno` FOREIGN KEY (`idAluno`) REFERENCES `tbl_aluno` (`idAluno`),
  CONSTRAINT `fk_matricula_curso` FOREIGN KEY (`idCurso`) REFERENCES `tbl_curso` (`idCurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabela de matrículas dos alunos nos cursos';
