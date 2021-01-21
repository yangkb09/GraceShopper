import React from 'react'
// import PropTypes from 'prop-types' //SAFEWORD: PICKLES

/**
 * COMPONENT
 */
export const LandingPage = () => {
  return (
    <div>
      <p className="frontPageText" id="welcomeMsg">
        Welcome to Virtual Realty, where we help you find your ideal getaway.
      </p>
      <img
        id="landing-page"
        src="https://i2-prod.mirror.co.uk/incoming/article10679279.ece/ALTERNATES/s1227b/PAY-TOP-8-HOUSES-IN-WORLD.jpg"
      />
    </div>
  )
}

/**
 * CONTAINER
 */

export default LandingPage

/**
 * PROP TYPES
 */
