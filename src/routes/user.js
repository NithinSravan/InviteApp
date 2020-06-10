const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/signup', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        // res.status(201).send({ user, token })
        res.redirect(`/dashboard/${user.id}/${token}`)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/dashboard/:id/:token', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).send()
        }
        res.render('dashboard', { title: `${user.name}` })
    } catch (e) {
        res.status(500).send()
    }


})
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // res.status(201).send({ user, token })
        res.redirect(`/dashboard/${user.id}/${token}`)
    } catch (e) {
        res.status(400).send({ message: "Kindly STFU and type the proper credentials" })
    }
})
router.get('/logout', async (req, res) => {
    res.render('index', { title: 'Home' })
})
router.post('/logout', auth, async (req, res) => {
    try {
        console.log('logout')
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.redirect(`/`)
    } catch (e) {
        res.status(500).send()
    }
})
router.get('/pp', async (req, res) => {
    try {

        res.render('profile-page', {
            title: 'Profile',
            name: `Nithin`,
            email: `nithin@gmail.com`
        }
        )
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router