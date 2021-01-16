import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import _getUser from '../store/user'

export class Cart extends React.Component {
  componentDidMount() {
    console.log('at componentDidMount')
    this.props.getUser(this.props.match.params.id)
  }

  render() {
    console.log('at render')
    const cartItems = this.props.user.properties || []
    console.log('this.props:', this.props)
    console.log('cartItems', cartItems)

    if (!this.props.user) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>
          {cartItems.map(property => {
            return (
              <div key={property.id}>
                <Link key={property.id} to={`/properties/${property.id}`}>
                  {property.name}
                </Link>
                <button type="button">Delete</button>
              </div>
            )
          })}
        </h3>
      </div>
    )
  }
}

const mapState = state => {
  console.log('at mapState')
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  console.log('at mapDispatch')
  return {
    getUser: id => dispatch(_getUser(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
