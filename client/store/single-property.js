import axios from 'axios'

const SET_SINGLE_PROPERTY = 'SET_SINGLE_PROPERTY'

const setSingleProperty = property => ({
  type: SET_SINGLE_PROPERTY,
  property
})

export const fetchSingleProperty = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/properties/${id}`)
      dispatch(setSingleProperty(data))
    } catch (err) {
      console.log(err.message)
    }
  }
}

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_PROPERTY:
      return action.property
    default:
      return state
  }
}
