const router = require('express').Router()
const {Property} = require('../db/models')
module.exports = router

const isAdmin = (req, res, next) =>
  req.user.isAdmin ? next() : res.send('Access Denied.')

router.get('/', async (req, res, next) => {
  try {
    const properties = await Property.findAll()
    res.json(properties)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const property = await Property.findByPk(req.params.id, {
      include: ['name', 'imageUrl', 'address', 'price', 'description']
    })
    res.json(property)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let {name, imageUrl, address, price, description} = req.body
    const newProperty = await Property.create({
      name,
      imageUrl,
      address,
      price,
      description
    })
    res.json(newProperty)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Property.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const property = await Property.findByPk(req.params.id)
    await property.update(req.body)
    res.json(property)
  } catch (error) {
    next(error)
  }
})
