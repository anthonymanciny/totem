CREATE TABLE `tbl_aluno` (
  `idAluno` INT NOT NULL AUTO_INCREMENT COMMENT 'Identificador numérico do aluno',
  `nomeAluno` VARCHAR(150) NOT NULL COMMENT 'Nome completo do aluno',
  `cpfAluno` VARCHAR(14) NOT NULL COMMENT 'CPF do aluno',
  `emailAluno` VARCHAR(150) NOT NULL COMMENT 'E-mail do aluno',
  `senhaHash` VARCHAR(255) NOT NULL COMMENT 'Senha em hash do aluno',
  `biometriaID` VARCHAR(100) DEFAULT NULL COMMENT 'ID de biometria do aluno (opcional)',
  `statusAtivo` ENUM('Ativo', 'Inativo') NOT NULL COMMENT 'Status do aluno no sistema',
  PRIMARY KEY (`idAluno`),
  UNIQUE KEY `tbl_aluno_UN_cpf` (`cpfAluno`),
  UNIQUE KEY `tbl_aluno_UN_email` (`emailAluno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tabela de alunos cadastrados no sistema';
