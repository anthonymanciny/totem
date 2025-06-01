CREATE TABLE `tbl_documento_curso` (
  `idDocumentoCurso` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador do documento vinculado ao curso',
  `idCurso` INT NOT NULL COMMENT 'Referência ao curso que exige o documento',
  `nomeDocumento` VARCHAR(100) NOT NULL COMMENT 'Nome do documento exigido pelo curso',
  PRIMARY KEY (`idDocumentoCurso`),
  CONSTRAINT `fk_documento_curso` FOREIGN KEY (`idCurso`) REFERENCES `tbl_curso` (`idCurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabela de documentos obrigatórios por curso';
