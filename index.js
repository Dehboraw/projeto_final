// npm init
// npm express
const express = require("express")
const app = express()
const port = 3000
app.use(express.json())

const db = require("./db")

//npm i bcrypt
const bcrypt = require("bcrypt")
// npm i cors
const cors = require("cors")
app.use(cors())
//npm i jsonwebtoken
const jwt = require("jsonwebtoken")
//npm i dotenv
const dotenv = require("dotenv")
dotenv.config()

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
        res.status(201).json({msg: "Cliente cadastrado com ID = "+ resultado[0].insertId})
    } catch(error){
        res.status(500).json({erro: error.message}) 
    }
})
//Login de um cliente
app.post("/login", async (req, res) => {
    try{
        //primeiro encontramos um CLIENTE com esse email e senha. Ou seja, apenas o que escolhemos.
        const user = req.body
        const resultado = await db.pool.query(
            `SELECT id, nome, email, senha FROM Cliente WHERE email = ?`, [user.email]
        )
        // A partir dele, salvamos os dados do cliente em uma variável.
        const dados_bd = resultado[0][0]
        if(!dados_bd){
            return res.status(401).json({msg: "Email não cadastrado!"})
        }
    
        // comparação da senha q esta no body com a senha que foi retirada do bd
        const senha_valida = await bcrypt.compare(user.senha, dados_bd.senha)
    
        if(!senha_valida){
            return res.status(400).json({msg:"Credenciais inválidas!"})
        }
        //JWT (JSON WEB TOKEN)
        const payload = {
            id: dados_bd.id,
            email: dados_bd.email
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1m'})
        return res.status(200).json({nome: dados_bd.nome, token: token})
        
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
            return res.status(404).json({erro: "Cliente não existe no banco de dados!"});
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
            return res.status(404).json({erro: "Não existe cliente com esse id!"});
        }
            res.status(200).json({resposta: "Cliente deletado."});
    }catch(error){
        res.status(500).json({reposta: error.message})
    }
})
//Alteração dos dados de um cliente
app.patch("/cliente/:id", async (req, res) => {
    try {
        const id = req.params.id
        const cliente_at = req.body
        const camposPermitidos = ['nome', 'cpf', 'celular', 'email']
        const atualizacoes = []
        const valores = []

        for (const campo of camposPermitidos) {
            if (cliente_at[campo] !== undefined) {
                atualizacoes.push(`${campo} = ?`);
                valores.push(cliente_at[campo]);
            }
        }
        if (atualizacoes.length === 0) {
            return res.status(400).json({erro: "Nenhum campo válido para atualizar!"});
        }
        valores.push(id);

        const sql = `UPDATE Cliente SET ${atualizacoes.join(", ")} WHERE id = ?`;
        const resultado = await db.pool.query(sql, valores);

        if (resultado[0].affectedRows == 0) {
            return res.status(404).json({erro: "Não existe cliente com esse id!"});
        }
        res.status(200).json({ resposta: "Cliente atualizado." });

    } catch (error) {
        res.status(500).json({ resposta: error.message });
    }
});

app.get("/cliente/perfil", autenticar, async (req, res)=>{
    try {
        const id = req.usuario.id
        const result = await db.pool.query("SELECT * FROM cliente WHERE id = ?", [id]);
        const perfil = result[0][0]
        delete perfil.senha
        res.status(200).json(perfil)
    } catch (err) {
        res.status(500).json({ erro: 'Erro interno' });
        throw err;
    }
})


app.listen(port, ()=>{
    console.log("API rodando na porta " + port)
})

function autenticar(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null){
        return res.status(401).json({erro: "Token não enviado, usar Authorization Bearer <token>"})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) return res.status(403).json({erro: "Token inválido"})
        req.usuario = usuario
        next()
    })   
}


/*MODELO
/*{
    "nome": "Débora Novo",
    "cpf": "781.101.101-01",
    "celular": "(42)45122-7894",
    "email": "hoje@gmail.com",
    "senha":"dy2905"
  }
*/

/* TESTE LOGIN 
{
  "email":"hoje@gmail.com",
  "senha":"$2b$10$nfHrbAZgQvefgQwvNvH9BewGZXM90ntbU1EJM0FixBI8ifvn33Fp2"
}
*/ 
// Rotas que faltam:
/*GET /cliente/perfil *
DELETE /cliente/perfil *
GET /produto
GET /produto/:id
POST /compra *
GET /compra *
GET /compra/:id *

* = necessidade de autenticação do cliente.*/
