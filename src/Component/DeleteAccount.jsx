import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { Link, Navigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import deleteIcon from '../Asset/Images/deleteAccount.jpg'

import WelcomeMsg from './WelcomeMsg';


import { loginFunctions } from '../Store/Store';
import { tokenFunctions } from '../Store/Store';
import { profImgFunctions } from '../Store/Store';
import { coverImgFunctions } from '../Store/Store';
import { usernameFunctions } from '../Store/Store';
import { userserialFunctions } from '../Store/Store';

import { callForNotificationApi } from './NotificationApi';


import axios from 'axios';
import {motion} from 'framer-motion'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



function DeleteAccount() {

    const dispatch = useDispatch();
    // States : 
    const isLogged = useSelector((state) => state.loginData.login);
    const token = useSelector((state)=>state.tokenData.token)
    const serial = useSelector((state)=>state.userserialData.serialId)


    axios.defaults.headers.common['Authorization'] = 'Bearer '+token

    // Redirecting back state
    const [nowGoBack, setNowGoBack] = React.useState(false);

    // snackbar open close state
    const [open, setOpen] = React.useState(false);
    const [responseMessage, setResponseMessage] = React.useState(''); // initially any error or success message at snackbar

    const tryDeleteId = async(e)=>{
        if(serial && token){
            try{
                const response = await axios.get(`/deleteThisId/${serial}`, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                })

                if(response.data.message == 'Your account was successfully deleted ... Thank you for staying with us all this time.'){
                    
                    setResponseMessage(response.data.message)
                    setOpen(true)

                    setTimeout(()=>{
                        setNowGoBack(true)
                        dispatch(loginFunctions.logout())
                        dispatch(tokenFunctions.clearToken())
                        dispatch(usernameFunctions.clearusername())
                        dispatch(userserialFunctions.clearSerial())
                        dispatch(profImgFunctions.clearproImgPath())
                        dispatch(coverImgFunctions.clearCoverImgPath())
                      },1400)


                }else{
                    setResponseMessage(response.data.message)
                    setOpen(true)
                }

            }catch(err){
                console.log(err)
            }
        }else{
            setResponseMessage('Seems like you are not even logged in, kindly log in first ...')
            setOpen(true)
        }
    }

    // handle close open of snackbar here
    const handleClick = () => {
    setOpen(true);
    };

    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };


      // Effects Here
      useEffect(() => {
        const intervalID = setInterval(() => {
            // Your interval logic here
            
                console.log('send api')
                callForNotificationApi(serial, token, dispatch)
      
            
      
            }, 50000);

        // Initialize tooltips when the component mounts
        window.$('[data-bs-toggle="tooltip"]').tooltip();
    
        //  to clean up the tooltips when the component unmounts
        return () => {
          window.$('[data-bs-toggle="tooltip"]').tooltip('dispose');
          clearInterval(intervalID)
        };
      }, []); // [ ] empty mean it will only run once after first render like component did mount :>
 


  return (
    <Fragment>
    <div className='container-fluid pages flex-column'>
    <div className='profilePageHeight'>
        <WelcomeMsg />


        <motion.div animate={{x : [-400, 0]}} transition={{duration:0.3, type: 'spring', stiffness: 250}} className="card d-flex justify-content-center cardBd mx-auto mb-5" style={{width: "18rem"}}>
      
      <motion.div whileHover={{scale:1.2}} transition={{type: 'spring', stiffness: 400}} className='mx-auto mt-4'>
      <Stack direction="row" spacing={2}>
      
      <Avatar
          alt="Remy Sharp"
          src={deleteIcon}
          sx={{ width: 56, height: 56 }}
      />
      </Stack>
      </motion.div>
      

      <div className="card-body d-flex justify-content-center flex-column">
      <h5 className="card-title mx-auto headLine">Delete Account</h5>

      <div className="col col-md-12">
          <p className='text-center normalLine'>You sure you want to delete your account ??? Once deleted no old data can be returned to current state ...</p>
      
      </div>


      <motion.button whileHover={{scale:1.05}} transition={{type: 'spring', stiffness: 1000}} onClick={(e)=>{tryDeleteId(e)}} type="button" className="btn btn-sm btn-primary mx-auto mt-3 headLine">Delete Account</motion.button>
      </div>
      </motion.div>
      
      {nowGoBack ? <Navigate to='/login' replace /> : null}

    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success" sx={{
            width: '100%',
            backgroundColor: '#c0ff1d', // Set your custom color here
            color: '#000000a3', // Set text color for visibility
            fontFamily: 'Cormorant Infant'
        }}>
        {responseMessage}
        </Alert>
    </Snackbar>


    </div>
    </div>
    </Fragment>
  )
}

export default DeleteAccount
