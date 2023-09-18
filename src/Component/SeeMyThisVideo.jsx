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
    // Redirecting back state
  const [nowGoBack, setNowGoBack] = React.useState(false);
    const [videoData, setVideoData] = useState({
        videourl : '',
        videotitle : '',
        videodescription : '',
        videolike : 0,
        videodislike : 0,
        videouploadtime : null,
        tags:[]
    })
    
    // convert huge like amount to K or M
  const genareteLikedAmount = (bigAmount)=>{
    if (bigAmount>1000000){
      return Math.floor(bigAmount/1000000)+"M"
    }else if(bigAmount>1000){
      return Math.floor(bigAmount/1000)+"K"
    }else{
      return bigAmount
    }
  }
  
  const generatePlainDate = (unusualDate)=>{ // format utc based date to user date 
    const newDate = new Date(unusualDate)
  
    const year = newDate.getFullYear()
    const month = (newDate.getMonth()+1).toString().padStart(2,"0")
    const date = newDate.getDate().toString().padStart(2,"0")
  
    return `${date}-${month}-${year}`
  }
  
  
  // convert huge disliked amount to K or M
  const genareteDisLikedAmount = (bigAmount)=>{
    if (bigAmount>1000000){
      return Math.floor(bigAmount/1000000)+"M"
    }else if(bigAmount>1000){
      return Math.floor(bigAmount/1000)+"K"
    }else{
      return bigAmount
    }
  }
  


  

    const token = useSelector((state)=>state.tokenData.token)
    const serial = useSelector((state)=>state.userserialData.serialId)
    const username = useSelector((state)=>state.usernameData.username)
    const playerAvatar = useSelector((state) => state.profImgData.proImgPath)
    const {videoSerial} = useParams()

    axios.defaults.headers.common['Authorization'] = 'Bearer '+token // axios auth set


   
  
  
      const [currentlyInsertedTag, setCurrentlyInsertedTag] = useState('')


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

                setVideoData((prevState)=>({...prevState, videourl: response.data.videourl, videotitle: response.data.videotitle, videodescription: response.data.videodescription, videolike: response.data.videolike, videodislike: response.data.videodislike, videouploadtime: response.data.videouploadtime}))
            }
            
        }catch(err){
            console.log(err)
        }
    }

    // calling delete video rest api
    const deleteThisVideo = async(e, videoSl)=>{
        try{

            const response = await axios({
                url : `/deleteThisVideo/${serial}`,
                method : 'post',
                data : {
                    videoSlNo : videoSl
                }
            })
            if(response.data.message == 'success'){
                setResponseMessage('Successfully deleted the video ...')
                setOpen(true)
                setNowGoBack(true)
            }

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


      const addNewTag = (e)=>{ // add tag to old tags state than make input field vanish 
        if(currentlyInsertedTag){
  
          const newTags = [...videoData.tags, currentlyInsertedTag];
      
          setVideoData((prevState)=>({...prevState, tags: newTags }))
          setCurrentlyInsertedTag('')
          document.getElementById('tags').value = ''
          
        } 
        
      }
  
      // show all tags with delete feature 
      const showAllTags = ()=>{
        if(videoData.tags){
          return videoData.tags.map((each, index)=>{
            return  <span class="badge rounded-pill bg-warning text-dark me-2" key={index}>{each}&nbsp;&nbsp;&nbsp;<span onClick={(e)=>{delThisTag(e,index)}} class="badge rounded-pill bg-secondary badgeHovcurs">X</span></span>
          })
        }
      }
  
      // det that tag
      const delThisTag = (e, tagNo)=>{
        let fullArray = videoData.tags
        fullArray.splice(tagNo,1)
  
        setVideoData((prevState)=>({...prevState, tags : fullArray}))
  
  
      } 

      // setting new title
      const setNewTitle=(e)=>{
        setVideoData((prevState)=>({...prevState, videotitle: e.target.value}))
      }
  
      // setting new video description
      const setNewDesc = (e)=>{
        setVideoData((prevState)=>({...prevState, videodescription: e.target.value}))
      }
    
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

      useEffect(()=>{
        window.$('[data-bs-toggle="tooltip"]').tooltip('dispose');
        window.$('[data-bs-toggle="tooltip"]').tooltip();
        genareteLikedAmount()
        genareteDisLikedAmount()
        generatePlainDate()
      },[videoData.videolike, videoData.videodislike, videoData.videouploadtime])
      

  return (
    <Fragment>
    <div className='container-fluid pages flex-column'>
    <div className='profilePageHeight'>
   

    <SearchBar /> 
    
    <div className='videoBox mx-auto mt-3'>
    <iframe className='videoPlayer' src={videoData.videourl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>
    
    <div className='d-flex justify-content-center align-items-center icons' data-bs-toggle="modal" data-bs-target="#staticBackdrop"> 
    <SettingsIcon fontSize='large'/>
    </div>

    <div onClick={(e)=>{deleteThisVideo(e, videoSerial)}} className='d-flex justify-content-center align-items-center icons2'> 
    <DeleteSweepIcon fontSize='large'/>
    </div>
    
    <div className='d-flex justify-content-center align-items-center icons3' data-bs-toggle="tooltip" data-bs-placement="right" title={genareteLikedAmount(videoData.videolike)}> 
    <FavoriteIcon fontSize='large'/> 
    </div>

    

    <div className='d-flex justify-content-center align-items-center icons4' data-bs-toggle="tooltip" data-bs-placement="right" title= {genareteDisLikedAmount(videoData.videodislike)}> 
    <HeartBrokenIcon fontSize='large'/>
    </div>

    

    </div>
    
    <hr></hr>


    



    
    </div>
    </div>






    {/* Modal */}
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content bgbordermodal">
        <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Update Content ...</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

        

        <div class="col col-md-12 mx-auto">
        
        
        <div className='mt-0'> 
        
        <iframe style={{width: '245px', height: '190px'}} src={videoData.videourl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>
        
        </div>



        </div>




        <div class="col col-md-12">
        <label for="title"><b>Title :</b></label>
        <input onChange={(e)=>{setNewTitle(e)}} value={videoData.videotitle} id="title" type="text" className="form-control mt-1 mb-2"  placeholder="Set video title ..." autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a valid title that suit your video ..."/>
        </div>

        <div class="col col-md-12">
        <label for="description"><b>Description :</b></label>
        <textarea onChange={(e)=>{setNewDesc(e)}} value={videoData.videodescription} id="description" type="text" className="form-control mt-1 mb-2 videoaddtextarea"  placeholder="Set video discription ..." autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide description that suits your video ... in 200 words."></textarea>
        </div>
        



        <div class="col col-md-12 mt-1">
        <label for="tags"><b>Tags :</b></label>
        <input onChange={(e)=>(setCurrentlyInsertedTag(e.target.value))} id="tags" type="text" className="form-control mt-2 mb-2"  placeholder="Set video search tags ..." autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide video search tags here in one or two word, after each tag enter click add button kindly ..."/>
        <button onClick={(e)=>addNewTag(e)} type="button" class="btn btn-sm btn-primary mb-1">Add</button>
        </div>
        

        <div class="col col-md-12 mt-1">
          {/* show which tag added here*/}
          {videoData.tags ? showAllTags() : null}
        </div>

        
        

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-danger" data-bs-dismiss="modal">Close</button>
            <button  type="button" class="btn btn-sm btn-primary">Update Video ...</button>
        </div>
        </div>



    </div>
    </div>







    {nowGoBack ? <Navigate to='/yourVideos' replace /> : null}

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
