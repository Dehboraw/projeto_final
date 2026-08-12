CREATE TABLE Cliente 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 nome VARCHAR(50) NOT NULL,  
 cpf CHAR(14) NOT NULL UNIQUE, 
 celular CHAR(14) NOT NULL,  
 email VARCHAR(50) NOT NULL UNIQUE,   
 senha VARCHAR(512) NOT NULL
); 

INSERT INTO Cliente (nome, cpf, celular, email, senha) VALUES ("Débora", "111.222.333-00", "(42)99999-0909", "deh@gmail.com", "dy2905")

INSERT INTO Cliente (nome, cpf, celular, email, senha) VALUES
('Ana Silva', '111.222.333-44', '(11)98765-4321', 'ana.silva@email.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
('Bruno Souza', '222.333.444-55', '(21)97654-3210', 'bruno.souza@email.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
('Carla Mendes', '333.444.555-66', '(31)96543-2109', 'carla.mendes@email.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
('Daniel Oliveira', '444.555.666-77', '(41)95432-1098', 'daniel.oliveira@email.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
('Elaine Santos', '555.666.777-88', '(51)94321-0987', 'elaine.santos@email.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
('Felipe Rocha', '666.777.888-99', '(61)93210-9876', 'felipe.rocha@email.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
('Gabriela Lima', '777.888.999-00', '(71)92109-8765', 'gabriela.lima@email.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
('Henrique Costa', '888.999.000-11', '(81)91098-7654', 'henrique.costa@email.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
('Isabela Martins', '999.000.111-22', '(91)90987-6543', 'isabela.martins@email.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
('João Pereira', '000.111.222-33', '(85)99876-5432', 'joao.pereira@email.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8');

SELECT email, senha FROM Cliente;

SELECT email, senha FROM Cliente WHERE email = "ana.silva@email.com";

SELECT * FROM Cliente 

SELECT * FROM Cliente WHERE id <= 10 AND LENGTH(senha) > 20;

DELETE FROM Cliente WHERE id = 11;

UPDATE Cliente SET nome = "Débora Alves", email = "Alves@gmail.com" WHERE id = 1;

