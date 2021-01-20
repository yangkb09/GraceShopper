import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProperty} from '../store/single-property'
import {_addToCart} from '../store/cart'

class SingleProperty extends React.Component {
  componentDidMount() {
    try {
      this.props.loadSingleProperty(this.props.match.params.id)
    } catch (error) {
      console.log(error.message)
    }
  }

  render() {
    if (!this.props.property) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h2>{this.props.property.name}</h2>
        <img width={500} src={this.props.property.imageUrl} />

        <div>Price: {this.props.property.price}</div>

        <div>Description:</div>
        <div text-align="center">{this.props.property.description}</div>

        {this.props.isLoggedIn ? (
          <button
            type="button"
            onClick={() => {
              this.props.addToCart(this.props.user.id, this.props.property)
            }}
          >
            Add to Cart
          </button>
        ) : (
          <button type="button">Add to Cart</button>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    property: state.property
  }
}

const mapDispatch = dispatch => ({
  loadSingleProperty: id => dispatch(fetchSingleProperty(id)),
  addToCart: (userId, property) => dispatch(_addToCart(userId, property))
})

export default connect(mapState, mapDispatch)(SingleProperty)
