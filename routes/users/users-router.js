const router = require('express').Router()
const db = require('../../data/dbConfig')
const restricted = require('../auth/restricted-middleware')

// router.get('/users', restricted, async (req, res) => {
//     const users = await db('users')
//     res.status(200).json(users)
// })

router.get('/users',  async (req, res) => {
    const users = await db('users')
    res.status(200).json(users)
})

router.post('/users', async (req, res) => {
    const { email, password } = req.body

    if (email && password) {
        const result = await db('users').insert(req.body)
        res.status(201).json(result)
    } else {
        res.status(422).json({ message: ' We are missing email and password info'})
    }
})

router.get('/users/:id', async (req, res) => {
    const id = req.params.id

    try {
        const result = await db('users').where({id})
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(400).json({ message: 'No specific ID found'})
        }
    } catch(error) {
        res.status(500).json(error)
    }
})

router.delete('/users/:id', async (req, res) => {
    const id = req.params.id
    const result = await db('users').where({id}).delete()

    res.status(200).json(result)
})

router.put('/users/:id', async (req, res) => {
    const id = req.params.id  
    try {
        const { email, password } = req.body
        if (email && password) {
            const updateInfo = await db('users').where({id}).update(req.body)
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

router.get('/jobs', async (req, res) => {
    const jobs = await db('jobs')
    res.status(200).json(jobs)
})



router.post('/jobs', async (req, res) => {
    const { jobTitle, description, pay } = req.body

    if (jobTitle && description && pay) {
        const result = await db('jobs').insert(req.body)
        res.status(201).json(result)
    } else {
        res.status(422).json({ message: ' We are missing info'})
    }
 })

router.get('/jobs/:id', async (req, res) => {
    const id = req.params.id

    try {
        const result = await db('jobs').where({id})
        if (result) {
            res.status(200).json(result)
        } else {
            res.status(400).json({ message: 'No specific ID found'})
        }
    } catch(error) {
        res.status(500).json(error)
    }
})

router.delete('/jobs/:id', async (req, res) => {
    const id = req.params.id
    const result = await db('jobs').where({id}).delete()

    res.status(200).json(result)
})

router.put('/jobs/:id', async (req, res) => {
    const id = req.params.id  
    try {
        const { jobTitle , description , pay } = req.body
        if ( jobTitle && description && pay) {
            const updateInfo = await db('jobs').where({id}).update(req.body)
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



module.exports = router