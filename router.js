const router = require('express').Router()

const todos = [{
    id: 3125,
    title: "eat breakfast"
}]


router.get('/', (req, res) => {
    res.render('index', {
        todos
    })
})

router.post('/', (req, res) => {
    req.checkBody('title', 'Title is required').notEmpty()
    req.getValidationResult().then(function (result) {
        const err = result.array()
        if (err.length <= 0) {
            const data = req.body
            data.id = Math.floor((Math.random() * 10000))
            todos.push(data)
        }
        res.render('index', {
            err,
            todos
        })
    })
})
router.get('/edit/:id', (req, res) => {
    const {
        id
    } = req.params
    const todo = todos.find(todo => {
        return todo.id == id
    })
    res.render('edit', {
        todo
    })
})

router.put('/update/:id', (req, res) => {
    const {
        id
    } = req.params

    req.checkBody('title', 'Title is required').notEmpty()
    req.getValidationResult().then(function (result) {
        const err = result.array()
        if (err.length > 0) {
            const todo = todos.find(todo => {
                return todo.id == id
            })
            
            res.redirect('/edit/' + id)
        } else {
            todos.map(todo => {
                if (todo.id == id) {
                    todo.title = req.body.title
                }
            })
            res.redirect('/')
        }
    })
})
router.delete('/delete/:id', (req, res) => {
    const {
        id
    } = req.params

    todos.map((todo, index) => {
        if (todo.id == id) {
            todos.splice(index, 1)
        }
    })
    res.redirect('/')
})


module.exports = router