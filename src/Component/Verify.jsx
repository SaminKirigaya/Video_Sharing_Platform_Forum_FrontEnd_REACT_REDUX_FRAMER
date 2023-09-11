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


import sleep from '../Asset/Images/sleep.jpg';
import watching from '../Asset/Images/watching.jpg';

import { Link } from 'react-router-dom';


function Verify() {

    // set image name initially at start
    const [imageName, setimageName] = React.useState(sleep);

    // form's showing and hiding pass
    const [showPassword, setShowPassword] = React.useState(false);

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

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }; 

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
      

        
        


        <button type="button" className="btn btn-sm btn-primary mx-auto mt-3">Verify Account</button>
        </div>
        </div>

        <sup className='mt-4 linkBtn2'>Don't Have An ID ? .... <Link className='linkBtn2' to='/registration'>Click Here</Link><br></br></sup>
        <sup className='mt-4 linkBtn2'>Already Have An ID ? .... <Link className='linkBtn2' to='/login'>Click Here</Link></sup>
     
        </div>
        </Fragment>
    )
}

export default Verify
