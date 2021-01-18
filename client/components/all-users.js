import React from 'react'
import {connect} from 'react-redux'
import {_getUsers} from '../store/users'

export class AllUsers extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getUsers()
    console.log("here's the props", this.props)
  }

  render() {
    if (this.props.users) {
      return (
        <div>
          {this.props.users.map(user => {
            return (
              <div key={user.id}>
                <div>
                  Name: {user.name}
                  Email: {user.email}
                </div>
              </div>
            )
          })}
        </div>
      )
    } else {
      return (
        <div>
          <p>
            Not one user in your database! But then.... how are you an
            administrator?
          </p>
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
