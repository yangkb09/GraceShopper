const router = require('express').Router()
const {User, Property} = require('../db/models')

module.exports = router

const isAdmin = (req, res, next) =>
  req.user.isAdmin ? next() : res.send('Access Denied.')

router.get('/:id', async (req, res, next) => {
  try {
    console.log('req.body ', req.body)
    console.log('req.params ', req.params)
    const cart = await User.findByPk(req.params.id, {
      include: [{model: Property}]
    })
    console.log('api/cart: ', cart)
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
