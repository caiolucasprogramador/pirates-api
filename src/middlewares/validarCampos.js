function validarCampos(req, res, next) {
    const { name, role } = req.body
    if (!name || !role) {
        return res.status(400).json({message: "Os campos Nome e Cargo do pirata são obrigatórios"})
    }
    
    next()
}

module.exports = validarCampos