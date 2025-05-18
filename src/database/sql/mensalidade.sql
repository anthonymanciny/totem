CREATE TABLE `tbl_mensalidade` (
  `idMensalidade` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador da mensalidade',
  `idUsuario` INT NOT NULL COMMENT 'Referência ao estudante',
  `idCurso` INT NOT NULL COMMENT 'Referência ao curso',
  `mesReferencia` DATE NOT NULL COMMENT 'Mês de referência da mensalidade',
  `valorMensalidade` DECIMAL(10,2) NOT NULL COMMENT 'Valor da mensalidade',
  `statusPagamento` ENUM('pendente', 'pago', 'atrasado') NOT NULL DEFAULT 'pendente' COMMENT 'Status de pagamento',
  `vencimento` DATE NOT NULL COMMENT 'Data de vencimento',
  `dataPagamento` DATE DEFAULT NULL COMMENT 'Data do pagamento, se houver',
  `boletoUrl` TEXT DEFAULT NULL COMMENT 'URL para o boleto gerado',
  `pixQrCode` TEXT DEFAULT NULL COMMENT 'QR Code Pix para pagamento',
  PRIMARY KEY (`idMensalidade`),
  CONSTRAINT `fk_mensalidade_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `tbl_usuario` (`idUsuario`) ON DELETE CASCADE,
  CONSTRAINT `fk_mensalidade_curso` FOREIGN KEY (`idCurso`) REFERENCES `tbl_curso` (`idCurso`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabela de mensalidades por usuário e curso';
