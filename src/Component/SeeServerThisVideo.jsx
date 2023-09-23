import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FlagIcon from '@mui/icons-material/Flag';

import { Navigate, Link, Form, useParams } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import axios from 'axios';

import SearchBar from './SearchBar'



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function SeeServerThisVideo() {
  const [responsiveReplyBox, setResponsiveReply] = useState('')
  const [open, setOpen] = React.useState(false); // Snackbar open close state
  const [responseMessage, setResponseMessage] = React.useState(''); // initially any error or success message at snackbar
  const [brokenTags, setBrokenTags] = useState({
    tags: []
  })
  
  const token = useSelector((state)=>state.tokenData.token)
  const serial = useSelector((state)=>state.userserialData.serialId)
  const {videoSerial} = useParams()


  const [videoData, setVideoData] = useState({
    videourl : '',
    videotitle : '',
    videodescription : '',
    videolike : 0,
    videodislike : 0,
    videouploadtime : null,
    tags: '',
    videoUploader : '',
    videoUploaderImage : '',
    sameVids : []
})


      // call for this video data 
      const getThisVideoData = async()=>{
        try{
            const response = await axios({
                url : `/getThisVideoDataMainVideoSeeingPage`,
                method : 'post',
                data : {
                    videoSl : videoSerial
                }
            }) 
            if(response.data.message == 'success'){

                setVideoData((prevState)=>({...prevState, videourl: response.data.videourl, videotitle: response.data.videotitle, videodescription: response.data.videodescription, videolike: response.data.videolike, videodislike: response.data.videodislike, videouploadtime: response.data.videouploadtime, videoUploader: response.data.videousername, videoUploaderImage: response.data.videouserimage, tags : response.data.videotags, sameVids: response.data.sameTypeVids}))
            }
            
        }catch(err){
            console.log(err)
        }
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
      


  axios.defaults.headers.common['Authorization'] = 'Bearer '+token // axios auth set
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

  const titleBreaker = (oldData)=>{
    if(oldData.length>12){
      
  
        return oldData.slice(0,12)+' ....'
      

    }else{
      return oldData
    }
  }

  // generating same type of videos beside video box
  const generateSameTypeVids = ()=>{
    
    if (videoData.sameVids.length>0){
      return  videoData.sameVids.map((each, index)=>{
        return  <div className='col' key={index}>
        <div class="card" style={{minWidth: '100%'}}>
    
        <div style={{position: 'relative', top: '0%', left:'0%'}}>
          <img className='imageSamevid' src={each.thumbnailLink} />
        </div>
    
    
        <div style={{position:'absolute', top: '-3%', left: '0%'}}>
          <div class="card-body minWidTxt">
            <p class="card-title d-flex flex-row" style={{wordBreak: 'break-all'}}><Stack direction="row" spacing={2}>
                          
            <Avatar
                alt="Remy Sharp"
                src={each.profileImage}
                sx={{ width: 35, height: 35 }}
            />
            </Stack>  <span className='ms-2'><b>{titleBreaker(each.title)}</b></span></p>
            
            <div className='mx-auto text-center' style={{position: 'relative', top: '30%', color: 'green'}}>
            <Link className='linkBtn' to={'/seeServerThisVideo/'+each._id}><PlayArrowIcon fontSize='large'/></Link>
            </div>
        </div>
        
        </div>
        </div>
        </div>
      })
    }
  }


   const showTagBadges = ()=>{
    if(videoData.tags.includes(',')){
      let splitting = videoData.tags.split(',')
      
      return  splitting.map((each)=>{
        return  <span class="badge rounded-pill bg-success me-1">{each}</span>
      })
    }else{
      return  <span class="badge rounded-pill bg-success me-1">{videoData.tags}</span>
    }

   
   }


  // Effects Here
  useEffect(() => {
    if(window.innerWidth<767){
      setResponsiveReply('80%')
    }else{
      setResponsiveReply('90%')
    }


  
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



  useEffect(()=>{
    window.$('[data-bs-toggle="tooltip"]').tooltip('dispose');
    window.$('[data-bs-toggle="tooltip"]').tooltip(); 

    getThisVideoData()
    
  },[videoSerial])

  return (
    <Fragment>
    <div className='container-fluid pages flex-column'>
    <div className='profilePageHeight'>
   

    <SearchBar /> 

    <div className='mx-auto' style={{minWidth: '95%', maxWidth: '95%', padding: '2rem'}}>
    {/* enter video tags which type in badges here ... */}
    {showTagBadges()}
    
    </div>




    <div className='videoBox2'>
    <iframe width="100%" height="100%" src={videoData.videourl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowTransparency allowFullScreen></iframe>
    </div>

    <div className='sameVideos2'>
    {/* generating col with card in link of another video to go back this page with another video link here */}
    <div className='row row-cols-1 row-cols-md-1'>




    {/* each col each video link of same tye */}
    
    {/* each col each video link of same tye */}

    {generateSameTypeVids()}








    </div>

    </div>




    
    
    <div className='d-flex justify-content-center align-items-center iconmain1' data-bs-toggle="tooltip" data-bs-placement="right" title={genareteDisLikedAmount(videoData.videolike)}> 
    <FavoriteIcon fontSize='large'/> 
    </div>

    

    <div className='d-flex justify-content-center align-items-center iconmain2' data-bs-toggle="tooltip" data-bs-placement="right" title={genareteLikedAmount(videoData.videodislike)}> 
    <HeartBrokenIcon fontSize='large'/>
    </div>

    <div className='d-flex justify-content-center align-items-center iconmain3'> 
    <FlagIcon fontSize='large'/>
    </div>

    
    <div className='d-flex justify-content-start titleDesPos flex-column' style={{borderTop: '0.12rem solid #c0ff1d', borderBottom: '0.12rem solid #c0ff1d', wordBreak:'break-word', padding: '2rem'}}>
    <p className='d-flex flex-row'>
    <Stack direction="row" spacing={2}>
                    
    <Avatar
        alt="Remy Sharp"
        src={videoData.videoUploaderImage}
        sx={{ width: 56, height: 56 }}
    />
    </Stack> <span className='ms-3'><b>{videoData.videoUploader}</b><br></br><span style={{fontSize:'0.7rem'}}>Uplodaded At : {generatePlainDate(videoData.videouploadtime)}</span></span>
    </p>
    <p style={{whiteSpace: 'pre-line', fontWeight: 'bold'}}>Title : {videoData.videotitle} </p>
    <p style={{whiteSpace: 'pre-line', fontSize: '0.8rem'}}> {videoData.videodescription}</p>
    </div>


    <div className='commentsArea2 d-flex justify-content-center align-items-center flex-column mx-auto'>
      <h5>Comments ...</h5>
      <div id="inputindexNo"  class="card-body d-flex justify-content-center align-items-center" style={{width:'100%'}}>
    
    <input type="text" class="form-control bgsearch" placeholder="Send Comment" aria-label="Send Comment Bar" aria-describedby="button-addon2" />
    <button class="btn searchbtn" type="button" id="button-addon2"><SendIcon /></button>
    
    
    </div>
      
      
    </div>


    <div className='allComments mx-auto' style={{padding: '2rem'}}>

    <div className='row row-cols-1 row-cols-md-1'>
      




    
    <div>

    {/*card col loop each reply has one card with col */}
    <div className='col col-md-12' style={{whiteSpace : 'pre-line', marginBottom:'2rem'}}>
    <div class="card" style={{width: '98.5%', border: '0.12rem solid #c0ff1d'}}>
    
    <div class="card-body">
      <h5 class="card-title d-flex flex-row" style={{borderBottom: '0.1rem solid #5e791a'}}>
      <Stack direction="row" spacing={2}>

          <Avatar
              alt="Remy Sharp"
              src="commenters avatar"
              sx={{ width: 45, height: 45, border: '0.15rem solid #c0ff1d' }}
          />
          </Stack>&nbsp;&nbsp;<span className='mt-2 smollUsername'>"commenters username"<p style={{fontSize: '0.6rem'}}>Commented At : commenting time </p></span>
      </h5>
      <p class="card-text" style={{whiteSpace: 'pre-line', padding : '1rem', backgroundColor: '#c0ff1d', borderRadius: '0.8rem'}}>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      
    </div>

    <div  class="card-body d-flex justify-content-start align-items-center">
    <p><span class="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><FavoriteIcon/> 797M</span> <span class="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><HeartBrokenIcon fontSize='medium'/> 999M</span> <span class="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}>Reply <SendIcon fontSize='medium'/></span> </p>
    </div>


    {/* hidden input area */}
    <div id="inputindexNo"  class="card-body d-flex justify-content-center align-items-center">
    
    <input type="text" class="form-control bgsearch" placeholder="Send Reply" aria-label="Send Reply Bar" aria-describedby="button-addon2" />
    <button class="btn searchbtn" type="button" id="button-addon2"><SendIcon /></button>
    
    
    </div>


    </div>
    </div>

    {/*card col loop each reply has one card with col */}
    


    {/*comments reply */}
    <div className='col col-md-12' style={{whiteSpace : 'pre-line', marginBottom:'2rem'}}>
    <div class="card ms-auto me-3" style={{width: responsiveReplyBox, border: '0.12rem solid #c0ff1d'}}>
    

    <div class="card-body">
      <h5 class="card-title d-flex flex-row" style={{borderBottom: '0.1rem solid #5e791a'}}>
      <Stack direction="row" spacing={2}>

          <Avatar
              alt="Remy Sharp"
              src="commenters avatar"
              sx={{ width: 45, height: 45, border: '0.15rem solid #c0ff1d' }}
          />
          </Stack>&nbsp;&nbsp;<span className='mt-2 smollUsername'>"Replier username"<p style={{fontSize: '0.6rem'}}>Replied At : commenting time </p></span>
      </h5>
      <p class="card-text" style={{whiteSpace: 'pre-line', padding : '1rem', backgroundColor: '#c0ff1d', borderRadius: '0.8rem'}}>Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      
    </div>

    <div  class="card-body d-flex justify-content-start align-items-center">
    <p><span class="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><FavoriteIcon/> 797M</span> <span class="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><HeartBrokenIcon fontSize='medium'/> 999M</span> </p>
    </div>



    </div>
    </div>


    {/*comment replier ends*/}

    </div>







    </div>

    </div>


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

export default SeeServerThisVideo
