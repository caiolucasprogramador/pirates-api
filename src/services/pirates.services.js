const pool = require('../database')

async function findAllPirates() {
    const { rows } = await pool.query("select * from pirates")
    return rows
}

module.exports =  {
    findAllPirates
}