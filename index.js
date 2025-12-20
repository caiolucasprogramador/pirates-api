const express = require('express')
const app = express()

const pool = require('./database')


app.use(express.json())

// MIDDLEWARES:

function validarCampos(req, res, next) {
    const { name, role } = req.body
    if (!name || !role) {
        return res.status(400).json({message: "Os campos Nome e Cargo do pirata são obrigatórios"})
    }
    
    next()
}

function verificarId(req, res, next) {
    if (isNaN(req.params.id)) {
        return res.status(400).json({message: "ID inválido!"})
    }
    next()
}

app.listen(3000, function() {
    console.log("API funcionando")
})

// ROTA GET
// geral

app.get("/pirates", async function(req, res, next) {
    try {
        const { rows } = await pool.query('select * from pirates')
        res.json(rows)
    } catch(err) {
        next(err)
    }
})
// individual
app.get("/pirates/:id", verificarId, async function(req, res, next) {
    try {
        const { id } = req.params
        const { rows } = await pool.query("select * from pirates where id = $1", [id])

        if (rows.length === 0) {
            return res.status(404).json({error: "Pirata não encontrado"})
        }

        res.json(rows[0])
    } catch (err) {
        next(err)
    }
})

// ROTA POST
app.post("/pirates", validarCampos, async function(req, res, next) {
    try {
        const { name, role, bounty, devilFruit } = req.body

        const query = `insert into pirates(name, role, bounty, devilFruit)
        values($1, $2, $3, $4) returning *`

        const newPirate = await pool.query(query, [name, role, bounty, devilFruit]
        )
        res.status(201).json(newPirate.rows[0])
    }
    catch (err) {
        next(err)
    }
})

// ROTA PUT
app.put("/pirates/:id", verificarId, validarCampos, async function(req, res, next) {
    try {
        const { name, role, bounty, devilFruit } = req.body
        const { id } = req.params

        const { rows } = await pool.query(`update pirates
            set name = $2,
            role = $3,
            bounty = $4,
            devilFruit = $5
            where id = $1
            returning *`, [id, name, role, bounty, devilFruit])
        
        if (rows.length === 0) {
            return res.status(404).json({error: "Pirata não foi encontrado"})
        }
        res.json(rows[0])
    }
    catch (err) {
        next(err)
    }
})

app.patch("/pirates/:id", verificarId, async function(req, res, next) {
    try {
        const { id } = req.params
        const body = req.body
        const allowedFields = ['name', 'role', 'bounty', 'devilFruit']
        const fields = []
        const values = []
        let index = 2

        for (const key in body) { 
            if (!allowedFields.includes(key)) continue
            
            fields.push(`${key} = $${index}`) 
            values.push(body[key])
            index++
        }
        if (fields.length === 0) {
            return res.status(400).json({message: "Nenhum campo fornecido para a atualização"})
        }
        
        const query = `update pirates set ${fields.join(", ")} where id = $1 returning *`

        const { rows } = await pool.query(query, [id, ...values])
        
        if (rows.length === 0) {
            return res.status(404).json({message: "Pirata não encontrado"})
        }

        res.json(rows[0])
    } catch(err) {
        next(err)
    }
})


// ROTA DELETE
app.delete("/pirates/:id", verificarId, async function(req, res, next) {
    try {    
        const { id } = req.params
        
        const { rows } = await pool.query('delete from pirates where id = $1 returning *', [id])

        if (rows.length === 0) {
            return res.status(404).json({message:"O id do pirata não existe"})
        }
        res.status(200).json({
            message: "Pirata removido com sucesso",
            pirate: rows[0]
        })
    }
    catch (erro) {
        next(erro)
    }
})

// Middlewares de erro.
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json ({
        mensagem: err.message || 'Erro interno do servidor',
        erro: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
})