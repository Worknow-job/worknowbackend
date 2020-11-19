const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jwtSecret = require('../../config/secret').jwtSecret
const db = require('../../data/dbConfig')

router.post('/register/users', async (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash

    const check = await db('users').where("email", user.email)
    
    if (check.length > 0) {
        res.status(401).json({ message: 'email already exist!'})
    } else {
        try {
            const result = await db('users').insert(user)
            res.status(201).json(result)   
        } catch(error) {
          res.status(500).json({ message: 'error in the database'})
      }
    }
})

router.post('/register/workers', async (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 12)
    user.password = hash

    const check = await db('workers').where("email", user.email)

    if (check.length > 0) {
        res.status(401).json({ message: 'email already exist!!!!!'})
    } else {
        try{
            const result = await db('workers').insert(user)
            res.status(201).json(result)
        } catch(error) {
            res.status(500).json({ message: 'error in database'})
        }
    }

    const result = await db('workers').insert(user)

    if (result) {
        res.status(201).json(result)
    } else {
        res.status(500).json({ message: 'error broski'})
    }
})

router.post('/login/users', async (req, res) => {
    let body = req.body

    if (body) {
        const user = await db('users').where({email: body.email}).first()

        if (user || bcrypt.compareSync(body.password, user.password)) {
            const token = generateToken(user)
            res.status(200).json({ token, message: `Welcome young master ${user.firstName}`, userID: user.id })
        } else {
            res.status(401).json({ message: 'Invalid Credentials' })
        }
    } else {
        res.status(500).json({ message: 'error error'})
    }
})

router.post('/login/workers', async (req, res) => {
    let body = req.body

    if (body) {
        const workers = await db('workers').where({email: body.email}).first()

        if (workers || bcrypt.compareSync(body.password, workers.password)) {
            const token = generateToken(workers)
            res.status(200).json({ token, message: `Welcome young master ${workers.firstName}`, workersID: workers.id})
        } else {
            res.status(401).json({ message: 'Invalid Credentials' })
        }
    } else {
        res.status(500).json({ message: 'error error'})
    }
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        firstName: user.firstName
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, jwtSecret, options)
}

function generateToken(workers) {
    const payload = {
        subject: workers.id,
        firstName: workers.firstName
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, jwtSecret, options)
}


module.exports = router