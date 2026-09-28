const db = require("./db")

async function criar_estrutura(){
    try{
        await db.pool.query(
            //código sql
        )
    console.log("Migração de estrutura do bd finalizada")
    }catch(error){
        console.log(error)
    }
}

criar_estrutura()

//criar um banco de dados de teste e altera no arquivo db o nome do banco