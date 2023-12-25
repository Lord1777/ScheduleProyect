import React from 'react'
import { TableQuarter } from '../components/admin/TableQuarter'
import { NavBar } from '../components/NavBar/NavBar'

export const CrudQuarters = () => {
  return (
    <>
        <NavBar></NavBar>
        <TableQuarter></TableQuarter>
    </>
  )
}
