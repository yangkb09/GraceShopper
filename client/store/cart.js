import axios from 'axios'

const ADD_TO_CART = 'ADD_TO_CART'
const GET_USER_CART = 'GET_USER_CART'

export const addToCart = property => ({
  type: ADD_TO_CART,
  property
})

export const setUserCart = properties => ({
  type: GET_USER_CART,
  properties
})

export const _addToCart = property => async dispatch => {
  try {
    const cart = await axios.post('/api/carts', property)
    dispatch(addToCart(cart.data))
  } catch (error) {
    console.log('Could not add to cart.', error)
  }
}

export const _getUserCart = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/${id}`)
    //so here I'm trying to find the user whose cart this is. I'm hoping to find it like this ^^^ but SAFEWORD: PICKLES
    console.log('_getUserCart data', data)
    dispatch(setUserCart(data.properties))
  } catch (error) {
    console.log('No cart found.', error)
  }
}

const initialState = []
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.property]
    case GET_USER_CART:
      return action.properties
    default:
      return state
  }
}

export default cartReducer
