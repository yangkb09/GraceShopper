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
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.put('/:id/:propertyId', async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.id, {
      include: [{model: Property}]
    })
    let newCart = await user.removeProperties(
      user.dataValues.properties[req.params.propertyId]
    )
    user.dataValues.properties = newCart
    res.json(user.dataValues.properties)
  } catch (error) {
    next(error)
  }
})
