import React from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { TableInstructors } from '../components/admin/TableInstructors'

export const CrudInstructor = () => {
  return (
    <>
        <NavBar></NavBar>
        <TableInstructors></TableInstructors>
    </>
  )
}
