import React, { Fragment, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


import { Link } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import sleep from '../Asset/Images/sleep.jpg';
import watching from '../Asset/Images/watching.jpg';
import axios from 'axios';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  
function Regstration() {
    const [imageName, setimageName] = React.useState(watching); // cat watching or sleep image
    const [open, setOpen] = React.useState(false); // Snackbar open close state
    const [responseMessage, setResponseMessage] = React.useState(''); // initially any error or success message at snackbar
    const [passState, setpassState] = useState(false); // password field icon and text changing hide or unhide
    const [passState2, setpassState2] = useState(false); // confirm password field icon and text changing hide or unhide
    const [submissionRule, setSubmissionRule] = useState(false) // at form submit initial page check and snackbar active at error

    // Form Data setting here
    const [formValues, setFormValues] = useState({
        email : '',
        password : '',
        username : '',
        fullname : '',
        address : '',
        confirm_password : '',
        date_of_birth : '',
        country : '',
        gender : '',
        profile_image : null,
        cover_image : null, 
    })



    // Setting email function
    const setTheMail = (e)=>{
        setFormValues((prevState)=>({...prevState, email : e.target.value}))
    }
    // Setting Username
    const setTheUsername = (e)=>{
        setFormValues((prevState)=>({...prevState, username : e.target.value}))
    }
    // Setting Fullname
    const setTheFullname = (e)=>{
        setFormValues((prevState)=>({...prevState, fullname : e.target.value}))
    }
    // Setting gender
    const setTheGender = (e)=>{
        setFormValues((prevState)=>({...prevState, gender : e.target.value}))
    }
    // Setting Country
    const setTheCountry = (e)=>{
        setFormValues((prevState)=>({...prevState, country : e.target.value}))
    }
    // Setting Address
    const setTheAddress = (e)=>{
        setFormValues((prevState)=>({...prevState, address : e.target.value}))
    }
    // Setting Date of Birth
    const setTheDateofBirth = (e)=>{
        setFormValues((prevState)=>({...prevState, date_of_birth : e.target.value}))
    }
    // Setting Profile Image
    const setProfileImage = (e)=>{
        setFormValues((prevState)=>({...prevState, profile_image : e.target.files[0]}))
    }
    // Setting Cover Image
    const setCoverImage = (e)=>{
        setFormValues((prevState)=>({...prevState, cover_image : e.target.files[0]}))
    }
    // Setting Password
    const setThePassword = (e)=>{
        setFormValues((prevState)=>({...prevState, password : e.target.value}))
    }
    // Setting Confirm Password
    const setTheConfirmPassword = (e)=>{
        setFormValues((prevState)=>({...prevState, confirm_password : e.target.value}))
    }


    // Sign up button after click 
    const signMeUp = async(e)=>{
        e.preventDefault()
        if(submissionRule && formValues.email && formValues.username && formValues.fullname && formValues.gender && formValues.country && formValues.address && formValues.date_of_birth && formValues.password && formValues.confirm_password && formValues.profile_image && formValues.cover_image){
            const formData = new FormData();
            formData.append('Email', formValues.email)
            formData.append('Username', formValues.username)
            formData.append('Fullname', formValues.fullname)
            formData.append('Gender', formValues.gender)
            formData.append('Country', formValues.country)
            formData.append('Address', formValues.address)
            formData.append('Birth_Date', formValues.date_of_birth)
            formData.append('Profile_Image', formValues.profile_image)
            formData.append('Cover_Image', formValues.cover_image)
            formData.append('Password', formValues.password)
            formData.append('Confirmed_Password', formValues.confirm_password)
            try{
                const response = await axios.post('/signMeUp', formData, {
                    headers : {
                        'Content-Type' : 'multipart/form-data'
                    }
                })
                if(response.data.message == 'Sign Up Successful. You Are Provided A OTP In Your Mail That You Provided. Kindly Verify It In The Verification Page. To Activate Your Account.'){
                    setResponseMessage(response.data.message)
                    setOpen(true)

                    setFormValues((prevState)=>({...prevState, email : '', username : '', fullname : '', gender : '', country : '', address : '', date_of_birth : null, profile_image : null, cover_image : null, password : '', confirm_password : ''}))

                    const selectElements = document.querySelectorAll('input, select');
                    selectElements.forEach((each) => {
                        each.value = '';
                      });


                    setTimeout(()=>{
                        window.location.href = '/verify'
                    },2000)
                    
                }else{
                    setResponseMessage(response.data.message)
                    setOpen(true)
                }
                
            }catch(err){
                console.error(err)
            }
        }else{
            setResponseMessage("Make sure you inserted all submission form data according to rules.")
            setOpen(true)
        }
        
    }

    // password field setting hiding or showing with click
    useEffect(()=>{
        if(passState){
            document.getElementById('pass').setAttribute('type','password');
            setimageName(sleep)
        }else if(!passState){
            document.getElementById('pass').setAttribute('type','text');
            setimageName(watching)
        }
    }, [passState])

    // confirm password field setting hiding or showing with click
    useEffect(()=>{
        if(passState2){
            document.getElementById('conpass').setAttribute('type','password');
            setimageName(sleep)
        }else if(!passState2){
            document.getElementById('conpass').setAttribute('type','text');
            setimageName(watching)
        }
    }, [passState2])


    // initially start a function like component did mount at start by [ ] dependency it runs one time at start till reload ...
    useEffect(()=>{
        window.$('[data-bs-toggle="tooltip"]').tooltip()

        return ()=>{
            window.$('[data-bs-toggle="tooltip"]').tooltip('dispose')
        }
    },[])


    // set Effect To check if user put anything outside expected field
    useEffect(()=>{
        var regexEmail = /^[0-9a-zA-Z@!?\._-]+$/; // email
        var regexUsername = /^[0-9a-zA-Z_]+$/; // username
        var regexFullname = /^[a-zA-Z ]+$/; // fullname
        var regexAddress = /^[0-9a-zA-Z-,\/ ]+$/; // address
        var regexPassword = /^([0-9a-zA-Z@!_]+){6,50}$/; // password


        try{
            if(formValues.email){ // Email is valid or invalid
                if(regexEmail.test(formValues.email)){
                    document.getElementById('email').classList.remove('is-invalid')
                    document.getElementById('email').classList.add('is-valid')
                    setSubmissionRule(true)
                }else{
                    document.getElementById('email').classList.remove('is-valid')
                    document.getElementById('email').classList.add('is-invalid')
                    setSubmissionRule(false)
                }
            }else{
                document.getElementById('email').classList.remove('is-valid')
                document.getElementById('email').classList.remove('is-invalid')
                setSubmissionRule(false)
            }
    
    
            if(formValues.username){
                if(regexUsername.test(formValues.username)){
                    document.getElementById('username').classList.remove('is-invalid')
                    document.getElementById('username').classList.add('is-valid')
                    setSubmissionRule(true)
                }else{
                    document.getElementById('username').classList.remove('is-valid')
                    document.getElementById('username').classList.add('is-invalid')
                    setSubmissionRule(false)
                }
            }else{
                document.getElementById('username').classList.remove('is-valid')
                document.getElementById('username').classList.remove('is-invalid')
                setSubmissionRule(false)
            }
    
    
            if(formValues.fullname){
                if(regexFullname.test(formValues.fullname)){
                    document.getElementById('fullname').classList.remove('is-invalid')
                    document.getElementById('fullname').classList.add('is-valid')
                    setSubmissionRule(true)
                }else{
                    document.getElementById('fullname').classList.remove('is-valid')
                    document.getElementById('fullname').classList.add('is-invalid')
                    setSubmissionRule(false)
                }
            }else{
                document.getElementById('fullname').classList.remove('is-valid')
                document.getElementById('fullname').classList.remove('is-invalid')
                setSubmissionRule(false)
            }
    
    
            if(formValues.address){
                if(regexAddress.test(formValues.address)){
                    document.getElementById('address').classList.remove('is-invalid')
                    document.getElementById('address').classList.add('is-valid')
                    setSubmissionRule(true)
                }else{
                    document.getElementById('address').classList.remove('is-valid')
                    document.getElementById('address').classList.add('is-invalid')
                    setSubmissionRule(false)
                }
            }else{
                document.getElementById('address').classList.remove('is-valid')
                document.getElementById('address').classList.remove('is-invalid')
                setSubmissionRule(false)
            }
    
    
            if(formValues.password){
                if(regexPassword.test(formValues.password)){
                    if(formValues.password.length>6 && formValues.password.length<50){
                        document.getElementById('pass').classList.remove('is-invalid')
                        document.getElementById('pass').classList.add('is-valid')
                        setSubmissionRule(true)
                    }else{
                        document.getElementById('pass').classList.remove('is-valid')
                        document.getElementById('pass').classList.add('is-invalid')
                        setSubmissionRule(false)
                    }
                    
                }else{
                    document.getElementById('pass').classList.remove('is-valid')
                    document.getElementById('pass').classList.add('is-invalid')
                    setSubmissionRule(false)
                }
            }else{
                document.getElementById('pass').classList.remove('is-valid')
                document.getElementById('pass').classList.remove('is-invalid')
                setSubmissionRule(false)
            }
    
    
    
            if(formValues.confirm_password){
                if(formValues.confirm_password == formValues.password){
                    document.getElementById('conpass').classList.remove('is-invalid')
                    document.getElementById('conpass').classList.add('is-valid')
                    setSubmissionRule(true)
                }else{
                    document.getElementById('conpass').classList.remove('is-valid')
                    document.getElementById('conpass').classList.add('is-invalid')
                    setSubmissionRule(false)
                }
            }else{
                document.getElementById('conpass').classList.remove('is-valid')
                document.getElementById('conpass').classList.remove('is-invalid')
                setSubmissionRule(false)
            }
    
        }catch(err){
            console.log(err)
        }
        

    },[formValues])


    // Snackbar related 
    

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };


    return (
        <Fragment>
        <div className='container-fluid pages flex-column'>
        <div className='adjustheight'>
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
        <h5 className="card-title mx-auto">SIGN UP</h5>

    
        <div className="row row-cols-1 row-cols-md-2 g-2 mx-auto mt-3">
            <div className="col col-md-12">
                <sup>It may take few seconds to send you the reply message and otp after clicking sign up in order to verify everything. So, please don't panic and kindly wait few seconds.</sup>
            
            </div>

            <div className="col col-md-12">
            
            <input id="email" onChange={(e)=>{setTheMail(e)}} type="email" className="form-control"  placeholder="@Email" autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a valid Email or else you will not be able to verify your account with OTP or get a new password after forgetting password ... Remember Email is unchangable in future."/>
            </div>

            <div className="col col-md-12">
            
            <input id="username" onChange={(e)=>{setTheUsername(e)}} type="text" className="form-control" placeholder="User Name" autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a Unique username also it can only have a-z or A-Z or 0-9, It can only have _ as a special character no space is allowed ..."/>
            </div>

            <div className="col col-md-12">
            
            <input id="fullname" onChange={(e)=>{setTheFullname(e)}} type="text" className="form-control" placeholder="Full Name" autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide your full name it must not have any special characters and must not have any numbers ..."/>
            </div>

            <div className="col-6">
                <select onChange={(e)=>{setTheGender(e)}} className="form-select" aria-label="Default select example">
                <option selected disabled={true}>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
                </select>
            </div>
            <div className="col-6">
                <select onChange={(e)=>{setTheCountry(e)}} className="form-select" aria-label="Default select example">
                <option selected disabled={true}>Country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Phillipines">Phillipines</option>
                <option value="Spain">Spain</option>
                <option value="Australia">Australia</option>
                <option value="Argentina">Argentina</option>
                <option value="Brazil">Brazil</option>
                <option value="Uruguay">Uruguay</option>
                <option value="France">France</option>
                <option value="Russia">Russia</option>
                <option value="German">German</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="India">India</option>
                <option value="Pakistan">Pakistan</option>
                </select>
            </div>

            <div className="col col-md-6">
            
            <input onChange={(e)=>{setTheDateofBirth(e)}} type="date" className="form-control"  placeholder="Date of Birth" autoComplete='none'/>
            </div>

            <div className="col col-md-6">
            
            <input id="address" onChange={(e)=>{setTheAddress(e)}} type="text" className="form-control"  placeholder="Address" autoComplete='none'/>
            </div>


            <div className="col col-md-12 mx-auto">
            
            <label for="profImage"  data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a image of jpg or jpeg format less than 1 MB ... Without jpeg or jpg it won't work."><AddPhotoAlternateIcon /> Add Profile Image</label>
            <input onChange={(e)=>{setProfileImage(e)}} id="profImage" type="file" className="form-control"  autoComplete='none' accept=".jpg, .jpeg"/>
            </div>

            <div className="col col-md-12 mx-auto">
            
            <label for="coverImage"  data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a image at least 1024px X 680 px which is clear ... Remember image must be jpg or jpeg format."><AddPhotoAlternateIcon /> Add Cover Image</label>
            <input onChange={(e)=>{setCoverImage(e)}} id="coverImage" type="file" className="form-control" autoComplete='none' accept=".jpg, .jpeg"/>
            </div>


            <div className="col col-md-12">
            <div className='eye' onClick={(e)=>{passState ? setpassState(false) : setpassState(true)}}>{passState ? <VisibilityOffIcon /> : <VisibilityIcon />}</div>
            <input onChange={(e)=>{setThePassword(e)}} id="pass" type="text" className="form-control"  placeholder="Password" autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Your password can only contain a-z, A-Z, 0-9 with no spaces at times of special characters only @!_ is allowed. Also, password must be atleast 6 digit long and highest 50 digit long. "/>
            </div>

            <div className="col col-md-12 mt-0">
            <div className='eye' onClick={(e)=>{passState2 ? setpassState2(false) : setpassState2(true)}}>{passState2 ? <VisibilityOffIcon /> : <VisibilityIcon />}</div>
            <input onChange={(e)=>{setTheConfirmPassword(e)}} id="conpass" type="text" className="form-control"  placeholder="Confirm Password" autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Your confirm password must be same as password ..."/>
            </div>

        </div>
        


        <button onClick={(e)=>{signMeUp(e)}} type="button" className="btn btn-sm btn-primary mx-auto mt-4">Sign Up</button>
        </div>
        </div>

        <sup className='mt-4 linkBtn2'>Already Have ID ? .... <Link className='linkBtn2' to='/login'>Click Here</Link><br></br></sup>
        <sup className='mt-4 linkBtn2'>Forgot Password ? .... <Link className='linkBtn2' to='/forgotPass'>Click Here</Link></sup>
    
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


    </div>
        </Fragment>
    )
}

export default Regstration
