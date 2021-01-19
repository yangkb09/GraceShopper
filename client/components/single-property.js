import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProperty} from '../store/single-property'
import {_addToCart} from '../store/cart'
import {_getProperties} from '../store/properties'

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

    console.log('SINGLE VIEW PROPERTY', this.props.property)
    return (
      <div>
        <h2>{this.props.property.name}</h2>
        <img width={500} src={this.props.property.imageUrl} />

        <div>Price: {this.props.property.price}</div>

        <div>Description:</div>
        <div text-align="center">{this.props.property.description}</div>

        <button
          type="button"
          onClick={() => {
            this.props.addToCart(this.props.user.id, this.props.property)
          }}
        >
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    property: state.property
  }
}

const mapDispatch = dispatch => ({
  loadSingleProperty: id => dispatch(fetchSingleProperty(id)),
  addToCart: (userId, property) => dispatch(_addToCart(userId, property)),
  getProperties: () => dispatch(_getProperties())
})

export default connect(mapState, mapDispatch)(SingleProperty)
