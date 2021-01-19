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

// PUT /cart/userId/checkout
router.put('/:id/checkout', async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.id, {
      include: [{model: Property}]
    })
    if (user === null) {
      return res.status(500).send('User not found.')
    }
    let userProperties = await user.getProperties()

    userProperties.map(async property => {
      property.status = 'sold'
      await property.save()
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

router.put('/:id/:propertyId', async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.id, {
      include: [{model: Property}]
    })

    let propertyWereSearchingFor = await Property.findByPk(
      req.params.propertyId
    )
    if (propertyWereSearchingFor === null) {
      return res.status(404).send('Property not found.')
    }
    propertyWereSearchingFor.status = 'available'
    await propertyWereSearchingFor.save()

    let numOfPropertiesRemoved = await user.removeProperties(
      req.params.propertyId
    )
    res.json({numOfPropertiesRemoved})
  } catch (error) {
    next(error)
  }
})

//POST route adds a property to a user
//this represents a user adding to its cart
//route also changes property status to inCart
router.post('/:id/:propertyId', async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.id, {
      include: [{model: Property}]
    })
    if (user === null) {
      return res.status(500).send('User not found.')
    }

    let propertyWereSearchingFor = await Property.findByPk(
      req.params.propertyId
    )
    if (propertyWereSearchingFor === null) {
      return res.status(404).send('Property not found.')
    }

    propertyWereSearchingFor.status = 'inCart'
    await propertyWereSearchingFor.save()

    let propertyInLineToBeAddedToCart = await user.addProperty(
      propertyWereSearchingFor
    )
    res.json(propertyInLineToBeAddedToCart)
  } catch (error) {
    next(error)
  }
})

// router.get('/:id/pastorders', async (req, res, next) => {
//   try {
//     let user = await User.findByPk(req.params.id, {
//       include: [{model: Property, where: { status: 'sold' }}]
//     })
//     res.send(user)
//   } catch (error) {
//     next(error)
//   }
// })
