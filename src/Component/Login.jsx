import React, { Fragment, useEffect } from 'react'
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


function Login() {
    // set image name initially at start
    const [imageName, setimageName] = React.useState(sleep);

    // form's showing and hiding pass
    const [showPassword, setShowPassword] = React.useState(false);

    // set FormData in variable 
    const [formValues, setFormValues] = React.useState({
        email : '',
        password : '',
    })
    // based on form data two switch will change to indicate if email and pass are according to server rule when any input is given 
    const [emailCondition, setEmailRight] = React.useState(true);
    const [passCondition, setPassRight] = React.useState(true);


    // Setting email from login data
    const setTheEmail = (e)=>{
        setFormValues((prevState)=>({...prevState, email : e.target.value}))
    }

    // Setting password from login data
    const setThePassword = (e)=>{
        setFormValues((prevState)=>({...prevState, password : e.target.value}));
    }


    // form design animation handling state
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }; 

    // setting image at avatar
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
        var regexPassword = /^([0-9a-zA-Z@!_]+){6,50}$/; // password

        if(formValues.email){ // Email is valid or invalid
            if(regexEmail.test(formValues.email)){
                setEmailRight(true)
            }else{
                setEmailRight(false)
            }
        }else{
            setEmailRight(true)
        }

        if(formValues.password){ // Email is valid or invalid
            if(regexPassword.test(formValues.password)){
                setPassRight(true)
            }else{
                setPassRight(false)
            }
        }else{
            setPassRight(true)
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
                <h5 className="card-title mx-auto">Sign In</h5>

            
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
                data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a valid Email or else login will not be allowed ..."
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

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" placeholder="Password">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                    error = {!passCondition ? true : null}
                    data-bs-toggle="tooltip" data-bs-placement="right" title="Your password can only contain a-z, A-Z, 0-9 with no spaces at times of special characters only @!_ is allowed. Also, password must be atleast 6 digit long and highest 50 digit long. "
                    label="Password"
                    autoComplete='none'
                    placeholder='Password'
                    size="small"
                    id={passCondition ? "standard-adornment-password" : "outlined-error"}
                    onChange={(e)=>{setThePassword(e)}}
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
              

                
                


                <button type="button" className="btn btn-sm btn-primary mx-auto mt-3">Sign In</button>
                </div>
                </div>

                <sup className='mt-4 linkBtn2'>Don't Have An ID ? .... <Link className='linkBtn2' to='/registration'>Click Here</Link><br></br></sup>
                <sup className='mt-4 linkBtn2'>Forgot Password ? .... <Link className='linkBtn2' to='/forgotPass'>Click Here</Link></sup>
             
            </div>
        </Fragment>
    )
}

export default Login
