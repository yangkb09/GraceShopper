import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const GET_USER_CART = 'GET_USER_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const addToCart = property => ({
  type: ADD_TO_CART,
  property
})

export const setUserCart = properties => ({
  type: GET_USER_CART,
  properties
})

export const removeFromCart = propertyId => ({
  type: REMOVE_FROM_CART,
  propertyId
})

export const _addToCart = (property, user) => async dispatch => {
  try {
    const cart = await axios.update(`/api/cart/${user.id}`, property)

    dispatch(addToCart(cart.data))
  } catch (error) {
    console.log('Could not add to cart.', error)
  }
}

// router.put('/:robotId', async (req, res, next) => {
//   try {
//     const robot = await Robot.findByPk(req.params.robotId)
//     await robot.update(req.body)
//     res.send(robot)
//   } catch (error) {
//     next(error)
//   }
// })

export const _getUserCart = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/${id}`)
    //edited and now it works !!
    console.log('_getUserCart data', data)
    dispatch(setUserCart(data.properties))
  } catch (error) {
    console.log('No cart found.', error)
  }
}

export const _removeFromCart = (user, propertyId) => async dispatch => {
  // try {
  console.log('_removeFromCart user arg: ', user)
  console.log('_removeFromCart propertyId arg: ', propertyId)
  const userData = await axios.get(`/api/cart/${user.id}`)
  console.log('userData.data ', userData.data)
  const {data} = await axios.put(`/api/cart/${user.id}/${propertyId}`, user)
  console.log('DATA FROM REMOVEFROMCART: ', data)
  console.log('this is undef: ', userData.data.properties[propertyId])
  dispatch(removeFromCart(propertyId))
  // } catch (err) {
  //   console.log(err)
  // }
}

const initialState = []

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.property]
    case GET_USER_CART:
      return action.properties
    case REMOVE_FROM_CART:
      return state.filter(property => property.id !== action.propertyId)
    default:
      return state
  }
}

export default cartReducer
