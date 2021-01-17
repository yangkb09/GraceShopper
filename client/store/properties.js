import axios from 'axios'
const SET_PROPERTIES = 'SET_PROPERTIES'

export const setProperties = properties => ({
  type: SET_PROPERTIES,
  properties
})

export const _getProperties = () => async dispatch => {
  try {
    const properties = await axios.get('/api/properties')
    dispatch(setProperties(properties.data))
  } catch (error) {
    console.log('No properties found.', error)
  }
}

const initialState = []
const propertiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROPERTIES:
      return [...action.properties]
    default:
      return state
  }
}

export default propertiesReducer
