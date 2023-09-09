import React,{Fragment, useEffect, useState, useMemo} from 'react'
import { Router, Route, useParams, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import Nav from './Nav'


function Header() {
    return (
        <Fragment>

        <div>
            <Nav />
        </div>

        <div className='container-fluid pages'>
        </div>

        </Fragment>
    )
}

export default Header
