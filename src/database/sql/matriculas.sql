CREATE TABLE `tbl_matricula` (
  `idMatricula` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador da matrícula',
  `idUsuario` INT NOT NULL COMMENT 'Referência ao estudante',
  `idCurso` INT NOT NULL COMMENT 'Referência ao curso',
  `dataMatricula` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Data da matrícula',
  PRIMARY KEY (`idMatricula`),
  UNIQUE KEY `UN_usuario_curso` (`idUsuario`, `idCurso`),
  CONSTRAINT `fk_matricula_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `tbl_usuario` (`idUsuario`) ON DELETE CASCADE,
  CONSTRAINT `fk_matricula_curso` FOREIGN KEY (`idCurso`) REFERENCES `tbl_curso` (`idCurso`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Registra as matrículas dos usuários nos cursos';
