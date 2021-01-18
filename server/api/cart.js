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
    let numOfPropertiesRemoved = await user.removeProperties(
      req.params.propertyId
    )
    res.json({numOfPropertiesRemoved})
  } catch (error) {
    next(error)
  }
})

//to try this route seed your database - refresh localhost
// - send a put request in postman with http://localhost:8080/api/cart/1/1
// refresh the localhost again in the browser and one of the properties
// will no longer be seen
