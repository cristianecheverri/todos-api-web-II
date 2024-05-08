const router = require('express').Router()

//index
router.get('/', (req, res) => {
    console.log('GET /api/v1/todos')
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