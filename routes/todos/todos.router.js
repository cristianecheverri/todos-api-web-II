const router = require("express").Router();
const { index, store, show, update, deleteTodo, home } = require("../../src/controllers/todos");
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

router.get("/home", home);

// Index
router.get("/", index);

// Store
router.post("/", store);

// Show
router.get("/:id", show);

//update
router.post('/:id', update)

// Delete
router.delete("/:id", deleteTodo);

module.exports = router;