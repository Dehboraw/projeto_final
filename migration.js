const db = require("./db") 

async function criar_estrutura(){
    try{
        await db.pool.query(`
            DROP TABLE IF EXISTS Cliente;
            CREATE TABLE Cliente (
                    id int NOT NULL AUTO_INCREMENT,
                    nome varchar(50) NOT NULL,
                    cpf char(14) NOT NULL,
                    celular char(14) NOT NULL,
                    email varchar(50) NOT NULL,
                    senha varchar(512) NOT NULL,
                    PRIMARY KEY (id),
                    UNIQUE KEY cpf (cpf),
                    UNIQUE KEY email (email)
              ) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `)
    console.log("Migração de estrutura do bd finalizada")
    }catch(error){
        console.log(error)
    }
}

criar_estrutura()

//criar um banco de dados de teste e altera no arquivo db o nome do banco