import React from 'react'
import { NavBar } from '../../components/NavBar/NavBar'
import { TableRecords } from '../../components/admin/TableRecords'

export const CrudRecords = () => {
  return (
    <>
        <NavBar></NavBar>
        <TableRecords></TableRecords>
    </>
  )
}
