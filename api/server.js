const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const server = express()

const usersRouter = require('../routes/users/users-router')
// const driverRouter = require('../routes/drivers/driver-router')
const workersRouter = require('../routes/workers/workers-router')
const authRouther = require('../routes/auth/auth-router')

server.use(express.json(), helmet(), cors())
server.use(usersRouter)
// server.use(driverRouter)
server.use(authRouther)
server.use(workersRouter)

server.get('/', (req, res) => {
    res.status(200).json({ api: "WorkToday server up and running"})
})

module.exports = server