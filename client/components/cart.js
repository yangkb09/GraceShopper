import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import _getUser from '../store/user'

export class Cart extends React.Component {
  componentDidMount() {
    // this.props.getUser(this.props.match.params.id)
    console.log('component mounting')
  }

  render() {
    const cartItems = this.props.user.properties || []
    console.log('this.props:', this.props)
    console.log('cartItems', cartItems)

    const friendlyHello = (
      <div>
        <p>Hello, I'm the cart!</p>
      </div>
    )

    if (!this.props.user) {
      return <div>Loading...</div>
    }

    if (cartItems.length > 1) return friendlyHello
    else
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
  return {
    user: state.user
  }
}

// const mapDispatch = dispatch => {
//   return {
//     getUser: id => dispatch(_getUser(id))
//   }
// }

export default connect(mapState, null)(Cart)
