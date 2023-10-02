import React, { Fragment, useEffect, useState } from 'react'
import WelcomeMsg from './WelcomeMsg';
import axios from 'axios'
import { Link, Navigate, useParams } from 'react-router-dom'
import SearchBar from './SearchBar';


function Category() {
  return (
    <Fragment>
    <div className='container-fluid pages flex-column'>
    <div className='profilePageHeight'>


        <SearchBar />
    </div>
    </div>
    </Fragment>
  )
}

export default Category
