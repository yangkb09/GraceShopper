const router = require('express').Router()
const {User, Property} = require('../db/models')

module.exports = router

const isAdmin = (req, res, next) =>
  req.user.isAdmin ? next() : res.send('Access Denied.')

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await User.findByPk(req.params.id, {
      include: [{model: Property}]
    })
    console.log(cart)
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
