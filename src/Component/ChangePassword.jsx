import React, { Fragment,useState, useEffect } from 'react'
import WelcomeMsg from './WelcomeMsg';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function ChangePassword() {

    const [passState, setpassState] = useState(false); // password field icon and text changing hide or unhide
    const [passState2, setpassState2] = useState(false); // confirm password field icon and text changing hide or unhide


     // Effects Here
     useEffect(() => {
        // Initialize tooltips when the component mounts
        window.$('[data-bs-toggle="tooltip"]').tooltip();
    
        //  to clean up the tooltips when the component unmounts
        return () => {
          window.$('[data-bs-toggle="tooltip"]').tooltip('dispose');
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

  return (
    <Fragment>
    <div className='container-fluid pages flex-column'>
    <div className='profilePageHeight'>
        <WelcomeMsg />





        <div className="card d-flex justify-content-center cardBd mx-auto mb-5" style={{width: "18rem"}}>
    
    
    

    <div className="card-body d-flex justify-content-center flex-column">
    <h5 className="card-title mx-auto">Change Password</h5>


    <div class="row row-cols-1 row-cols-md-2 g-2 mx-auto">
        


        <div class="col col-md-12">
        <div className='eye' onClick={(e)=>{passState ? setpassState(false) : setpassState(true)}}>{passState ? <VisibilityOffIcon /> : <VisibilityIcon />}</div>
        <input id="OldPassword" type="text" class="form-control" placeholder="Old Password" autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide your old password here ..."/>
        </div>

        <div class="col col-md-12">
        <div className='eye' onClick={(e)=>{passState2 ? setpassState2(false) : setpassState2(true)}}>{passState2 ? <VisibilityOffIcon /> : <VisibilityIcon />}</div>
        <input id="NewPassword" type="text" class="form-control" placeholder="New Password" autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide your new password here ..."/>
        </div>


        

    </div>
    


    <button type="button" className="btn btn-sm btn-primary mx-auto mt-4">Change Password</button>
    </div>
    </div>








    </div>
    </div>
</Fragment>
  )
}

export default ChangePassword
