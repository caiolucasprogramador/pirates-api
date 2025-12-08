const express = require('express')
const fs = require('fs')

const app = express()
const pirates = require("./pirates.json")


app.use(express.json())

app.listen(3000, function() {
    console.log("API funcionado")
})


// ROTA GET
// geral
app.get("/pirates", function(req, res) {
    res.json(pirates)
})
// individual
app.get("/pirates/:id", function(req, res) {
    const { id } = req.params
    const resp = pirates.find(pirate => pirate.id === parseInt(id))
    if (!resp) {
        console.log("Pirata não existe")
        return res.status(404).json({message: "Pirata não existe"})
    }
    res.json(resp)
})

// ROTA POST
app.post("/pirates", function(req, res) {
    const newPirate = req.body
    if (!newPirate.name || !newPirate.role) {
        console.log("Nome e cargo de pirata obrigatórios!")
        return res.status(400).json({message: "Nome e cargo de pirata obrigatórios!"})
    }
    const newId = pirates.length > 0 ? Math.max(...pirates.map(pirate => pirate.id)) + 1 : 1
    newPirate.id = newId

    pirates.push(newPirate)
    fs.writeFileSync('./pirates.json', JSON.stringify(pirates, null, 2))

    console.log("Arquivo adicionado!")
    res.status(201).json(newPirate);
})

// ROTA PUT
app.put("/pirates/:id", function(req, res) {
    const { id } = req.params
    const rePirate = req.body

    const index = pirates.findIndex(pirate => pirate.id === parseInt(id))
    if (index === -1) {
      return res.status(404).json({message: "Pirata não encontrado"})
    }
    pirates[index] = {...pirates[index], ...rePirate, id: pirates[index].id}

    fs.writeFileSync('./pirates.json', JSON.stringify(pirates, null, 2))

    console.log("Arquivo alterado")
    res.json(pirates[index])
})

// ROTA DELETE
app.delete("/pirates/:id", function(req, res) {
    const { id } = req.params
    const index = pirates.findIndex(pirate => pirate.id === parseInt(id))

    if (index === -1) {
        return res.status(404).json({message: "Este pirata não existe"})
    }
    const deletedPirated = pirates.splice(index, 1)
    
    fs.writeFileSync('./pirates.json', JSON.stringify(pirates, null, 2))
    res.status(200).json({
        message: "Pirata removido com sucesso",
        pirate: deletedPirated[0]
    })
})