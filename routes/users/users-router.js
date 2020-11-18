const router = require('express').Router()
const db = require('../../data/dbConfig')
const restricted = require('../auth/restricted-middleware')

router.get('/users', restricted, async (req, res) => {
    const users = await db('users')
    res.status(200).json(users)
})

router.post('/users', restricted, async (req, res) => {
    const { email, password } = req.body

    if (email && password) {
        const result = await db('users').insert(req.body)
        res.status(201).json(result)
    } else {
        res.status(422).json({ message: ' We are missing email and password info'})
    }
})

router.get('/users/:id', restricted, async (req, res) => {
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

router.delete('/users/:id', restricted, async (req, res) => {
    const id = req.params.id
    const result = await db('users').where({id}).delete()

    res.status(200).json(result)
})

router.put('/users/:id', restricted, async (req, res) => {
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

router.get('/jobs', (req, res) => {
    db.getJobs().then(jobs => {
        res.status(200).json({jobs});
    }).catch(err =>res.status(500).json({error: err, message: 'internal server error'}))
})

router.post('/restricted/jobs', restricted, (req,res) => {
    const body = req.body;
    db.insertJob(body).then(job => {
        res.status(201).json({message:'added job with the following data!', job: body})
    }).catch(err=> res.status(500).json({error: err, message: 'internal server error'}))
});

router.get('/restricted/jobs/:id', restricted, (req,res) => {
    const id = req.params.id;
    db.getUserjobs(id).then(jobs => {
        res.status(200).json(jobs);
    })
});

router.get('/restricted/jobs/:id', restricted, (req,res) => {
    const id = req.params.id;
    db.getUserJobs(id).then(jobs => {
        res.status(200).json(jobs);
    })
});

router.delete('/restricted/jobs/:id', restricted, (req,res) => {
    const id = req.params.id;
    db.remove(id).then( del => {
        res.status(200).json({message: 'job has been deleted', del})
    }).catch(err=> res.status(500).json({err}))
})

router.put('/restricted/jobs/:id', restricted, (req,res) => {
    const id = req.params.id;
    const body = req.body;
    db.update(id, body).then(job => {
        res.status(200).json({message: 'the job has been updated'})
    }).catch(err=> res.status(500).json({error: err, message: 'internal server error'}))
})


module.exports = router