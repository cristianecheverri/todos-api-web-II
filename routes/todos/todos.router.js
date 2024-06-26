const router = require("express").Router();
const Todo = require("../../src/models/todoModel");

// router.use((req, res, next) => {
//     if (req.user) {
//         next();
//     } else {
//         req.session.returnTo = req.originalUrl;
//         res.redirect('/auth/signIn');
//     }
// })

// Index
router.get("/", async (req, res) => {
    try {
        const result = await Todo.findAll();
        res.render('todos/index', { todos: result });
    } catch (error) {
        res.status(500).send(error.message);
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

// Show
router.get("/:id", async (req, res) => {
    try {
        const result = await Todo.findByPk(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update
router.post("/:id", async (req, res) => {
    try {
        const {title, completed} = req.body;
        await Todo.update({ title, completed: completed == 'on' ? true : false }, { where: { id: req.params.id } });
        res.redirect('/todospanel');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete
router.delete("/:id", async (req, res) => {
    try {
        await Todo.destroy({ where: { id: req.params.id } });
        res.json({ success: true });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;