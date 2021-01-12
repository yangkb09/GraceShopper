import axios from 'axios'
const SET_PROPERTIES = 'SET_PROPERTIES'
const ADD_TO_CART = 'ADD_TO_CART'

export const setProperties = (properties) => ({
  type: SET_PROPERTIES,
  properties,
})

export const _addToCart = (property) => ({
  type: ADD_TO_CART,
  property,
})

export const _getProperties = () => async (dispatch) => {
  try {
    const properties = await axios.get('/api/properties')
    dispatch(setProperties(properties.data))
  } catch (error) {
    console.log('Could Not Get Properties!', error)
  }
}

const initialState = []
const propertiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROPERTIES:
      return [...action.properties]
    case ADD_TO_CART:
      return [...state, action.property]
    default:
      return state
  }
}

export default propertiesReducer
