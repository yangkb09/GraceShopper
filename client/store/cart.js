import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'

export const addToCart = property => ({
  type: ADD_TO_CART,
  property
})

export const _addToCart = property => async dispatch => {
  try {
    const cart = await axios.post('/api/carts', property)
    dispatch(addToCart(cart.data))
  } catch (error) {
    console.log('could not add to cart!', error)
  }
}

const initialState = []
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.property]
    default:
      return state
  }
}

export default cartReducer
