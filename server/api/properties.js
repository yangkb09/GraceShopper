const router = require('express').Router()
const {Property} = require('../db/models')
module.exports = router

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
    const property = await Property.findByPk(req.params.id)
    res.json(property)
  } catch (error) {
    next(error)
  }
})
