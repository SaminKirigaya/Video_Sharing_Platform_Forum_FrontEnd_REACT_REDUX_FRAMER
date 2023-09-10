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

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';
import catGroup from '../Asset/Images/catGroup.jpg'

import { Link } from 'react-router-dom';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import sleep from '../Asset/Images/sleep.jpg';
import watching from '../Asset/Images/watching.jpg';

function Regstration() {
    const [imageName, setimageName] = React.useState(watching); // cat watching or sleep image

    const [passState, setpassState] = useState(false); // password field icon and text changing hide or unhide
    const [passState2, setpassState2] = useState(false); // confirm password field icon and text changing hide or unhide

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
        <h5 className="card-title mx-auto">REGISTER</h5>

    
        <div class="row row-cols-1 row-cols-md-2 g-2 mx-auto mt-3">
            <div class="col col-md-12">
            
            <input type="email" className="form-control"  placeholder="@Email" autoComplete='none'/>
            </div>

            <div class="col col-md-12">
            
            <input type="text" class="form-control" placeholder="User Name" autoComplete='none'/>
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
            
            <input type="text" class="form-control"  placeholder="Address" autoComplete='none'/>
            </div>


            <div class="col col-md-12 mx-auto">
            
            <label for="profImage"><AddPhotoAlternateIcon /> Add Profile Image</label>
            <input id="profImage" type="file" class="form-control"  placeholder="Address" autoComplete='none'/>
            </div>

            <div class="col col-md-12 mx-auto">
            
            <label for="profImage"><AddPhotoAlternateIcon /> Add Cover Image</label>
            <input id="profImage" type="file" class="form-control"  placeholder="Address" autoComplete='none'/>
            </div>


            <div class="col col-md-12">
            <div className='eye' onClick={(e)=>{passState ? setpassState(false) : setpassState(true)}}>{passState ? <VisibilityOffIcon /> : <VisibilityIcon />}</div>
            <input id="pass" type="text" class="form-control"  placeholder="Password" autoComplete='none'/>
            </div>

            <div class="col col-md-12 mt-0">
            <div className='eye' onClick={(e)=>{passState2 ? setpassState2(false) : setpassState2(true)}}>{passState2 ? <VisibilityOffIcon /> : <VisibilityIcon />}</div>
            <input id="conpass" type="text" class="form-control"  placeholder="Confirm Password" autoComplete='none'/>
            </div>

        </div>
        


        <button type="button" className="btn btn-sm btn-primary mx-auto mt-4">Register</button>
        </div>
        </div>

        <sup className='mt-4 linkBtn2'>Already Have ID ? .... <Link className='linkBtn2' to='/login'>Click Here</Link><br></br></sup>
        <sup className='mt-4 linkBtn2'>Forgot Password ? .... <Link className='linkBtn2' to='/forgotPass'>Click Here</Link></sup>
     
    </div>
    </div>
        </Fragment>
    )
}

export default Regstration
