import React, { Fragment, useState, useEffect } from 'react'

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import sleep from '../Asset/Images/sleep.jpg';
import watching from '../Asset/Images/watching.jpg'

import imageName from '../Asset/Images/catCry.jpg'

import { Link } from 'react-router-dom';


function ForgotPass() {

  // set FormData in variable 
  const [formValues, setFormValues] = React.useState({
    email : '',
    
  })
  // based on form data two switch will change to indicate if email and pass are according to server rule when any input is given 
  const [emailCondition, setEmailRight] = React.useState(true);



  // Setting email from login data
  const setTheEmail = (e)=>{
      setFormValues((prevState)=>({...prevState, email : e.target.value}))
  }
  
  // initially start a function like component did mount at start by [ ] dependency it runs one time at start till reload ...
  useEffect(()=>{
    window.$('[data-bs-toggle="tooltip"]').tooltip()

    return ()=>{
        window.$('[data-bs-toggle="tooltip"]').tooltip('dispose')
    }
  },[])


  // useEffect for handling if any useless data was given in field than is-valid or is-invalid will be added
  useEffect(()=>{
    var regexEmail = /^[0-9a-zA-Z@!?\._-]+$/; // email
    

    if(formValues.email){ // Email is valid or invalid
        if(regexEmail.test(formValues.email)){
            setEmailRight(true)
        }else{
            setEmailRight(false)
        }
    }else{
        setEmailRight(true)
    }

    

  },[formValues])


  return (
    <Fragment>
      <div className='container-fluid pages flex-column'>
      <div className="card d-flex justify-content-center cardBd" style={{width: "18rem"}}>
      
      <div className='mx-auto mt-4'>
      <Stack direction="row" spacing={2}>
      
      <Avatar
          alt="Remy Sharp"
          src={imageName}
          sx={{ width: 56, height: 56 }}
      />
      </Stack>
      </div>
      

      <div className="card-body d-flex justify-content-center flex-column">
      <h5 className="card-title mx-auto">FORGOT PASSWORD</h5>


      <Box
      component="form"
      sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch', marginLeft : '1.1rem', marginTop : '1rem' },
      }}
      noValidate
      
      >
      <div>
      <TextField
      error = {!emailCondition ? true : null}
      data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a the Email with which you created your account and where you were given an OTP ... Remember a new password will be sent to you in there. After Login with that you can change your password in profile menu 😁"
      label="Email"
      id={emailCondition ? "outlined-size-small" : "outlined-error"}
      
      size="small"
      autoComplete="none"
      onChange={(e)=>{setTheEmail(e)}}
      />
      </div>
      
      </Box>
      

      <button type="button" className="btn btn-sm btn-primary mx-auto mt-3">Get New Pass</button>
      </div>
      </div>

      <sup className='mt-4 linkBtn2'>Don't Have An ID ? .... <Link className='linkBtn2' to='/registration'>Click Here</Link><br></br></sup>
      <sup className='mt-4 linkBtn2'>Already Have An ID ? .... <Link className='linkBtn2' to='/login'>Click Here</Link></sup>
  
    </div>
    </Fragment>
  )
}

export default ForgotPass
