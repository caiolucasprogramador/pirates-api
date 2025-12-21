const express = require('express')
const router = express.Router()

const validarCampos = require('../middlewares/validarCampos')
const verificarId = require('../middlewares/verificarId')
const {
    getAllPirates,
    getPirateById,
    createPirate,
    updatePirate,
    patchPirate,
    deletePirate
} = require('../controllers/pirates.controller')

router.get("/", getAllPirates)
router.get("/:id", verificarId, getPirateById)

router.post("/", validarCampos, createPirate)

router.put("/:id", verificarId, validarCampos, updatePirate)
router.patch("/:id", verificarId, patchPirate)

router.delete("/:id", verificarId, deletePirate)

module.exports = router