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
        <div className='profilePageHeight'>

            <WelcomeMsg />

            <div className='row row-cols-1 row-cols-md-2 mb-5'>

              <div className='col d-flex justify-content-end'>

              <div class="card mb-3 bordcol" style={{maxWidth: '500px'}}>
              <div class="row g-0">
                <div class="col-md-4">
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
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Profile Settings</h5>
                    <p class="card-text">You can always change your profile information in here. Make sure to provide true information. Also, old data can never be turned back.</p>
                    
                  </div>
                  <div class="card-body bordTop">
                    
                    <Link className='linkdesGreen' to='/changeProfile'><p class="card-text">Click Here ... </p></Link>
                    
                  </div>
                </div>
              </div>
              </div>
              </div>

              <div className='col d-flex justify-content-start'>
              <div class="card mb-3 bordcol" style={{maxWidth: '500px'}}>
              <div class="row g-0">
                <div class="col-md-4">
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
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Change Password</h5>
                    <p class="card-text">Feel unsafe about your password ??? Change in here !!! {generateSpace()}</p>
                    
                  </div>
                  <div class="card-body bordTop">
                    
                  <Link className='linkdesGreen' to='/changePassword'><p class="card-text">Click Here ... </p></Link>
                    
                  </div>
                </div>
              </div>
              </div>

              </div>

              <div className='col d-flex justify-content-end'>
              <div class="card mb-3 bordcol" style={{maxWidth: '500px'}}>
              <div class="row g-0">
                <div class="col-md-4">
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
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Delete Account</h5>
                    <p class="card-text">Already have another account ??? Don't want to keep this account for safety issues ??? You can delete anytime in here ...</p>
                    
                  </div>
                  <div class="card-body bordTop">
                    
                  <Link className='linkdesGreen' to='/deleteAccount'><p class="card-text">Click Here ... </p></Link>
                    
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
