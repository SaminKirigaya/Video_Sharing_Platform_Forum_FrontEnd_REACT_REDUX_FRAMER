import React, { Fragment, useEffect, useState } from 'react'


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

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { motion } from 'framer-motion'

import sleep from '../Asset/Images/sleep.jpg';
import watching from '../Asset/Images/watching.jpg';

import { Link } from 'react-router-dom';
import axios from 'axios';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


function Verify() {
    // snackbar open close state
    const [open, setOpen] = React.useState(false);
    const [responseMessage, setResponseMessage] = React.useState(''); // initially any error or success message at snackbar

    // set image name initially at start
    const [imageName, setimageName] = React.useState(sleep);

    // form's showing and hiding pass
    const [showPassword, setShowPassword] = React.useState(false);

    // set FormData in variable 
    const [formValues, setFormValues] = React.useState({
        email : '',
        otp : '',
    })
    // based on form data two switch will change to indicate if email and pass are according to server rule when any input is given 
    const [emailCondition, setEmailRight] = React.useState(true);
    


    // Setting email from verify data
    const setTheEmail = (e)=>{
        setFormValues((prevState)=>({...prevState, email : e.target.value}))
    }

    // set otp in state
    const setThePassword = (e)=>{
        setFormValues((prevState)=>({...prevState, otp : e.target.value}))
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }; 


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



    // verify otp in here
    const verifyOtp = async(e)=>{
        const formData = new FormData();
        if(formValues.email && formValues.otp){
            formData.append('Email', formValues.email)
            formData.append('OtpCode', formValues.otp)

            try{
                const response = await axios.post('/verifyOtp', formData, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                })

                if(response.data.message == 'Verification Successful !!! Please login for first time in login page.'){
                    setResponseMessage(response.data.message)
                    setOpen(true)

                    setFormValues((prevState)=>({
                        ...prevState,
                        email : '',
                        otp : '',
                    }))

                   

                    setTimeout(()=>{
                        window.location.href = '/login'
                    },2000)


                }else{
                    setResponseMessage(response.data.message)
                    setOpen(true)
                }
            }catch(err){
                console.log(err)
            }
        }else{
            setResponseMessage("Make sure you inserted all submission form data according to rules and no field is empty.")
            setOpen(true)
        }
        

        
    }

    useEffect(()=>{
        if(showPassword){
            setimageName(watching)
        }else{
            setimageName(sleep)
        }
    },[showPassword]);



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
        <motion.div animate={{x : [-400, 0]}} transition={{duration:0.3, type: 'spring', stiffness: 250}} className="card d-flex justify-content-center cardBd" style={{width: "18rem"}}>
        
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
        <h5 className="card-title mx-auto">VERIFY ACCOUNT</h5>

    
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
        data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide the Email with which you created your account also an OTP was sent there ..."
        label="Email"
        id={emailCondition ? "outlined-size-small" : "outlined-error"}
        
        size="small"
        autoComplete="none"
        onChange={(e)=>{setTheEmail(e)}}
        />
        </div>
        
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', marginLeft : '0.9rem'}}>
        <div>

            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" placeholder="OTP">
            <InputLabel htmlFor="standard-adornment-password">OTP</InputLabel>
            <Input
            data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide the OTP which was sent to you to the email ..."
            label="OTP"
            autoComplete='none'
            placeholder='OTP'
            onChange={(e)=>{setThePassword(e)}}
            size="small"
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
                <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                >
                {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
            }
            />
        </FormControl>

        </div>
        </Box>
      

        
        


        <motion.button whileHover={{scale:1.05}} transition={{type: 'spring', stiffness: 1000}} onClick={(e)=>{verifyOtp(e)}} type="button" className="btn btn-sm btn-primary mx-auto mt-3">Verify Account</motion.button>
        </div>
        </motion.div>

        <sup className='mt-4 linkBtn2'>Don't Have An ID ? .... <Link className='linkBtn2' to='/registration'>Click Here</Link><br></br></sup>
        <sup className='mt-4 linkBtn2'>Already Have An ID ? .... <Link className='linkBtn2' to='/login'>Click Here</Link></sup>
     
        
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

export default Verify
