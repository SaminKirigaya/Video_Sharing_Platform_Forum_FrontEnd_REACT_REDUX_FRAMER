import React, { Fragment, useState, useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import WelcomeMsg from './WelcomeMsg';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { Navigate, Link } from 'react-router-dom';

import { loginFunctions } from '../Store/Store';
import { tokenFunctions } from '../Store/Store';
import { profImgFunctions } from '../Store/Store';
import { coverImgFunctions } from '../Store/Store';
import { usernameFunctions } from '../Store/Store';
import { userserialFunctions } from '../Store/Store';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


const formatDate = (dateVal)=>{
    const newDate = new Date(dateVal)

    const year = newDate.getFullYear()
    const month = (newDate.getMonth()+1).toString().padStart(2, '0')
    const day = newDate.getDay().toString().padStart(2, '0')

    var dateTotal = `${year}-${month}-${day}`

    return dateTotal
}


function ChangeProfile() {
    const dispatch = useDispatch(); // setting dispatch for redux

    const [open, setOpen] = React.useState(false); // Snackbar open close state
    const [responseMessage, setResponseMessage] = React.useState(''); // initially any error or success message at snackbar
    // setting submission is allowed or not
    const [submissionRule, setSubmissionRule] = useState(false) // at form submit initial page check and snackbar active at error

    //old profile data 
    const [userData, setTheUserData] = useState({
        username : '',
        fullname : '',
        gender : '',
        country : '',
        dateofbirth : '',
        address : '',
        profileImageName : '',
        profileImageFile : null,
        coverImageName : '',
        coverImageFile : null,
    })

    // serial
    const serial = useSelector((state)=>state.userserialData.serialId)
    //token
    const token = useSelector((state)=>state.tokenData.token)
    // set default axios header auth before sending
    axios.defaults.headers.common['Authorization'] = 'Bearer '+token

    // Redirecting back state
    const [nowGoBack, setNowGoBack] = React.useState(false);


    // send data to set new user details in database
    const setNewUserData = async(e)=>{
        const formData = new FormData()
        if(submissionRule && userData.username && userData.fullname && userData.gender && userData.country && userData.dateofbirth && userData.address){
            
            if(!userData.profileImageName && userData.coverImageName){

                try{
                    formData.append('Username', userData.username)
                    formData.append('Fullname', userData.fullname)
                    formData.append('Gender', userData.gender)
                    formData.append('Country', userData.country)
                    formData.append('Birth_Date', userData.dateofbirth)
                    formData.append('Address', userData.address)
                    formData.append('CoverImage', userData.coverImageFile)
                   

                    const response = await axios.post(`/setMyNewDetailsCoverImg/${serial}`, formData, {
                        headers : {
                            'Content-Type' : 'multipart/form-data'
                        }
                    })

                    if(response.data.message == 'Successfully new user informtation was set in server. Please log in again ...'){
                        
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


            }else if(userData.profileImageName && !userData.coverImageName){

                try{
                    formData.append('Username', userData.username)
                    formData.append('Fullname', userData.fullname)
                    formData.append('Gender', userData.gender)
                    formData.append('Country', userData.country)
                    formData.append('Birth_Date', userData.dateofbirth)
                    formData.append('Address', userData.address)
                    formData.append('ProfileImage', userData.profileImageFile)
                   

                    const response = await axios.post(`/setMyNewDetailsProfImg/${serial}`, formData, {
                        headers : {
                            'Content-Type' : 'multipart/form-data'
                        }
                    })

                    if(response.data.message == 'Successfully new user informtation was set in server. Please log in again ...'){
                        
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


            }else if(userData.profileImageName && userData.coverImageName){


                try{
                    formData.append('Username', userData.username)
                    formData.append('Fullname', userData.fullname)
                    formData.append('Gender', userData.gender)
                    formData.append('Country', userData.country)
                    formData.append('Birth_Date', userData.dateofbirth)
                    formData.append('Address', userData.address)
                    formData.append('ProfileImage', userData.profileImageFile)
                    formData.append('CoverImage', userData.coverImageFile)

                    const response = await axios.post(`/setMyNewDetailsBothImg/${serial}`, formData, {
                        headers : {
                            'Content-Type' : 'multipart/form-data'
                        }
                    })

                    if(response.data.message == 'Successfully new user informtation was set in server. Please log in again ...'){
                        
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


            }else if(!userData.profileImageName && !userData.coverImageName){
                try{
                    formData.append('Username', userData.username)
                    formData.append('Fullname', userData.fullname)
                    formData.append('Gender', userData.gender)
                    formData.append('Country', userData.country)
                    formData.append('Birth_Date', userData.dateofbirth)
                    formData.append('Address', userData.address)

                    const response = await axios.post(`/setMyNewDetailsNoImg/${serial}`, formData, {
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    })

                    if(response.data.message == 'Successfully new user informtation was set in server. Please log in again ...'){
                        
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
            }

        }else{
            setResponseMessage('Make sure to not keep any input field empty ... Profile image and Cover Image are optional though .')
            setOpen(true)
        }
    }
    
    const fetchdata = async()=>{
        if(serial){
            try{
                const response = await axios.get(`/getMyProfileData/${serial}`,{
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                })
                if(response.data.message == 'success'){
                    setTheUserData((prevState)=>({
                        ...prevState,
                        username : response.data.username,
                        fullname : response.data.fullname,
                        gender : response.data.gender,
                        country : response.data.country,
                        dateofbirth : response.data.dateofbirth,
                        address : response.data.address,
                    }))
                }
                
            }catch(err){
                console.log(err)
            }
        }


    }

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

    // Effects Here
    useEffect(() => {
        // Initialize tooltips when the component mounts
        window.$('[data-bs-toggle="tooltip"]').tooltip();
    
        // send for rest api user data which is old data
        
        fetchdata()


        //  to clean up the tooltips when the component unmounts
        return () => {
          window.$('[data-bs-toggle="tooltip"]').tooltip('dispose');
        };
      }, []); // [ ] empty mean it will only run once after first render like component did mount :>
 


      // validation and adding is valid or invalid 
      useEffect(()=>{
        var regexUsername = /^[0-9a-zA-Z_]+$/; // username
        var regexFullname = /^[a-zA-Z ]+$/; // fullname
        var regexAddress = /^[0-9a-zA-Z-,\/ ]+$/; // address

        try{
            
            if(userData.username){
                if(regexUsername.test(userData.username)){
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
    
    
            if(userData.fullname){
                if(regexFullname.test(userData.fullname)){
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
    
    
            if(userData.address){
                if(regexAddress.test(userData.address)){
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
    
    
        
    
        }catch(err){
            console.log(err)
        }
      },[userData])

  return (
    <Fragment>
        <div className='container-fluid pages flex-column'>
        <div className='profilePageHeight'>
            <WelcomeMsg />




            <div className="card d-flex justify-content-center cardBd mx-auto mb-5" style={{width: "18rem"}}>
        
        
        

        <div className="card-body d-flex justify-content-center flex-column">
        <h5 className="card-title mx-auto">Change Profile</h5>

    
        <div class="row row-cols-1 row-cols-md-2 g-2 mx-auto mt-3">
            

            

            <div class="col col-md-12">
            
            <input id="username" onChange={(e)=>{setTheUserData((prevState)=>({...prevState, username: e.target.value}))}} value={userData.username} type="text" class="form-control" placeholder="User Name" autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a Unique username also it can only have a-z or A-Z or 0-9, It can only have _ as a special character no space is allowed ..."/>
            </div>

            <div class="col col-md-12">
            
            <input id="fullname" onChange={(e)=>{setTheUserData((prevState)=>({...prevState, fullname: e.target.value}))}} value={userData.fullname} type="text" class="form-control" placeholder="Full Name" autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide your full name it must not have any special characters and must not have any numbers ..."/>
            </div>

            <div class="col-6">
                <select onChange={(e)=>{setTheUserData((prevState)=>({...prevState, gender: e.target.value}))}} value={userData.gender} class="form-select" aria-label="Default select example">
                <option disabled={true}>Gender</option>
                <option selected disabled={true}>{userData.gender}</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
                </select>
            </div>
            <div class="col-6">
                <select onChange={(e)=>{setTheUserData((prevState)=>({...prevState, country: e.target.value}))}} class="form-select" value={userData.country} aria-label="Default select example">
                <option disabled={true}>Country</option>
                <option selected disabled={true}>{userData.country}</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Phillipines">Phillipines</option>
                <option value="Spain">Spain</option>
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

            <div class="col col-md-6">
            
            <input type="date" onChange={(e)=>{setTheUserData((prevState)=>({...prevState, dateofbirth: e.target.value}))}} value={formatDate(userData.dateofbirth)} class="form-control"  placeholder="Date of Birth" autoComplete='none'/>
            </div>

            <div class="col col-md-6">
            
            <input id="address" onChange={(e)=>{setTheUserData((prevState)=>({...prevState, address: e.target.value}))}} value={userData.address}  type="text" class="form-control"  placeholder="Address" autoComplete='none'/>
            </div>


            <div class="col col-md-12 mx-auto">
            
            <label for="profImage"  data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a image of jpg or jpeg format less than 1 MB ... Without jpeg or jpg it won't work."><AddPhotoAlternateIcon /> Add Profile Image "Optional"</label>
            <input onChange={(e)=>{setTheUserData((prevState)=>({...prevState, profileImageName: e.target.value, profileImageFile : e.target.files[0] }))}}  id="profImage" type="file" class="form-control"  autoComplete='none' accept=".jpg, .jpeg"/>
            </div>

            <div class="col col-md-12 mx-auto">
            
            <label for="coverImage"  data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a image at least 1024px X 680 px which is clear ... Remember image must be jpg or jpeg format."><AddPhotoAlternateIcon /> Add Cover Image "Optional"</label>
            <input onChange={(e)=>{setTheUserData((prevState)=>({...prevState, coverImageName: e.target.value, coverImageFile: e.target.files[0] }))}} id="coverImage" type="file" class="form-control" autoComplete='none' accept=".jpg, .jpeg"/>
            </div>




        </div>
        


        <button onClick={(e)=>{setNewUserData(e)}} type="button" className="btn btn-sm btn-primary mx-auto mt-4">Change Profile</button>
        </div>
        </div>

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

export default ChangeProfile
