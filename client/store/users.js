import axios from 'axios'

const GET_USERS = 'GET_USERS'
//The administrator view requires a reducer for all users.

export const getUsers = users => ({
  type: GET_USERS,
  users
})

export const _getUsers = () => async dispatch => {
  try {
    const users = await axios.get('/api/users')
    dispatch(getUsers(users.data))
  } catch (error) {
    console.log('Could Not Get Users!', error)
  }
}

const initialState = []

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return [...action.users]
    default:
      return state
  }
}

export default usersReducer
