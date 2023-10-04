import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import profileChange from '../Asset/Images/changeProfile.webp'
import passChange from '../Asset/Images/passchange.jpg'
import deleteIcon from '../Asset/Images/deleteAccount.jpg'

import WelcomeMsg from './WelcomeMsg';

function generateSpace(){
  var space = ' '
  for(let i=0;i<70;i++){
    space += '\u00A0'
  }
  return space
}

function ProfilePage() {
  
  const [BigDisp, setBigDisp] = useState('')
  const [FirstJust, setFirstJust] = useState('')
  const [SecondJust, setSecondJust] = useState('')
  const [ThirdJust, setThirdJust] = useState('')



  // Effects Here
  useEffect(() => {
    if(window.innerWidth>750){
      setFirstJust('end')
      setSecondJust('start')
      setThirdJust('end')
    }else{
      setFirstJust('center')
      setSecondJust('center')
      setThirdJust('center')
    }

    if(window.innerWidth>1000){
      setBigDisp('500px')
    }else{
      setBigDisp('18rem')
    }
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
        <div className='profilePageHeight'>

            <WelcomeMsg />

            <div className='row row-cols-1 row-cols-md-2 mb-5'>

              <div className='col d-flex' style={{justifyContent: FirstJust}}>

              <div className="card mb-3 bordcol" style={{maxWidth: BigDisp}}>
              <div className="row g-0">
                <div className="col-md-4">
                <div className='mx-auto text-center d-flex justify-content-center align-items-center pt-4'>
                <Stack direction="row" spacing={2}>
        
                <Avatar
                    alt="Remy Sharp"
                    src={profileChange}
                    sx={{ width: 65, height: 65, border: '0.15rem solid #c0ff1d' }}
                />
                </Stack>
                </div>
                
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Profile Settings</h5>
                    <p className="card-text">You can always change your profile information in here. Make sure to provide true information. Also, old data can never be turned back.</p>
                    
                  </div>
                  <div className="card-body bordTop">
                    
                    <Link className='linkdesGreen' to='/changeProfile'><p className="card-text">Click Here ... </p></Link>
                    
                  </div>
                </div>
              </div>
              </div>
              </div>

              <div className='col d-flex' style={{justifyContent: SecondJust}}>
              <div className="card mb-3 bordcol" style={{maxWidth: BigDisp}}>
              <div className="row g-0">
                <div className="col-md-4">
                <div className='mx-auto text-center d-flex justify-content-center align-items-center pt-4'>
                <Stack direction="row" spacing={2}>
        
                <Avatar
                    alt="Remy Sharp"
                    src={passChange}
                    sx={{ width: 65, height: 65, border: '0.15rem solid #c0ff1d' }}
                />
                </Stack>
                </div>
                
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Change Password</h5>
                    <p className="card-text">Feel unsafe about your password ??? Change in here !!! {generateSpace()}</p>
                    
                  </div>
                  <div className="card-body bordTop">
                    
                  <Link className='linkdesGreen' to='/changePassword'><p className="card-text">Click Here ... </p></Link>
                    
                  </div>
                </div>
              </div>
              </div>

              </div>

              <div className='col d-flex' style={{justifyContent: ThirdJust}}>
              <div className="card mb-3 bordcol" style={{maxWidth: BigDisp }}>
              <div className="row g-0">
                <div className="col-md-4">
                <div className='mx-auto text-center d-flex justify-content-center align-items-center pt-4'>
                <Stack direction="row" spacing={2}>
        
                <Avatar
                    alt="Remy Sharp"
                    src={deleteIcon}
                    sx={{ width: 65, height: 65, border: '0.15rem solid #c0ff1d' }}
                />
                </Stack>
                </div>
                
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Delete Account</h5>
                    <p className="card-text">Already have another account ??? Don't want to keep this account for safety issues ??? You can delete anytime in here ...</p>
                    
                  </div>
                  <div className="card-body bordTop">
                    
                  <Link className='linkdesGreen' to='/deleteAccount'><p className="card-text">Click Here ... </p></Link>
                    
                  </div>
                </div>
              </div>
              </div>
              
              </div>
              

            </div>



        </div>
        </div>
    </Fragment>
  )
}

export default ProfilePage
