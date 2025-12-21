const express = require('express')
const app = express()
const pool = require('./database')

const piratesRoutes = require('./routes/pirates.routes')

app.use(express.json())

app.use("/pirates", piratesRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json ({
        mensagem: err.message || 'Erro interno do servidor',
        erro: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
})

app.listen(3000, () => {
    console.log("API funcionando")
})