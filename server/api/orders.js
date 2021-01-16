const router = require('express').Router()
const {Order} = require('../db/models/cart')
const {Property} = require('../db/models')

module.exports = router

const isAdmin = (req, res, next) =>
  req.user.isAdmin ? next() : res.send('Access Denied.')

router.get('/', async (req, res, next) => {
  try {
    console.log('req.body ', req.body)
    console.log('req.params ', req.params)
    const orders = await Property.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
