CREATE TABLE `tbl_usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador numérico do usuário',
  `nomeUsuario` VARCHAR(100) NOT NULL COMMENT 'Nome completo do estudante',
  `emailUsuario` VARCHAR(100) NOT NULL COMMENT 'E-mail do estudante',
  `cpfUsuario` VARCHAR(14) NOT NULL COMMENT 'CPF do estudante',
  `codigoVerificacao` VARCHAR(6) NOT NULL COMMENT 'Código de verificação para login',
  `senhaUsuario`VARCHAR(100) NOT NULL COMMENT 'senha do estudante',
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `tbl_usuario_UN_cpf` (`cpfUsuario`),
  UNIQUE KEY `tbl_usuario_UN_email` (`emailUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabela de estudantes';
