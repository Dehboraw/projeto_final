// npm init
// npm express
//npm i dotenv
const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const port = process.env.API_PORT
app.use(express.json())

const db = require("./db")

//npm i bcrypt
const bcrypt = require("bcrypt")
// npm i cors
const cors = require("cors")
app.use(cors())
//npm i jsonwebtoken
const jwt = require("jsonwebtoken")

const path = require("path")

app.use("/img", express.static(path.join(__dirname, 'img')))
// http:localhost:3000/img/1/1.jpg
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

app.get("/produtos", async (req, res) => {
    try{
        const produtos = await db.pool.query(
            `SELECT * FROM Produto`
        )
        res.status(200).json(produtos[0])
    }catch(error){
        res.status(500).json({reposta: error.message})
    }
})
// path parameter
app.get("/produto/:id", async (req,res) => { 
    try{
        const id = req.params.id
        const resultado = await db.pool.query(
            `SELECT * FROM Produto WHERE id = ?`, [id]
        )
        if (resultado[0].length == 0) {
            return res.status(404).json({erro: "Esse produto não existe no banco de dados!"});
          }
            res.status(200).json(resultado[0]);
    }catch(error){
        res.status(500).json({resposta: error.message})
    }
})

app.get("/produto", async (req, res) => {
    try {
        let sql = "SELECT * FROM Produto WHERE 1=1";
        const params = [];

        const {
            busca,
            ordenacao,
            categoria,
            pagina,
            preco_min,
            preco_max
        } = req.query;

        if (busca) {
            sql += " AND nome LIKE ?";
            params.push(`%${busca}%`);
        }
        if (categoria) {
            sql += " AND categoria = ?";
            params.push(categoria);
        }
        if (preco_max) {
            sql += " AND preco <= ?";
            params.push(preco_max);
        }
        if (preco_min) {
            sql += " AND preco >= ?";
            params.push(preco_min);
        }
        const sqlContagem = sql.replace(
            "SELECT *",
            "SELECT COUNT(*) AS total"
        );
        const resultadoContagem = await db.pool.query(
            sqlContagem,
            params
        );
        const total = resultadoContagem[0][0].total;

        if (ordenacao === "maior preco") {
            sql += " ORDER BY preco DESC";
        } else if (ordenacao === "menor preco") {
            sql += " ORDER BY preco ASC";
        }
        const porPagina = 16;
        const totalPaginas = Math.ceil(total / porPagina);

        const paginaSolicitada = Math.max(
            1,
            parseInt(pagina, 10) || 1
        );
        const paginaAtual = totalPaginas === 0
            ? 1
            : Math.min(paginaSolicitada, totalPaginas);
        const offset = (paginaAtual - 1) * porPagina;
        
        sql += " LIMIT ? OFFSET ?";
        params.push(porPagina, offset);

        const resultado = await db.pool.query(sql, params);

        res.status(200).json({
            produtos: resultado[0],
            total: total,
            pagina: paginaAtual,
            totalPaginas: totalPaginas
        });

    } catch (error) {
        res.status(500).json({
            resposta: error.message
        });
    }
});

//esquema da rota compra
app.post("/compra", autenticar, async (req, res) => {

    let connection;

    try {

        const id_cliente = req.usuario.id;

        const { forma_pagamento, produtos } = req.body;

        if (!forma_pagamento || !Array.isArray(produtos) || produtos.length === 0) {

            return res.status(400).json({
                erro: "Informe a forma de pagamento e os produtos."
            });

        }

        connection = await db.pool.getConnection();

        await connection.beginTransaction();

        let valorTotal = 0;

        const itensProcessados = [];

        for (const item of produtos) {

            const [rows] = await connection.query(
                "SELECT id, nome, preco, estoque FROM Produto WHERE id = ? FOR UPDATE",
                [item.id]
            );

            const produtoBanco = rows[0];

            if (!produtoBanco) {
                throw new Error(`Produto ID ${item.id} não encontrado.`);
            }

            if (produtoBanco.estoque < item.qtd) {
                throw new Error(`Estoque insuficiente para ${produtoBanco.nome}.`);
            }

            const subtotal = Number(produtoBanco.preco) * item.qtd;

            valorTotal += subtotal;

            itensProcessados.push({
                id_produto: item.id,
                qtd: item.qtd,
                preco_unitario: produtoBanco.preco
            });

            await connection.query(
                "UPDATE Produto SET estoque = estoque - ? WHERE id = ?",
                [item.qtd, item.id]
            );

        }

        const dataServidor = new Date();

        const [resultadoCompra] = await connection.query(
            `INSERT INTO Compra
            (idCliente, data_da_compra, forma_pagamento, valor_total)
            VALUES (?, ?, ?, ?)`,
            [id_cliente, dataServidor, forma_pagamento, valorTotal]
        );

        const idCompraGerado = resultadoCompra.insertId;

        for (const item of itensProcessados) {

            await connection.query(
                `INSERT INTO CompraProduto
                (idCompra, idProduto, quantidade, valor_unitario)
                VALUES (?, ?, ?, ?)`,
                [
                    idCompraGerado,
                    item.id_produto,
                    item.qtd,
                    item.preco_unitario
                ]
            );

        }

        await connection.commit();

        return res.status(201).json({
            mensagem: "Compra realizada com sucesso!",
            id_compra: idCompraGerado,
            valor_total: valorTotal
        });

    } catch (error) {

        console.error("ERRO NA ROTA COMPRA:", error);

        if (connection) {
            await connection.rollback();
        }

        return res.status(500).json({
            erro: error.message || "Erro ao processar a compra."
        });

    } finally {

        if (connection) {
            connection.release();
        }

    }

});

app.get("/compras", autenticar, async (req, res) => {
    const id_cliente = req.usuario.id;
    const connection = await db.getConnection();

    try {
        const [compras] = await connection.query(
            `SELECT id, data_da_compra, forma_pagamento, valor_total 
             FROM Compra 
             WHERE idCliente = ? 
             ORDER BY data_da_compra DESC`,
            [id_cliente]
        );
        if (compras.length === 0) {
            return res.status(200).json([]);
        }

        for (const compra of compras) {
            const [itens] = await connection.query(
                `SELECT 
                    cp.idProduto AS id_produto,
                    p.nome,
                    cp.quantidade AS qtd,
                    cp.valor_unitario
                 FROM CompraProduto cp
                 INNER JOIN Produto p ON cp.idProduto = p.id
                 WHERE cp.idCompra = ?`,
                [compra.id]
            );

            compra.produtos = itens;
        }

        return res.status(200).json(compras);

    } catch (error) {
        return res.status(500).json({
            erro: error.message || "Erro ao consultar as compras."
        });
    } finally {
        connection.release();
    }
});


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




// Rotas que faltam:
/*GET /cliente/perfil *
DELETE /cliente/perfil *
GET /produto ok
GET /produto/:id ok
POST /compra *
GET /compra *
GET /compra/:id *

* = necessidade de autenticação do cliente.*/
