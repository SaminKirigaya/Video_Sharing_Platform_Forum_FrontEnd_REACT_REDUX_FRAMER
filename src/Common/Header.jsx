import React,{Fragment, useEffect, useState, useMemo, Suspense} from 'react'
import { BrowserRouter,Routes, Route, useParams, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'



import Nav from './Nav'

const Home = React.lazy(()=>import('../Component/Home'));
const Login = React.lazy(()=>import('../Component/Login'));
const Logout = React.lazy(()=>import('../Component/Logout'));
const Reg = React.lazy(()=>import('../Component/Regstration'));
const ForgotPass = React.lazy(()=>import('../Component/ForgotPass'));
const Verify = React.lazy(()=>import('../Component/Verify'));

function loadingEffect(){
    return  <div className='container-fluid loader d-flex justify-content-center align-items-center'>
        <div className="spinner-border desLoad" style={{width: '3rem', height: '3rem'}} role="status">
        <span className="visually-hidden">Loading...</span>
        </div>
        
        
    </div>
}


function Header() {
    return (
        <BrowserRouter>
        <Fragment>

        <div>
            <Nav />
        </div>

        <div>
            <Suspense fallback={loadingEffect()}>
                <Routes>
                    <Route path='/' Component={()=>(<Home />)} />
                    <Route path='/login' Component={()=>(<Login />)} />
                    <Route path='/logout' Component={()=>(<Logout />)} />
                    <Route path='/registration' Component={()=>(<Reg />)} />
                    <Route path='/forgotPass' Component={()=>(<ForgotPass />)} />
                    <Route path='/verify' Component={()=>(<Verify />)} />
                </Routes>
            </Suspense>
        </div>

        </Fragment>
        </BrowserRouter>
    )
}

export default Header
