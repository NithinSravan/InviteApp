const express = require('express')
const Invitation = require('../models/invitation')
const auth = require('../middleware/auth')
const router = new express.Router()



router.get('/feeds', (req, res) => {
    res.render('feeds', {
        title: 'feeds',
        invitetitle: 'Shaadi',
        invitebody: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus hic, minus temporibus dolorem obcaecati eos aliquam non numquam nobis delectus!'
    })
})
router.post('/create', auth,async (req, res) => {
     const invitation = new Invitation({
         ...req.body,
         owner: req.user._id
     })

    try {
         await invitation.save()
        res.redirect(`/feeds`)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/invitations', auth, async (req, res) => {
    try {
        await req.user.populate('invitations').execPopulate()
        res.send(req.user.invitations)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/invitations/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const invitation = await Invitation.findOne({ _id, owner: req.user._id })

        if (!invitation) {
            return res.status(404).send()
        }

        res.send(invitation)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router