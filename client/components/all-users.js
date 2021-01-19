import React from 'react'
import {connect} from 'react-redux'
import {_getUsers} from '../store/users'

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    //If the user is not an administrator,
    //the action sends an empty string to this.props.users.
    if (this.props.users.length === 0) {
      return (
        <div>
          <p>Access Denied.</p>
        </div>
      )
    } else {
      return (
        <div>
          {this.props.users.map(user => {
            return (
              <div key={user.id}>
                <div>
                  ID: {user.id}
                  &nbsp; Email: {user.email}
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(_getUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
