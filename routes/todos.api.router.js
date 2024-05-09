const router = require('express').Router()
const client = require('../db/postgres')

//index
router.get('/', async (req, res) => {
    //console.log('GET /api/v1/todos')
    //Obtener todos los "todos" de la BD
    //http://localhost:3000/api/v1/todos
    await client.connect()
    const result = await client.query('SELECT * FROM todos')
    console.log(result)
    await client.end()
    res.json(result.rows)
})

//store
router.post('/',(req,res)=> {
    console.log('POST /api/v1/todos')
})

//show
router.get('/:id', (req, res) => {
    console.log('GET /api/v1/todos/:id')
})

//Update
router.put('/:id', (req,res)=> {
    console.log('PUT /api/v1/todos/:id')
})

//Delete
router.delete('/:id', (req,res)=> {
    console.log('DELETE /api/v1/todos/:id')
})

module.exports = router