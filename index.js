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
            `SELECT id, nome, cpf, celular, email FROM Cliente`
        )
        res.status(200).json(clientes[0])
    }catch(error){
        res.status(500).json({reposta: error.message})
    }
})
//Consulta de um cliente específico
app.get("/cliente/:id", async (req, res) => {
    try{
        const id = req.params.id
        const resultado = await db.pool.query(
            `SELECT id, nome, cpf, celular, email FROM Cliente WHERE id = ?`, [id]
        )
        if (resultado[0].length == 0) {
            return res.status(404).json({ erro: "Cliente não existe no banco de dados!" });
          }
            res.status(200).json(resultado[0]);
    }catch(error){
        res.status(500).json({resposta: error.message})
    }
})
//Exclusão de um cliente
app.delete("/cliente/:id", async (req, res) => {
    try{
        const id = req.params.id
        const resultado = await db.pool.query(
            `DELETE FROM Cliente WHERE id = ?`, [id]
        )
        if (resultado[0].affectedRows == 0){
            return res.status(404).json({ erro: "Não existe cliente com esse id!"});
        }
            res.status(200).json({resposta: "Cliente deletado."});
    }catch(error){
        res.status(500).json({reposta: error.message})
    }
})
//Alteração dos dados de um cliente
app.patch("/cliente/:id", async (req, res) => {
    try{
        const cliente_at = req.body
        const id = req.params.id
        const resultado = await db.pool.query(
            `UPDATE Cliente SET nome = ?, cpf = ?, celular = ?, email = ? WHERE id = ?`,
            [cliente_at.nome, cliente_at.cpf, cliente_at.celular, cliente_at.email, id]
        )
        if (resultado[0].affectedRows == 0){
            return res.status(404).json({erro:"Não existe cliente com esse id!"})
        }
            res.status(200).json({resposta: "Cliente atualizado."});
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