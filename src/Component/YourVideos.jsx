import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { Navigate, Link } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import axios from 'axios';
import WelcomeMsg from './WelcomeMsg';
import uploadimg from '../Asset/Images/upload.png'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

import addFileImg from '../Asset/Images/addfile.webp'


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  


function YourVideos() {
    const [open, setOpen] = React.useState(false); // Snackbar open close state
    const [responseMessage, setResponseMessage] = React.useState(''); // initially any error or success message at snackbar

    const token = useSelector((state)=>state.tokenData.token)
    const serial = useSelector((state)=>state.userserialData.serialId)

    axios.defaults.headers.common['Authorization'] = 'Bearer '+token // axios auth set

    const [videoData, setVideoData] = useState({
      title : '',
      description : '',
      videoname : '',
      videofile : null,
      thumbnailname : '',
      thumbnailfile : null,
      tags : []
    })

    const [currentlyInsertedTag, setCurrentlyInsertedTag] = useState('')

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

    // when close or X button clicked empty old form
    const setFullFormEmpty = ()=>{
      setVideoData({
        title : '',
        description : '',
        videoname : '',
        videofile : null,
        thumbnailname : '',
        thumbnailfile : null,
        tags : []
      })

      setCurrentlyInsertedTag('')
    }

    
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

        <div className='mt-3 mb-3'>
        <p className='text-center welcomeTxt'><b>Upload Videos ...</b></p>
        </div>

        <div className='row row-cols-1 row-cols-md-2 mb-5 d-flex justify-content-center'>

        <div className='col d-flex justify-content-center'> {/* start of upload card column */}

        <div class="card mb-3 bordcol" style={{maxWidth: '500px'}}>
        <div class="row g-0">
          <div class="col-md-4">
          <div className='mx-auto text-center d-flex justify-content-center align-items-center pt-4'>
          <Stack direction="row" spacing={2}>
  
          <Avatar
              alt="Remy Sharp"
              src={uploadimg}
              sx={{ width: 65, height: 65, border: '0.15rem solid #c0ff1d' }}
          />
          </Stack>
          </div>
          
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Upload</h5>
              <p class="card-text">You can upload any sorts of videos as you like make sure to respect other's and follow community guidelines, if 30 people report your video the video will be automatically removed ...</p>
              
            </div>
            <div class="card-body bordTop">
              
              <button type='button' data-bs-toggle="modal" data-bs-target="#staticBackdrop" className='linkdesGreen bgbordertrans' ><p class="card-text">Click Here ... </p></button>
              
            </div>
          </div>
        </div>
        </div>
        </div> {/* End of upload card column */}


        </div>
        {/* Modal */}
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content bgbordermodal">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Upload Content ...</h5>
                <button onClick={(e)=>{setFullFormEmpty(e)}} type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

            <div class="col col-md-12">
            <label for="title"><b>Title :</b></label>
            <input id="title" type="text" className="form-control mt-1 mb-2"  placeholder="Set video title ..." autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a valid title that suit your video ..."/>
            </div>

            <div class="col col-md-12">
            <label for="description"><b>Description :</b></label>
            <textarea id="description" type="text" className="form-control mt-1 mb-2 videoaddtextarea"  placeholder="Set video discription ..." autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide description that suits your video ... in 200 words."></textarea>
            </div>
            

            <div class="col col-md-12 mx-auto">
            
            <label for="profImage" className='mt-2 mb-0'  data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a video content with .mp4 ... Anything else extension is not supported yet. "><PlayCircleIcon /><b>Add Video Content ... (Click Me)</b></label>
            <input onChange={(e)=>{setVideoData((prevState)=>({...prevState, videoname: e.target.value, videofile: e.target.files[0]}))}} id="profImage" type="file" class="form-control mb-2"  autoComplete='none' accept=".mp4"/>


            <div className='mt-0'> 
            
            {!videoData.videofile ? <label for="profImage"><img style={{width:'100px', height: '97px'}} src={addFileImg} /></label> : <video width="245px" height="190px" controls><source src={URL.createObjectURL(videoData.videofile)} type="video/mp4" /></video>}
            
            
            </div>



            </div>


            <div class="col col-md-12 mx-auto">
            
            <label for="coverImage" className='mt-2'  data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a jpg or jpeg image file as thumbnail ..."><AddPhotoAlternateIcon /><b>Add Video Thumbnail ... (Click Me)</b></label>
            <input onChange={(e)=>{setVideoData((prevState)=>({...prevState, thumbnailname: e.target.value, thumbnailfile: e.target.files[0]}))}} id="coverImage" type="file" class="form-control mb-2"  autoComplete='none' accept=".jpg, .jpeg"/>


            <div className='mt-0'> 
            
            {!videoData.thumbnailfile ? <label for="coverImage"><img style={{width:'100px', height: '97px'}} src={addFileImg} /></label> : <div className='mt-2'><img style={{width:'100px', height: '97px', borderRadius: '0.5rem'}} src={URL.createObjectURL(videoData.thumbnailfile)}  /></div>}
            
            
            </div>

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
                <button onClick={(e)=>{setFullFormEmpty(e)}} type="button" class="btn btn-sm btn-danger" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-sm btn-primary">Upload Video ...</button>
            </div>
            </div>



        </div>
        </div>

        

    </div>
    </div>

    </Fragment>
  )
}

export default YourVideos