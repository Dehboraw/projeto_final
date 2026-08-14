// npm init
// npm express
const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

const db = require("./db")

//npm i bcrypt
const bcrypt = require("bcrypt")

app.post("/cliente", async (req, res) => {
    try{
        const cliente = req.body
        const senhaCript = bcrypt.hashSync(cliente.senha, 10) 
        cliente.senha = senhaCript
        
        // envio para o BD
        const resultado = await db.pool.query(
            `INSERT INTO Cliente (
                nome, cpf, celular, email, senha
            ) VALUES (?, ?, ?, ?, ?)`, 
            [cliente.nome, cliente.cpf, cliente.celular, cliente.email, cliente.senha]
        )
        res.status(201).json({mensagem: "Cliente cadastrado com ID = "+ resultado[0].insertId})
    } catch(error){
        res.status(500).json({erro: error.message}) 
    }
})



app.listen(port, ()=>{
    console.log("API rodando na porta " + port)
})

/*{
    "nome": "Débora Novo",
    "cpf": "781.101.101-01",
    "celular": "(42)45122-7894",
    "email": "hoje@gmail.com",
    "senha":"dy2905"
  }
*/