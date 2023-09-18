import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { Navigate, Link, Form, useParams } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

import SearchBar from './SearchBar';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function SeeMyThisVideo() {
    const [open, setOpen] = React.useState(false); // Snackbar open close state
    const [responseMessage, setResponseMessage] = React.useState(''); // initially any error or success message at snackbar
    const [videoData, setVideoData] = useState([])

    const token = useSelector((state)=>state.tokenData.token)
    const serial = useSelector((state)=>state.userserialData.serialId)
    const username = useSelector((state)=>state.usernameData.username)
    const playerAvatar = useSelector((state) => state.profImgData.proImgPath)
    const {videoSerial} = useParams()

    axios.defaults.headers.common['Authorization'] = 'Bearer '+token // axios auth set


    // call for this video data 
    const getThisVideoData = async()=>{
        try{
            const response = await axios({
                url : `/getThisVideoData/${serial}`,
                method : 'post',
                data : {
                    videoSl : videoSerial
                }
            }) 
            if(response.data.message == 'success'){

                setVideoData(response.data.videoData)
            }
            console.log(videoData)
        }catch(err){
            console.log(err)
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

        // Initialize tooltips when the component mounts
        window.$('[data-bs-toggle="tooltip"]').tooltip();
    

        getThisVideoData()

        //  to clean up the tooltips when the component unmounts
        return () => {
          window.$('[data-bs-toggle="tooltip"]').tooltip('dispose');
        };

      }, []); // [ ] empty mean it will only run once after first render like component did mount :>


  return (
    <Fragment>
    <div className='container-fluid pages flex-column'>
    <div className='profilePageHeight'>
   

    <SearchBar /> 
    
    <div className='videoBox mx-auto mt-3'>
    <video className='videoPlayer' controls><source src="#" type="video/mp4" /></video>
    <div className='d-flex justify-content-center align-items-center icons'> 
    <SettingsIcon fontSize='large'/>
    </div>

    <div className='d-flex justify-content-center align-items-center icons2'> 
    <DeleteSweepIcon fontSize='large'/>
    </div>
    
    <div className='d-flex justify-content-center align-items-center icons3'> 
    <FavoriteIcon fontSize='large'/>
    </div>

    <div className='d-flex justify-content-center align-items-center icons4'> 
    <HeartBrokenIcon fontSize='large'/>
    </div>

    

    </div>
    
    <hr></hr>

    



    
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
