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
router.post('/',async (req,res)=> {
    await client.connect()
    const result = await 
    client.query('INSERT INTO todos (title, completed) VALUES ($1, $2)'
    , [req.body.title, req.body.completed])
    console.log(result)
    await client.end() 
    res.status(201).send('Todo created')
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