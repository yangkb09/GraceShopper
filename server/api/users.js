const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//This validator sends an empty string in order to take advantage of type coercion.
const isAdmin = (req, res, next) => (req.user.isAdmin ? next() : res.send(''))

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // For user security, we explicitly request only the id and email fields.
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: ['email']
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    let {email, password} = req.body
    const newUser = await User.create({email, password})
    res.json(newUser)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.update(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})
