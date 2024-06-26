const express = require('express')
const todosFilesRouter = require('./todos/todos.api.files.router')
const todosApiRouter = require('./todos/todos.api.router')
const todosRouter = require('./todos/todos.router')
const authRouter = require('./users/auth.router')

function routerTodos(app){
    const router = express.Router()
    app.use('/', router) 
    router.use('/todospanel', todosRouter)
    router.use('/api/v1/files/todos', todosFilesRouter)
    router.use('/api/v1/todos', todosApiRouter)
    router.use('/auth', authRouter)
}

module.exports = routerTodos