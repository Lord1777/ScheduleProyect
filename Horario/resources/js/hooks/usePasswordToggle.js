import React, { useState } from 'react'


const usePasswordToggle = () => {

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleTogglePassword = () =>{
        setShowPassword(!showPassword)
    }

  return {
    password,
    showPassword,
    handleTogglePassword,
    setPassword,
  }
     
}

export default usePasswordToggle