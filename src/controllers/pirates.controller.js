const pool = require("../database")
const { findAllPirates } = require("../services/pirates.services")

async function getAllPirates(req, res, next) {
    try {
        const pirates = await findAllPirates
        res.json(pirates)
    } catch(err) {
        next(err)
    }
}

async function getPirateById(req, res, next) {
    try {
        const { id } = req.params
        const { rows } = await pool.query('select * from pirates where id = $1', [id])

        if (rows.length === 0) {
            return res.status(404).json({message: "Pirata não encontrado."})
        }

        res.json(rows[0])
    } catch(err) {
        next(err)
    }
}

async function createPirate(req, res, next) {
    try {
        const { name, role, bounty, devilFruit } = req.body
        const query = `insert into pirates(name, role, bounty, devilFruit) 
        values($1, $2, $3, $4) returning *`
        
        const newPirate = await pool.query(query, [name, role, bounty, devilFruit])

        res.status(201).json(newPirate.rows[0])
    }
    catch(err) {
        next(err)
    }
}

async function updatePirate(req, res, next) {
    try {
        const { id } = req.params
        const { name, role, bounty, devilFruit } = req.body
        const query = `update pirates 
        set name = $2, role = $3, bounty = $4, devilFruit = $5
        where id = $1 returning *`

        const updatedPirate = await pool.query(query, [id, name, role, bounty, devilFruit])

        if (updatedPirate.rows.length === 0) {
            return res.status(404).json({message: "Pirata não encontrado."})
        }

        res.json(updatedPirate.rows[0])
    }
    catch(err) {
        next(err)
    }
}

async function patchPirate(req, res, next) {
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

        const query = `update pirates
        set ${fields.join(", ")} where id = $1 returning *`

        const { rows } = await pool.query(query, [id, ...values])

        if (rows.length === 0) {
            return res.status(404).json({message: "Pirata não encontrado."})
        }

        res.json(rows[0])
    }
    catch(err) {
        next(err)
    }
}

async function deletePirate(req, res, next) {
    try {
        const { id } = req.params

        const deletedPirate = await pool.query(`delete from pirates where id = $1 returning *`, [id])

        if (deletedPirate.rows.length === 0) {
            return res.status(404).json({message: "Pirata não encontrado."})
        }


        res.json({message: "Pirata removido com sucesso", pirate: deletedPirate.rows[0]})
    }
    catch(err) {
        next(err)
    }
}

module.exports = {
    getAllPirates,
    getPirateById,
    createPirate,
    updatePirate,
    patchPirate,
    deletePirate
}