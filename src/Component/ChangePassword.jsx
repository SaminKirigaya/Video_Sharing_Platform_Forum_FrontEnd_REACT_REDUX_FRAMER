import React, { Fragment, useState, useEffect } from 'react'
import WelcomeMsg from './WelcomeMsg';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { useSelector, useDispatch } from 'react-redux';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

import { Navigate } from 'react-router-dom';

import { loginFunctions } from '../Store/Store';
import { tokenFunctions } from '../Store/Store';
import { profImgFunctions } from '../Store/Store';
import { coverImgFunctions } from '../Store/Store';
import { usernameFunctions } from '../Store/Store';
import { userserialFunctions } from '../Store/Store';
import {motion} from 'framer-motion'
import { callForNotificationApi } from './NotificationApi';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function ChangePassword() {

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false); // Snackbar open close state
    const [responseMessage, setResponseMessage] = React.useState(''); // initially any error or success message at snackbar

    const [passState, setpassState] = useState(false); // password field icon and text changing hide or unhide
    const [passState2, setpassState2] = useState(false); // confirm password field icon and text changing hide or unhide
    const [submissionRule, setSubmissionRule] = useState(false) // at form submit initial page check and snackbar active at error

    const token = useSelector((state)=>state.tokenData.token)
    const serial = useSelector((state)=>state.userserialData.serialId)
  

    axios.defaults.headers.common['Authorization'] = 'Bearer '+token // axios auth set

    const [formValues, setTheFormvalues] = useState({
        oldPassword : '',
        newPassword : '',
    })

    // Redirecting back state
    const [nowGoBack, setNowGoBack] = React.useState(false);

    const container = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }
      
      const item = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
      }

    const sendNewPass = async(e)=>{
        const formData = new FormData()
        if(serial && token){

            if(submissionRule && formValues.newPassword && formValues.oldPassword){
                try{
                    formData.append('OldPassword', formValues.oldPassword)
                    formData.append('NewPassword', formValues.newPassword)
    
                    const response = await axios.post(`/setNewPassword/${serial}`, formData, {
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    })
    
                    if(response.data.message == 'Successfully changed the password ... Please log in again .'){
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
                setResponseMessage('Make sure to insert all form data according to server rule, And don\'t keep any field empty ....')
                setOpen(true)
            }

        }else{
            setResponseMessage('Seems you are not even logged in, make sure to login first ....')
            setOpen(true)
        }
        
    }


    // snackbar handling 

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
 


      // password field setting hiding or showing with click
    useEffect(()=>{
        if(passState){
            document.getElementById('OldPassword').setAttribute('type','password');
           
        }else if(!passState){
            document.getElementById('OldPassword').setAttribute('type','text');
           
        }
    }, [passState])


    // confirm password field setting hiding or showing with click
    useEffect(()=>{
        if(passState2){
            document.getElementById('NewPassword').setAttribute('type','password');
            
        }else if(!passState2){
            document.getElementById('NewPassword').setAttribute('type','text');
           
        }
    }, [passState2])



    // set Effect To check if user put anything outside expected field
    useEffect(()=>{
        
        var regexPassword = /^([0-9a-zA-Z@!_]+){6,50}$/; // password

        try{
    
            if(formValues.oldPassword){
                if(regexPassword.test(formValues.oldPassword)){
                    if(formValues.oldPassword.length>6 && formValues.oldPassword.length<50){
                        document.getElementById('OldPassword').classList.remove('is-invalid')
                        document.getElementById('OldPassword').classList.add('is-valid')
                        setSubmissionRule(true)
                    }else{
                        document.getElementById('OldPassword').classList.remove('is-valid')
                        document.getElementById('OldPassword').classList.add('is-invalid')
                        setSubmissionRule(false)
                    }
                    
                }else{
                    document.getElementById('OldPassword').classList.remove('is-valid')
                    document.getElementById('OldPassword').classList.add('is-invalid')
                    setSubmissionRule(false)
                }
            }else{
                document.getElementById('OldPassword').classList.remove('is-valid')
                document.getElementById('OldPassword').classList.remove('is-invalid')
                setSubmissionRule(false)
            }
    
    
            if(formValues.newPassword){
                if(regexPassword.test(formValues.newPassword)){
                    if(formValues.newPassword.length>6 && formValues.newPassword.length<50){
                        document.getElementById('NewPassword').classList.remove('is-invalid')
                        document.getElementById('NewPassword').classList.add('is-valid')
                        setSubmissionRule(true)
                    }else{
                        document.getElementById('NewPassword').classList.remove('is-valid')
                        document.getElementById('NewPassword').classList.add('is-invalid')
                        setSubmissionRule(false)
                    }
                    
                }else{
                    document.getElementById('NewPassword').classList.remove('is-valid')
                    document.getElementById('NewPassword').classList.add('is-invalid')
                    setSubmissionRule(false)
                }
            }else{
                document.getElementById('NewPassword').classList.remove('is-valid')
                document.getElementById('NewPassword').classList.remove('is-invalid')
                setSubmissionRule(false)
            }
    
    
        }catch(err){
            console.log(err)
        }
        

    },[formValues])



  return (
    <Fragment>
    <div className='container-fluid pages flex-column'>
    <div className='profilePageHeight'>
        <WelcomeMsg />


        <motion.div animate={{x : [-400, 0]}} transition={{duration:0.3, type: 'spring', stiffness: 250}} className="card d-flex justify-content-center cardBd mx-auto mb-5" style={{width: "18rem"}}>
    
    
    <div className="card-body d-flex justify-content-center flex-column">
    <h5 className="card-title mx-auto headLine">Change Password</h5>


    <motion.div variants={container} initial="hidden" animate="show" className="row row-cols-1 row-cols-md-2 g-2 mx-auto">
        


        <motion.div variants={item} transition={{duration: 1.3}} className="col col-md-12">
        <div className='eye' onClick={(e)=>{passState ? setpassState(false) : setpassState(true)}}>{passState ? <VisibilityOffIcon /> : <VisibilityIcon />}</div>
        <motion.input whileHover={{scale:1.04}} transition={{type:'spring', stiffness: 300}} onChange={(e)=>{setTheFormvalues((prevState)=>({...prevState, oldPassword : e.target.value }))}} id="OldPassword" type="text" className="form-control" placeholder="Old Password" autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide your old password here ..."/>
        </motion.div>

        <motion.div variants={item} transition={{duration: 1.3}} className="col col-md-12">
        <div className='eye' onClick={(e)=>{passState2 ? setpassState2(false) : setpassState2(true)}}>{passState2 ? <VisibilityOffIcon /> : <VisibilityIcon />}</div>
        <motion.input whileHover={{scale:1.04}} transition={{type:'spring', stiffness: 300}} onChange={(e)=>{setTheFormvalues((prevState)=>({...prevState, newPassword : e.target.value }))}} id="NewPassword" type="text" className="form-control" placeholder="New Password" autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide your new password here ..."/>
        </motion.div>


    </motion.div>
    


    <motion.button whileHover={{scale:1.05}} transition={{type: 'spring', stiffness: 1000}} onClick={(e)=>{sendNewPass(e)}} type="button" className="btn btn-sm btn-primary mx-auto mt-4 headLine">Change Password</motion.button>
    </div>
    </motion.div>

    {nowGoBack ? <Navigate to='/login' replace /> : null}


    </div>
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

export default ChangePassword
