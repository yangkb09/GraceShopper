import React from 'react'
// import PropTypes from 'prop-types' //SAFEWORD: PICKLES
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  console.log('props@UserHome', props) //gets the email as props

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  //mapStateToProps
  console.log("this is the state I'm getting!", state)
  console.log(
    'mapping state to props @ user-home, returning email: state.user.email'
  )
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
//SAFEWORD: PICKLES
