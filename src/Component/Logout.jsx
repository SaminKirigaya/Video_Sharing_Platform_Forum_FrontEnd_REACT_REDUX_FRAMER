import React, {Fragment, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


import { loginFunctions } from '../Store/Store';
import { tokenFunctions } from '../Store/Store';
import { profImgFunctions } from '../Store/Store';
import { coverImgFunctions } from '../Store/Store';
import { usernameFunctions } from '../Store/Store';
import { userserialFunctions } from '../Store/Store';

import axios from 'axios';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



function Logout() {
  const dispatch = useDispatch();
  // States : 
  const isLogged = useSelector((state) => state.loginData.login);
  const token = useSelector((state)=>state.tokenData.token)
  const serial = useSelector((state)=>state.userserialData.serialId)
  const playerAvatar = useSelector((state) => state.profImgData.proImgPath);

  axios.defaults.headers.common['Authorization'] = 'Bearer '+token

  // Redirecting back state
  const [nowGoBack, setNowGoBack] = React.useState(false);

  // snackbar open close state
  const [open, setOpen] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState(''); // initially any error or success message at snackbar


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


  // sign out function
  const signMeOut = async(e)=>{
    e.preventDefault()

    if(isLogged && token && serial){
      try{

        const response = await axios.get(`/logMeOut/${serial}`,{
          headers : {
            'Content-Type' : 'application/json'
          }
        })

        if(response.data.message == 'You have successfully logged out ...'){
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
      setResponseMessage('It seems their are issues in token and login ...')
      setOpen(true)
    }
  }

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
      <div className='container-fluid pages flex-column'>
      <div className="card d-flex justify-content-center cardBd" style={{width: "18rem"}}>
      
      <div className='mx-auto mt-4'>
      <Stack direction="row" spacing={2}>
      
      <Avatar
          alt="Remy Sharp"
          src={playerAvatar}
          sx={{ width: 56, height: 56 }}
      />
      </Stack>
      </div>
      

      <div className="card-body d-flex justify-content-center flex-column">
      <h5 className="card-title mx-auto">Sign Out</h5>

      <div class="col col-md-12">
          <p className='text-center'>You sure you want to log out ??? Once sign out all unsaved data will be cleared ...</p>
      
      </div>


      <button onClick={(e)=>{signMeOut(e)}} type="button" className="btn btn-sm btn-primary mx-auto mt-3">Sign Out</button>
      </div>
      </div>

      {nowGoBack ? <Navigate to='/login' replace /> : null}
      {!isLogged ? <Navigate to='/login' replace /> : null}
      
  </div>
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
    </Fragment>
  )
}

export default Logout
