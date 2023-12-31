import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { Navigate, Link, Form } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import axios from 'axios';
import WelcomeMsg from './WelcomeMsg';
import uploadimg from '../Asset/Images/upload.png'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


import addFileImg from '../Asset/Images/uploadVideo.png'
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import {motion} from 'framer-motion'
import { callForNotificationApi } from './NotificationApi';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const backendlink = 'http://localhost:8000' // change it according to ur server




const makeItSmoll = (stringVal)=>{
  var changedVal = ''
  if(stringVal.length>43){
    for(let i=0; i<43; i++){
      changedVal += stringVal[i]
    }
    changedVal += '  '+'...'
    return changedVal
  }else{
    return stringVal
  }
}


function YourVideos() {

    const [open, setOpen] = React.useState(false); // Snackbar open close state
    const [responseMessage, setResponseMessage] = React.useState(''); // initially any error or success message at snackbar
    const [uploadProgress, setUploadProgress] = useState(0); // upload state setting 
    const [oldVideos, setOldVideos] = useState([]) //old uploaded vids from rest api
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [thewidth, setWidth] = useState('')

    const token = useSelector((state)=>state.tokenData.token)
    const serial = useSelector((state)=>state.userserialData.serialId)
    const dispatch = useDispatch()
    const username = useSelector((state)=>state.usernameData.username)
    const playerAvatar = useSelector((state) => state.profImgData.proImgPath)

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


    const generatePlainDate = (unusualDate)=>{ // format utc based date to user date 
      const newDate = new Date(unusualDate)
    
      const year = newDate.getFullYear()
      const month = (newDate.getMonth()+1).toString().padStart(2,"0")
      const date = newDate.getDate().toString().padStart(2,"0")
    
      return `${date}-${month}-${year}`
    }
    
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
          return  <span className="badge rounded-pill bg-warning text-dark me-2 headLine" key={index}>{each}&nbsp;&nbsp;&nbsp;<span onClick={(e)=>{delThisTag(e,index)}} className="badge rounded-pill bg-secondary badgeHovcurs normalLine">X</span></span>
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
      setUploadProgress(0)
      document.getElementById('description').value = ''
      document.getElementById('title').value = ''

    }

    // Rest api to call for all old uploaded videos

    const getOldVideosData = async(e)=>{
      try{
        const response = await axios.get(`/getOldUploadedVideos/${serial}`,{
          headers : {
            'Content-Type' : 'application/json'
          }
        })
        if(response.data.message == 'success'){
          setOldVideos(response.data.oldVideos)
        }
      }catch(err){
        console.log(err)
      }
    }



    // show all old videos in card format
    const showAllOldVideosInCard = ()=>{

      return oldVideos.map((each, index)=>{
        return  <motion.div variants={item} transition={{duration: 1.3}} className='col d-flex justify-content-center mb-5' style={{width: thewidth}} key={index}> 
        <motion.div whileHover={{scale:1.065}} transition={{type: 'spring', stiffness: 300}} className="card" style={{width: '16rem', height: '16rem'}}>

        <div style={{maxWidth: '100%', minWidth: '100%', maxHeight: '50%', minHeight:'50%'}}>
        <img style={{width:'100%',height:'100%', objectFit: 'fill', borderTopLeftRadius: '0.3rem', borderTopRightRadius: '0.3rem'}} src={each.thumbnailLink} alt="Card image cap" />
        </div>
        
        <motion.div whileHover={{scale:1.1}} transition={{type: 'spring', stiffness: 1000}} className='loveemo d-flex justify-content-center align-items-center' data-bs-toggle="tooltip" data-bs-placement="left" title={genareteLikedAmount(each.likeamount)}>
        <FavoriteIcon />
        </motion.div>

        <motion.div whileHover={{scale:1.1}} transition={{type: 'spring', stiffness: 1000}} className='loveemo2 d-flex justify-content-center align-items-center'  data-bs-toggle="tooltip" data-bs-placement="left" title={genareteDisLikedAmount(each.dislikedamount)}>
        <HeartBrokenIcon />
        </motion.div>

        <motion.div whileHover={{scale:1.1}} transition={{type: 'spring', stiffness: 1000}} className='loveemo3 d-flex justify-content-center align-items-center' onClick={(e)=>{addThisToWatchlist(e, each._id)}}>
        <AlarmOnIcon />
        </motion.div>

        <Link to={"/seeMyThisVideo/"+each._id}>
        <motion.div whileHover={{scale:1.1}} transition={{type: 'spring', stiffness: 1000}} className='loveemo4 d-flex justify-content-center align-items-center'>
        <PlayArrowIcon fontSize='large'/>
        </motion.div>
        </Link>

        <div className="card-body" style={{backgroundColor: '#c0ff1d'}}>
          <h5 className="card-title d-flex flex-row" style={{borderBottom: '0.1rem solid #5e791a'}}><Stack direction="row" spacing={2}>

          <Avatar
              alt="Remy Sharp"
              src={playerAvatar}
              sx={{ width: 45, height: 45, border: '0.15rem solid #c0ff1d' }}
          />
          </Stack>&nbsp;&nbsp;<span className='mt-2 smollUsername headLine'>{username}<p style={{fontSize: '0.6rem',fontFamily: 'PT Serif'}}>Uploaded At : {generatePlainDate(each.uploadingDate)}</p></span></h5>
          
          <p className="card-text smollTitle normalLine">{makeItSmoll(each.title)}</p>
          
        </div>
        </motion.div>
        </motion.div>
      })
    }

    //upload this video serial to my later watch list
    const addThisToWatchlist = async(e, serialVideo)=>{
      try{
        const response = await axios({
          url :`/addThisToWatchList/${serial}`,
          method : 'post', 
          data : {
            videoSerial : serialVideo
          }
        })

        if(response.data.message == 'success'){
          setResponseMessage('Successfully Added This Video To Watch Later List ...')
          setOpen(true)
        }else{
          setResponseMessage(response.data.message)
          setOpen(true)
        }
      }catch(err){
        console.log(err)
      }
    }

    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    }
    
    const item = {
      hidden: { opacity: 0 },
      show: { opacity: 1 }
    }
    


    // uploading file rest api calling
    const UploadFile = async(e)=>{
        if(videoData.description  && videoData.tags && videoData.thumbnailname && videoData.videoname && videoData.title ){
          const formData = new FormData()
          formData.append('Title', videoData.title)
          formData.append('Description', videoData.description)
          formData.append('Video', videoData.videofile)
          formData.append('Thumbnail', videoData.thumbnailfile)
          formData.append('Tags', videoData.tags)

          const xhr = new XMLHttpRequest()
      
          xhr.open('POST', `${backendlink}/uploadmyfile/${serial}`, true)
          xhr.setRequestHeader('Authorization', `Bearer ${token}`)
          

          xhr.upload.addEventListener('progress', (event)=>{
            if(event.lengthComputable){
              const progress = (event.loaded / event.total) * 100;
              setUploadProgress(progress);
            }
          })

          xhr.addEventListener('load', ()=>{
            if(xhr.status == 200){
              const response = JSON.parse(xhr.responseText)
              if(response.message == 'Your file was successfully uploaded ...'){
                setResponseMessage(response.message)
                setOpen(true)

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
                setUploadProgress(0)
                setUploadSuccess(true)
                document.getElementById('description').value = ''
                document.getElementById('title').value = ''


              }else{
                setResponseMessage(response.message)
                setOpen(true)
                setUploadProgress(0)
              }
            }else{
              setResponseMessage('Some error occured please try later ...')
              setOpen(true)
              setUploadProgress(0)
            }
          })

          xhr.send(formData)



        }
        
    }
    
     // Effects Here
     useEffect(() => {

      const intervalID = setInterval(() => {
        // Your interval logic here
        
            console.log('send api')
            callForNotificationApi(serial, token, dispatch)
  
        }, 50000);

        if(window.innerWidth>710 && window.innerWidth<800){
          setWidth('13.5rem')
        }else if(window.innerWidth>810 && window.innerWidth<900){
          setWidth('14.5rem')
        }else if(window.innerWidth>900 && window.innerWidth<1000){
          setWidth('16rem')
        }else{
          setWidth('')
        }

        // Initialize tooltips when the component mounts
        window.$('[data-bs-toggle="tooltip"]').tooltip();
    

        getOldVideosData()


        //  to clean up the tooltips when the component unmounts
        return () => {
          window.$('[data-bs-toggle="tooltip"]').tooltip('dispose');
          clearInterval(intervalID)
        };

      }, []); // [ ] empty mean it will only run once after first render like component did mount :>


      useEffect(()=>{
        getOldVideosData()
        setUploadSuccess(false)
      },[uploadSuccess])

      useEffect(()=>{
        window.$('[data-bs-toggle="tooltip"]').tooltip('dispose');
        window.$('[data-bs-toggle="tooltip"]').tooltip();
        genareteLikedAmount()
        genareteDisLikedAmount()
        generatePlainDate()
      },[oldVideos])

  return (
    <Fragment>
    <div className='container-fluid pages flex-column'>
    <div className='profilePageHeight'>
        <WelcomeMsg />

        <div className='mt-3 mb-3'>
        <p className='text-center welcomeTxt headLine'>Upload Videos ...</p>
        </div>

        <div className='row row-cols-1 row-cols-md-2 mb-5 d-flex justify-content-center'>

        <motion.div animate={{x : [-400, 0]}} transition={{duration:0.3, type: 'spring', stiffness: 250}} className='col d-flex justify-content-center'> {/* start of upload card column */}

        <div className="card mb-3 bordcol" style={{maxWidth: '500px'}}>
        <div className="row g-0">
          <div className="col-md-4">
          <motion.div whileHover={{scale:1.2}} transition={{type: 'spring', stiffness: 400}} className='mx-auto text-center d-flex justify-content-center align-items-center pt-4'>
          <Stack direction="row" spacing={2}>
  
          <Avatar
              alt="Remy Sharp"
              src={uploadimg}
              sx={{ width: 65, height: 65, border: '0.15rem solid #c0ff1d' }}
          />
          </Stack>
          </motion.div>
          
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title headLine">Upload</h5>
              <p className="card-text normalLine">You can upload any sorts of videos as you like make sure to respect other's and follow community guidelines, if 30 people report your video the video will be automatically removed ...</p>
              
            </div>
            <div className="card-body bordTop">
              
              <button type='button' data-bs-toggle="modal" data-bs-target="#staticBackdrop" className='linkdesGreen bgbordertrans' ><p className="card-text headLine">Click Here ... </p></button>
              
            </div>
          </div>
        </div>
        </div>
        </motion.div> {/* End of upload card column */}


        </div>
        {/* Modal */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content bgbordermodal">
            <div className="modal-header">
                <h5 className="modal-title headLine" id="staticBackdropLabel">Upload Content ...</h5>
                <button onClick={(e)=>{setFullFormEmpty(e)}} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

            <div className="col col-md-12">
            <label for="title" className='headLine'>Title :</label>
            <motion.input whileHover={{scale:1.04}} transition={{type: 'spring', stiffness: 1000}} onChange={(e)=>{setVideoData((prevState)=>({...prevState, title: e.target.value}))}} id="title" type="text" className="form-control mt-1 mb-2"  placeholder="Set video title ..." autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a valid title that suit your video ..."/>
            </div>

            <div className="col col-md-12">
            <label for="description" className='headLine'>Description :</label>
            <motion.textarea whileHover={{scale:1.04}} transition={{type: 'spring', stiffness: 1000}} onChange={(e)=>{setVideoData((prevState)=>({...prevState, description : e.target.value}))}} id="description" type="text" className="form-control mt-1 mb-2 videoaddtextarea"  placeholder="Set video discription ..." autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide description that suits your video ... in 200 words."></motion.textarea>
            </div>
            

            <div className="col col-md-12 mx-auto">
            
            <label for="profImage" className='mt-2 mb-0 headLine'  data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a video content with .mp4 ... Anything else extension is not supported yet. "><PlayCircleIcon /> &nbsp;Add Video Content ... (Click Me)</label>
            <motion.input onChange={(e)=>{setVideoData((prevState)=>({...prevState, videoname: e.target.value, videofile: e.target.files[0]}))}} id="profImage" type="file" className="form-control mb-2"  autoComplete='none' accept=".mp4"/>


            <div className='mt-0'> 
            
            {!videoData.videofile ? <label for="profImage"><img style={{width:'80px', height: '80px', borderRadius: '0.4rem'}} src={addFileImg} /></label> : <video width="245px" height="190px" controls><source src={URL.createObjectURL(videoData.videofile)} type="video/mp4" /></video>}
            
            
            </div>



            </div>


            <div className="col col-md-12 mx-auto">
            
            <label for="coverImage" className='mt-2 headLine'  data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a jpg or jpeg image file as thumbnail ..."><AddPhotoAlternateIcon /> &nbsp;Add Video Thumbnail ... (Click Me)</label>
            <input onChange={(e)=>{setVideoData((prevState)=>({...prevState, thumbnailname: e.target.value, thumbnailfile: e.target.files[0]}))}} id="coverImage" type="file" className="form-control mb-2"  autoComplete='none' accept=".jpg, .jpeg"/>


            <div className='mt-0'> 
            
            {!videoData.thumbnailfile ? <label for="coverImage"><img style={{width:'80px', height: '80px', borderRadius: '0.4rem'}} src={addFileImg} /></label> : <div className='mt-2'><img style={{width:'100px', height: '97px', borderRadius: '0.5rem'}} src={URL.createObjectURL(videoData.thumbnailfile)}  /></div>}
            
            
            </div>

            </div>



            <div className="col col-md-12 mt-1">
            <label for="tags" className='headLine'>Tags :</label>
            <motion.input whileHover={{scale:1.04}} transition={{type: 'spring', stiffness: 1000}} onChange={(e)=>(setCurrentlyInsertedTag(e.target.value))} id="tags" type="text" className="form-control mt-2 mb-2"  placeholder="Set video search tags (lower case letters) ..." autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide video search tags here in one or two word, after each tag enter click add button kindly ..."/>
            <motion.button whileHover={{scale:1.04}} transition={{type: 'spring', stiffness: 1000}} onClick={(e)=>addNewTag(e)} type="button" className="btn btn-sm btn-primary mb-1 headLine">Add</motion.button>
            </div>
            

            <div className="col col-md-12 mt-1">
              {/* show which tag added here*/}
              {videoData.tags ? showAllTags() : null}
            </div>

            <div className="col col-md-12 mt-3">
            <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: uploadProgress}}></div>
            </div>
            </div>
            

            </div>
            <div className="modal-footer">
                <motion.button whileHover={{scale:1.04}} transition={{type: 'spring', stiffness: 1000}} onClick={(e)=>{setFullFormEmpty(e)}} type="button" className="btn btn-sm btn-danger headLine" data-bs-dismiss="modal">Close</motion.button>
                <motion.button whileHover={{scale:1.04}} transition={{type: 'spring', stiffness: 1000}} onClick={(e)=>{UploadFile(e)}} type="button" className="btn btn-sm btn-primary headLine">Upload Video ...</motion.button>
            </div>
            </div>



        </div>
        </div>

        <div className='mt-3 mb-3'>
        <p className='text-center welcomeTxt headLine'>Your Videos ...</p>
        </div>

        <motion.div variants={container} initial="hidden" animate="show" className='row row-cols-1 row-cols-md-4 mb-5 d-flex justify-content-start p-3'>

          {oldVideos ? showAllOldVideosInCard() : null}
          {oldVideos.length<1 ? <div className='d-flex mx-auto w-100 justify-content-center'><p className='mx-auto fontcol normalLine'>You Didn't Post Any Video Yet ...</p></div>:null}



        </motion.div>
        

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

export default YourVideos
