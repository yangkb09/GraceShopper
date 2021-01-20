import React from 'react'
import {connect} from 'react-redux'
import {_addToCart} from '../store/cart'
import {_getProperties} from '../store/properties'
import {Link} from 'react-router-dom'

// Notice that we're exporting the Allproperties component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.

export class AllProperties extends React.Component {
  componentDidMount() {
    this.props.getProperties()
  }

  render() {
    //SAFEWORD: FALAFEL
    const checkForUserCart = (id, property) => {
      if (this.props.user.id) {
        this.props.addToCart(this.props.user.id, property)
      } else {
        alert('Please make an account first!')
      }
    }

    if (this.props.properties.length > 0) {
      return (
        <div>
          {this.props.properties
            .filter(property => property.status !== 'sold')
            .map(property => {
              return (
                <div key={property.id}>
                  <div>
                    Name: {property.name}
                    <img src={property.imageUrl} alt="Property Image" />
                    Address: {property.address}
                    Price: ${property.price}
                    <Link to={`/properties/${property.id}`}>View Details</Link>
                    {this.props.isLoggedIn ? (
                      <button
                        type="button"
                        onClick={() => {
                          checkForUserCart(this.props.user.id, property)
                        }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button type="button">Add to Cart</button>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
      )
    } else {
      return (
        <div>
          <p>No properties for sale right now! Please come back soon.</p>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    properties: state.properties
  }
}

const mapDispatch = dispatch => {
  return {
    getProperties: () => dispatch(_getProperties()),
    addToCart: (userId, property) => dispatch(_addToCart(userId, property))
  }
}

export default connect(mapState, mapDispatch)(AllProperties)
