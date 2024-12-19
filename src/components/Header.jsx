import React from 'react'
import chefCaludeLogo from '/chefClaude Logo.png'

const Header = () => {
  return (
    <header>
      <img src={chefCaludeLogo} alt="chefClaude" />
      <h1>Chef Claude</h1>
    </header>
  )
}

export default Header