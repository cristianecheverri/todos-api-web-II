const router = require("express").Router();
const Todo = require("../../src/models/todoModel");
const excludedRoutes = ['/home'];

router.use((req, res, next) => {
    const pathWithoutTrailingSlash = req.path.endsWith('/') 
        ? req.path.slice(0, -1) 
        : req.path;
    if (excludedRoutes.includes(pathWithoutTrailingSlash)) {
        next();
        return;
    }

    if (req.user) {
        next();
    } else {
        req.session.returnTo = req.originalUrl;
        res.redirect('/auth/signIn');
    }
});

router.get("/home", async (req, res) => {
    try {
        const result = await Todo.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        res.render('home', { user: req.user, todos: result});
    } catch (error) {
        res.status(500).send(error.message);
    }
    res.send('HOLA');
});

// Index
router.get("/", async (req, res) => {
    try {
        const result = await Todo.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        res.render('todos/index', { todos: result, user: req.user });
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
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;