const router = require("express").Router();
const { connectClient } = require("../db/postgres");
const Todo = require("../src/models/todoModel");

// Index
router.get("/", async (req, res) => {
    const client = await connectClient();
    try {
        const result = await client.query("SELECT * FROM todos");
        res.render('todos/index', { todos: result.rows });
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        await client.end();
    }
});

// Store
router.post("/", async (req, res) => {
    try {
        const {title, completed} = req.body;
        await Todo.create({ title, completed: completed == 'on' ? true : false });
        res.redirect('/todospanel');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;