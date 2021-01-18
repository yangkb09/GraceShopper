import axios from 'axios'

const SET_USERS = 'SET_USERS'
const GET_USERS = 'GET_USERS'
//The administrator view requires a reducer for all users.

export const setUsers = users => ({
  type: SET_USERS,
  users
})

export const getUsers = users => ({
  type: GET_USERS,
  users
})

export const _getUsers = () => async dispatch => {
  try {
    const users = await axios.get('/api/users')
    console.log("here's the users", users)
    dispatch(getUsers(users.data))
  } catch (error) {
    console.log('Could Not Get Users!', error)
  }
}

const initialState = []

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return [...action.users]
    case GET_USERS:
      return [...action.users]
    default:
      return state
  }
}

export default usersReducer
