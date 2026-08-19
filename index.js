// npm init
// npm express
const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

const db = require("./db")

//npm i bcrypt
const bcrypt = require("bcrypt")

//Cadastro de um cliente
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
//Consulta de todos os clientes
app.get("/cliente", async (req, res) => {
    try{
        const clientes = await db.pool.query(
            `SELECT nome, cpf, celular, email FROM Cliente`
        )
        res.status(200).json(clientes[0])
    }catch(error){
        res.status(500).json({reposta: error.message})
    }
})
//Consulta de um cliente específico
app.get("/cliente/:cpf", async (req, res) => {
    try{
        const cpf = req.params.cpf
        const cliente = await db.pool.query(
            `SELECT nome, cpf, celular, email FROM Cliente WHERE ?`, [cliente.cpf = cpf]
        )
        if (!cliente) {
            res.status(404).json({ erro: "Cliente não existe no banco de dados!" });
          }
            res.status(200).json(cliente[0]);
    }catch(error){
        res.status(500).json({resposta: error.message})
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