const router = require('express').Router()
const db = require('../../data/dbConfig')
const restricted = require('../auth/restricted-middleware')

router.get('/workers', async (req, res) => {
    const workers = await db('workers')
    res.status(200).json(workers)
})

router.post('/workers', restricted, async (req, res) => {
    const { email, password } = req.body

    if (email && password) {
        const result = await db('workers').insert(req.body)
        res.status(201).json(result)
    } else {
        res.status(422).json({ message: ' We are missing email and password info'})
    }
})

router.get('/workers/:id', restricted, async (req, res) => {
    const id = req.params.id

    try {
        const result = await db('workers').where({id})
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(400).json({ message: 'No specific ID found'})
        }
    } catch(error) {
        res.status(500).json(error)
    }
})

router.delete('/workers/:id', restricted, async (req, res) => {
    const id = req.params.id
    const result = await db('workers').where({id}).delete()

    res.status(200).json(result)
})

router.put('/workers/:id', restricted, async (req, res) => {
    const id = req.params.id  
    try {
        const { email, password } = req.body
        if (email && password) {
            const updateInfo = await db('workers').where({id}).update(req.body)
            if (updateInfo) {
                res.status(200).json(updateInfo)
            } else {
                res.status(404).json({ message: "The user with the specific id does not exist."})
            }
        } else {
           res.status(400).json({ message: "Missing required info"})
        }
    } catch(error) {
        res.status(500).json(error)
    }
})