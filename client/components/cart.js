import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class Cart extends React.Component {
  // componentDidMount() {
  //   try {
  //     this.props.loadSingleProperty(this.props.match.params.id)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  render() {
    // console.log(this.props.property)
    // if (!this.props.property) {
    //   return <div>Loading...</div>
    // }

    return <div>Hello World - it's me, cart!</div>
  }
}

// const mapState = state => {
//   return {
//     property: state.property
//   }
// }

// const mapDispatch = dispatch => ({
//   loadSingleProperty: id => dispatch(fetchSingleProperty(id))
// })

// export default connect(mapState, mapDispatch)(SingleProperty)
export default connect(null, null)(Cart)
