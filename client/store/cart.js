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

export const removeFromCart = property => ({
  type: REMOVE_FROM_CART,
  property
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
  dispatch(removeFromCart(userData.data.properties[propertyId - 1]))
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
      return state.filter(property => property.id !== action.property.id)
    default:
      return state
  }
}

export default cartReducer
