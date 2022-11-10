const bcrypt = require('bcrypt')
const { request, response } = require('express')
const userRouter = require('express').Router()
const User = require('../modules/user')

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username, 
        name, 
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)

})

module.exports = userRouter