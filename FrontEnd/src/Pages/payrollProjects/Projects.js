import React from 'react'
import PropTypes from 'prop-types'


import CrudProjects from '../../Components/CrudProjects/CrudProjects'
import Navbar from '../../Components/Navbar/Navbar'

const Projects = () => {
  return (
    <>
      <Navbar></Navbar>
      <CrudProjects></CrudProjects>
    </>
  )
}

export default Projects