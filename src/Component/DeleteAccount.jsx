import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import deleteIcon from '../Asset/Images/deleteAccount.jpg'

import WelcomeMsg from './WelcomeMsg';


function DeleteAccount() {

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


        <div className="card d-flex justify-content-center cardBd mx-auto" style={{width: "18rem"}}>
      
      <div className='mx-auto mt-4'>
      <Stack direction="row" spacing={2}>
      
      <Avatar
          alt="Remy Sharp"
          src={deleteIcon}
          sx={{ width: 56, height: 56 }}
      />
      </Stack>
      </div>
      

      <div className="card-body d-flex justify-content-center flex-column">
      <h5 className="card-title mx-auto">Delete Account</h5>

      <div class="col col-md-12">
          <p className='text-center'>You sure you want to delete your account ??? Once deleted no old data can be returned to current state ...</p>
      
      </div>


      <button type="button" className="btn btn-sm btn-primary mx-auto mt-3">Delete Account</button>
      </div>
      </div>



    </div>
    </div>
    </Fragment>
  )
}

export default DeleteAccount
