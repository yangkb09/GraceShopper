import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const GET_USER_CART = 'GET_USER_CART'

export const addToCart = property => ({
  type: ADD_TO_CART,
  property
})

export const getUserCart = user => ({
  type: GET_USER_CART,
  user
})

export const _addToCart = property => async dispatch => {
  try {
    const cart = await axios.post('/api/carts', property)
    dispatch(addToCart(cart.data))
  } catch (error) {
    console.log('Could not add to cart!', error)
  }
}

export const _getUserCart = user => async dispatch => {
  try {
    const loggedInGuy = await axios.get('/api/users', {
      where: {
        userId: user.id
      }
    })
    //so here I'm trying to find the user whose cart this is. I'm hoping to find it like this ^^^ but SAFEWORD: PICKLES
    dispatch(getUserCart(loggedInGuy.data))
  } catch (error) {
    console.log('Could not find your cart!', error)
  }
}

const initialState = []
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.property]
    case GET_USER_CART:
      return [...state, action.user]
    default:
      return state
  }
}

export default cartReducer
