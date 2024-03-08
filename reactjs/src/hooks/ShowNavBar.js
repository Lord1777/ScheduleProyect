import React, { useState } from 'react'

const ShowNavBar = () => {

    const [ isNavOpen, setNavOpen ] = useState(false)

    //Función para hacer vicible el slide-out-navigation del navbar
    const showToggleNav = () => {
        setNavOpen(!isNavOpen);
    };

  return (
    {
        isNavOpen,
        showToggleNav,
    }
  )
}

export default ShowNavBar