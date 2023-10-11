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
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

import { notifyFunctions }  from '../Store/Store';
import { motion } from 'framer-motion';

function Nav() {

    // States : 
    const isLogged = useSelector((state) => state.loginData.login);
    const playerAvatar = useSelector((state) => state.profImgData.proImgPath);
    const notificationAmount = useSelector((state)=> state.notifyData.notifAmount);
    const token = useSelector((state)=>state.tokenData.token)
    

    axios.defaults.headers.common['Authorization'] = 'Bearer '+token


    // Effects Here
    useEffect(() => {
        // Initialize tooltips when the component mounts
        window.$('[data-bs-toggle="tooltip"]').tooltip();
    
        

        //  to clean up the tooltips when the component unmounts
        return () => {
            window.$('[data-bs-toggle="tooltip"]').tooltip('dispose');
        
        };
      }, []); // [ ] empty mean it will only run once after first render like component did mount :>
 

    //setting interval of 50s for each comment number api
    


    return (

        <Fragment>
            <div className='container-fluid mainNav'>


                <motion.div whileHover={{scale:1.2}} transition={{type:'spring', stiffness:700}} data-bs-toggle="tooltip">
                <Link className='linkBtn' to='/'><OndemandVideoIcon fontSize='large'/></Link>
                </motion.div>
                

                {isLogged ? <motion.div whileHover={{scale:1}} transition={{type:'spring', stiffness:700}} className='avatarArea mt-5'>
                <Link to ='/profilePage'>
                    <Stack direction="row" spacing={2}>
                    
                    <Avatar
                        alt="Remy Sharp"
                        src={playerAvatar}
                        sx={{ width: 56, height: 56 }}
                    />
                    </Stack>
                </Link>
                </motion.div> : null}
                


                {!isLogged ? <motion.div whileHover={{scale:1.2}} transition={{type:'spring', stiffness:700}} className='mt-5'>
                <Link className='linkBtn' to='/login'><AccountCircleIcon fontSize='large' /></Link>
                </motion.div> : null}
                


                {!isLogged ? <motion.div whileHover={{scale:1.2}} transition={{type:'spring', stiffness:700}} className='mt-3'>
                <Link className='linkBtn' to='/verify'><VerifiedIcon fontSize='large' /></Link>
                </motion.div> : null}
                


                <motion.div whileHover={{scale:1.2}} transition={{type:'spring', stiffness:700}} className='mt-3'>
                <Link className='linkBtn' to='/'><HomeIcon fontSize='large'/></Link>
                </motion.div>


                <motion.div whileHover={{scale:1.2}} transition={{type:'spring', stiffness:700}} className='mt-3'>
                <Link className='linkBtn' to='/selectCatagory'><InterestsIcon fontSize='large' /></Link>
                </motion.div>

                {isLogged ? <motion.div whileHover={{scale:1.2}} transition={{type:'spring', stiffness:700}} className='mt-3'>
                <Link className='linkBtn' to='/yourVideos'><VideoSettingsIcon fontSize='large' /></Link>
                </motion.div> : null}
                

                {isLogged ? <motion.div whileHover={{scale:1.2}} transition={{type:'spring', stiffness:700}} className='mt-3'>
                <Link className='linkBtn' to='/watchLater'><WatchLaterIcon fontSize='large' /></Link>
                </motion.div> : null}
                


                {isLogged ? <motion.div whileHover={{scale:1.2}} transition={{type:'spring', stiffness:700}} className='mt-3'>
                <Link className='linkBtn' to='/likedVideos'><ThumbUpAltIcon fontSize='large' /></Link>
                </motion.div> : null}


                {isLogged ? notificationAmount>0 ? <motion.div whileHover={{scale:1.2}} transition={{type:'spring', stiffness:700}} className='mt-3'>
                <Link className='linkBtn noticonred' to='/goNotificationPage'><NotificationImportantIcon fontSize='large' /></Link>
                </motion.div> : <motion.div whileHover={{scale:1.2}} transition={{type:'spring', stiffness:700}} className='mt-3'>
                <Link className='linkBtn' to='/goNotificationPage'><CircleNotificationsIcon fontSize='large' /></Link>
                </motion.div>  : null}


                {isLogged ? <div className='mt-3'>
                <MoreVertIcon fontSize='large' />
                <MoreVertIcon fontSize='large' />
                </div> : null}
                


                {isLogged ? <motion.div whileHover={{scale:1.2}} transition={{type:'spring', stiffness:700}} className='mt-3' >
                <Link className='linkBtn' to='/logout'><LogoutIcon fontSize='large' /></Link>
                </motion.div> : null}
                
                



                

            </div>
        </Fragment>
    )
}

export default Nav
