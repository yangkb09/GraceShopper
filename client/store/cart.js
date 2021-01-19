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

export const _addToCart = (userId, property) => async dispatch => {
  try {
    console.log('IN ADD TO CART FROM SINGLE PROPERTY', property.id)
    await axios.post(`/api/cart/${userId}/${property.id}`)
    dispatch(addToCart(property))
  } catch (error) {
    console.log('Could not add to cart.', error)
  }
}

export const _getUserCart = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/cart/${id}`)
    dispatch(setUserCart(data.properties))
  } catch (error) {
    console.log('No cart found.', error)
  }
}

export const _cartCheckout = userId => async dispatch => {
  try {
    await axios.put(`/api/cart/${userId}/checkout`)
    dispatch(_getUserCart(userId))
  } catch (error) {
    console.log('Could not checkout. Try again later.', error)
  }
}

export const _removeFromCart = (user, propertyId) => async dispatch => {
  try {
    await axios.get(`/api/cart/${user.id}`)
    await axios.put(`/api/cart/${user.id}/${propertyId}`, user)
    dispatch(removeFromCart(propertyId))
  } catch (err) {
    console.log(err)
  }
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
