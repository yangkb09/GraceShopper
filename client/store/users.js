import axios from 'axios'
const SET_USERS = 'SET_USERS'
//The administrator view requires a reducer for all users.

export const setUsers = users => ({
  type: SET_USERS,
  users
})

export const _getUsers = () => async dispatch => {
  try {
    const users = await axios.get('/api/users')
    dispatch(setUsers(users.data))
  } catch (error) {
    console.log('Could Not Get Users!', error)
  }
}

const initialState = []

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return [...action.users]
    default:
      return state
  }
}

export default usersReducer
