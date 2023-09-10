import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom'
import axios from 'axios'

import HomeIcon from '@mui/icons-material/Home';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import InterestsIcon from '@mui/icons-material/Interests';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedIcon from '@mui/icons-material/Verified';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';



function Nav() {

    // States : 
    const isLogged = useSelector(state => state.login);

    // Effects Here
    useEffect(() => {
        // Initialize tooltips when the component mounts
        window.$('[data-bs-toggle="tooltip"]').tooltip();
    
        //  to clean up the tooltips when the component unmounts
        return () => {
          window.$('[data-bs-toggle="tooltip"]').tooltip('dispose');
        };
      }, []); // [ ] empty mean it will only run once after first render like component did mount :>
 




    return (

        <Fragment>
            <div className='container-fluid mainNav'>


                <div data-bs-toggle="tooltip" data-bs-placement="right" title="Have A Nice Day !!!">
                <Link className='linkBtn' to='/'><OndemandVideoIcon fontSize='large'/></Link>
                </div>
                

                {isLogged ? <div className='avatarArea mt-5' data-bs-toggle="tooltip" data-bs-placement="right" title="Your Profile">
                Avatar 
                </div> : null}
                


                {!isLogged ? <div className='mt-5' data-bs-toggle="tooltip" data-bs-placement="right" title="LogIn" >
                <Link className='linkBtn' to='/login'><AccountCircleIcon fontSize='large' /></Link>
                </div> : null}
                


                {!isLogged ? <div className='mt-3' data-bs-toggle="tooltip" data-bs-placement="right" title="Verify Account">
                <Link className='linkBtn' to='/verify'><VerifiedIcon fontSize='large' /></Link>
                </div> : null}
                


                <div className='mt-3' data-bs-toggle="tooltip" data-bs-placement="right" title="Home">
                <HomeIcon fontSize='large'/>
                </div>


                <div className='mt-3' data-bs-toggle="tooltip" data-bs-placement="right" title="All Categories">
                <InterestsIcon fontSize='large' />
                </div>


                {isLogged ? <div className='mt-3' data-bs-toggle="tooltip" data-bs-placement="right" title="Watch Later">
                <WatchLaterIcon fontSize='large' />
                </div> : null}
                


                {isLogged ? <div className='mt-3' data-bs-toggle="tooltip" data-bs-placement="right" title="Liked Videos">
                <ThumbUpAltIcon fontSize='large' />
                </div> : null}


                {isLogged ? <div className='mt-3'>
                <MoreVertIcon fontSize='large' />
                <MoreVertIcon fontSize='large' />
                </div> : null}
                


                {isLogged ? <div className='mt-3' data-bs-toggle="tooltip" data-bs-placement="right" title="LogOut">
                <LogoutIcon fontSize='large' />
                </div> : null}
                



                

            </div>
        </Fragment>
    )
}

export default Nav
