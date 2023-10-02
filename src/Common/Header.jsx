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
const ProfilePage = React.lazy(()=>import('../Component/ProfilePage'));
const ChangeProfile = React.lazy(()=>import('../Component/ChangeProfile'));
const ChangePassword = React.lazy(()=>import('../Component/ChangePassword'));
const DeleteAccount = React.lazy(()=>import('../Component/DeleteAccount'));
const YourVideos = React.lazy(()=>import('../Component/YourVideos'));
const SeeMyThisVideo = React.lazy(()=>import('../Component/SeeMyThisVideo'));
const SeeServerThisVideo = React.lazy(()=>import('../Component/SeeServerThisVideo'));
const SearchResult = React.lazy(()=>import('../Component/SearchResult'));
const WatchLater = React.lazy(()=>import('../Component/WatchLater'));
const LikedVideos = React.lazy(()=>import('../Component/LikedVideos'))

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
                    <Route path='/profilePage' Component={()=>(<ProfilePage />)} />
                    <Route path='/changeProfile' Component={()=>(<ChangeProfile />)} />
                    <Route path='/changePassword' Component={()=>(<ChangePassword />)} />
                    <Route path='/deleteAccount' Component={()=>(<DeleteAccount />)} />
                    <Route path='/yourVideos' Component={()=>(<YourVideos />)} />
                    <Route path='/seeMyThisVideo/:videoSerial' Component={()=>(<SeeMyThisVideo />)} />
                    <Route path='/seeServerThisVideo/:videoSerial' Component={()=>(<SeeServerThisVideo />)}/>
                    <Route path='/searchResult/:searchText' Component={()=>(<SearchResult />)} />
                    <Route path='/watchLater' Component={()=>(<WatchLater />)} />
                    <Route path='/likedVideos' Component={()=>(<LikedVideos />)} />
                </Routes>
            </Suspense>
        </div>

        </Fragment>
        </BrowserRouter>
    )
}

export default Header
