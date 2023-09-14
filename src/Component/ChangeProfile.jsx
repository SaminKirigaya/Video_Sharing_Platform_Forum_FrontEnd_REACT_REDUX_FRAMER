import React, { Fragment, useState, useEffect } from 'react'
import WelcomeMsg from './WelcomeMsg';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function ChangeProfile() {



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










            <div className="card d-flex justify-content-center cardBd mx-auto mb-5" style={{width: "18rem"}}>
        
        
        

        <div className="card-body d-flex justify-content-center flex-column">
        <h5 className="card-title mx-auto">Change Profile</h5>

    
        <div class="row row-cols-1 row-cols-md-2 g-2 mx-auto mt-3">
            

            

            <div class="col col-md-12">
            
            <input id="username" type="text" class="form-control" placeholder="User Name" autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a Unique username also it can only have a-z or A-Z or 0-9, It can only have _ as a special character no space is allowed ..."/>
            </div>

            <div class="col col-md-12">
            
            <input id="fullname" type="text" class="form-control" placeholder="Full Name" autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide your full name it must not have any special characters and must not have any numbers ..."/>
            </div>

            <div class="col-6">
                <select class="form-select" aria-label="Default select example">
                <option selected disabled={true}>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
                </select>
            </div>
            <div class="col-6">
                <select class="form-select" aria-label="Default select example">
                <option selected disabled={true}>Country</option>
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
            
            <input type="date" class="form-control"  placeholder="Date of Birth" autoComplete='none'/>
            </div>

            <div class="col col-md-6">
            
            <input id="address"  type="text" class="form-control"  placeholder="Address" autoComplete='none'/>
            </div>


            <div class="col col-md-12 mx-auto">
            
            <label for="profImage"  data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a image of jpg or jpeg format less than 1 MB ... Without jpeg or jpg it won't work."><AddPhotoAlternateIcon /> Add Profile Image</label>
            <input  id="profImage" type="file" class="form-control"  autoComplete='none' accept=".jpg, .jpeg"/>
            </div>

            <div class="col col-md-12 mx-auto">
            
            <label for="coverImage"  data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a image at least 1024px X 680 px which is clear ... Remember image must be jpg or jpeg format."><AddPhotoAlternateIcon /> Add Cover Image</label>
            <input  id="coverImage" type="file" class="form-control" autoComplete='none' accept=".jpg, .jpeg"/>
            </div>



            

        </div>
        


        <button type="button" className="btn btn-sm btn-primary mx-auto mt-4">Change Profile</button>
        </div>
        </div>

















        </div>
        </div>
    </Fragment>
  )
}

export default ChangeProfile
