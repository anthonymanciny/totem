CREATE TABLE `tbl_documento_matricula` (
  `idDocumentoMatricula` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador do documento entregue na matrícula',
  `idMatricula` INT NOT NULL COMMENT 'Referência à matrícula do aluno',
  `idDocumentoCurso` INT NOT NULL COMMENT 'Referência ao documento exigido pelo curso',
  `statusEntrega` ENUM('Entregue', 'Pendente') DEFAULT 'Pendente' COMMENT 'Status da entrega do documento',
  `dataEntrega` DATE DEFAULT NULL COMMENT 'Data em que o documento foi entregue',
  PRIMARY KEY (`idDocumentoMatricula`),
  CONSTRAINT `fk_docmatricula_matricula` FOREIGN KEY (`idMatricula`) REFERENCES `tbl_matricula` (`idMatricula`),
  CONSTRAINT `fk_docmatricula_documento` FOREIGN KEY (`idDocumentoCurso`) REFERENCES `tbl_documento_curso` (`idDocumentoCurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabela de documentos entregues no ato da matrícula';
