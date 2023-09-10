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

function Nav() {

    return (
        <Fragment>
            <div className='container-fluid mainNav'>

            
                <div>
                <OndemandVideoIcon fontSize='large'/>
                </div>
                

                <div className='avatarArea mt-5'>
                Avatar 
                </div>

                <div className='mt-3'>
                <HomeIcon fontSize='large'/>
                </div>


                <div className='mt-3'>
                <InterestsIcon fontSize='large' />
                </div>


                <div className='mt-3'>
                <WatchLaterIcon fontSize='large' />
                </div>


                <div className='mt-3'>
                <ThumbUpAltIcon fontSize='large' />
                </div>
                

            </div>
        </Fragment>
    )
}

export default Nav
