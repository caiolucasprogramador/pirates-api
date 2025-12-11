const express = require('express')
const fs = require('fs')

const app = express()
const pirates = require("./pirates.json")


app.use(express.json())

// MIDDLEWARES:
function verificarPirata(req, res, next) {
    const { id } = req.params
    const pirate = pirates.find(p => p.id === parseInt(id))

    if (!pirate) {
        return res.status(404).json({message: "O pirata não existe!"})
    }

    res.pirate = pirate
    next()
}

function indicePirata(req, res, next) {
    const index = pirates.findIndex(p => p.id === res.pirate.id)
    if (index === -1) {
        return res.status(404).json({message: "Índice não encontrado"})
    }
    res.pirateIndex = index
    next()
}

function validarCampos(req, res, next) {
    const newPirate = req.body
    const { name, role } = newPirate
    if (!name || !role) {
        return res.status(400).json({message: "Os campos Nome e Cargo do pirata são obrigatórios"})
    }
    res.newPirate = newPirate
    
    next()
}

function encontrarProximoId(req, res, next) {
    const newId = pirates.length > 0 ? Math.max(...pirates.map(p => p.id)) + 1 : 1
    res.newId = newId
    
    next()
}

app.listen(3000, function() {
    console.log("API funcionando")
})


// ROTA GET
// geral
app.get("/pirates", function(req, res) {
    res.json(pirates)
})
// individual
app.get("/pirates/:id", verificarPirata, function(req, res) {
    res.json(res.pirate)
})

// ROTA POST
app.post("/pirates", validarCampos, encontrarProximoId, function(req, res, next) {
    try {
        res.newPirate.id = res.newId
        pirates.push(res.newPirate)

        fs.writeFileSync('./pirates.json', JSON.stringify(pirates, null, 2))

        console.log("Arquivo adicionado!")
        res.status(201).json(res.newPirate);
    } catch (erro) {
        next(erro)
    }
})

// ROTA PUT
app.put("/pirates/:id", verificarPirata, indicePirata, function(req, res, next) {
    try {
        const rePirate = req.body

        pirates[res.pirateIndex] = {...pirates[res.pirateIndex], ...rePirate, id: pirates[res.pirateIndex].id}

        fs.writeFileSync('./pirates.json', JSON.stringify(pirates, null, 2))

        console.log("Arquivo alterado")
        res.json(pirates[res.pirateIndex])
    }
    catch (erro) {
        next(erro)
    }
})

// ROTA DELETE
app.delete("/pirates/:id", verificarPirata, indicePirata, function(req, res, next) {
    try {    
        const deletedPirated = pirates.splice(res.pirateIndex, 1)
        
        fs.writeFileSync('./pirates.json', JSON.stringify(pirates, null, 2))

        res.status(200).json({
            message: "Pirata removido com sucesso",
            pirate: deletedPirated[0]
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