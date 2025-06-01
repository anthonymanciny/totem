CREATE TABLE `tbl_boleto` (
  `idBoleto` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador numérico do boleto',
  `idAluno` INT NOT NULL COMMENT 'Referência ao aluno que deve pagar o boleto',
  `idCurso` INT NOT NULL COMMENT 'Referência ao curso relacionado ao boleto',
  `valorBoleto` DECIMAL(10,2) NOT NULL COMMENT 'Valor do boleto',
  `vencimentoBoleto` DATE NOT NULL COMMENT 'Data de vencimento do boleto',
  `statusBoleto` ENUM('Pago', 'Em aberto', 'Atrasado') NOT NULL COMMENT 'Status de pagamento do boleto',
  `linkBoletoPDF` VARCHAR(255) DEFAULT NULL COMMENT 'Link para download do boleto em PDF',
  PRIMARY KEY (`idBoleto`),
  CONSTRAINT `fk_boleto_aluno` FOREIGN KEY (`idAluno`) REFERENCES `tbl_aluno` (`idAluno`),
  CONSTRAINT `fk_boleto_curso` FOREIGN KEY (`idCurso`) REFERENCES `tbl_curso` (`idCurso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabela de boletos gerados para os alunos';
