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
import SendIcon from '@mui/icons-material/Send';

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
        totalViews: 0,
        videodescription : '',
        videolike : 0,
        videodislike : 0,
        videouploadtime : null,
        tags:[]
    })

    const [resMargin, setResMargin] = useState('')
    const [paddingRes, setPaddingRes] = useState('')
    const [responsiveReplyBox, setResponsiveReply] = useState('')

    
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

                setVideoData((prevState)=>({...prevState, videourl: response.data.videourl, videotitle: response.data.videotitle, videodescription: response.data.videodescription, videolike: response.data.videolike, videodislike: response.data.videodislike, videouploadtime: response.data.videouploadtime, totalViews: response.data.totalViews}))
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
                setTimeout(()=>{
                    setNowGoBack(true)
                },1100)
                
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

      //send new video detail info
      const sendNewInfo=async(e, videoSerial)=>{
        const formData = new FormData()
        try{
            formData.append('newTitle', videoData.videotitle)
            formData.append('newDesc', videoData.videodescription)
            formData.append('tags', videoData.tags)
            formData.append('videoSl', videoSerial)

            const response = await axios.post(`/setNewDetails/${serial}`, formData, {
                headers : {
                    'Content-Type' : 'application/json'
                }
            })

            if(response.data.message == 'success'){
                setResponseMessage('Successfully updated your video details ...')
                setOpen(true)

                getThisVideoData()
                

            }else{
                setResponseMessage(response.data.message)
                setOpen(true)
            }
        }catch(error){
            console.log(error)
        }
      }
    
    // Effects Here
    useEffect(() => {
        if(window.innerWidth<767){
          setResponsiveReply('80%')
        }else{
          setResponsiveReply('90%')
        }

        if(window.innerWidth<539){
          //2.5
          setPaddingRes('2.5rem')
        }else if(window.innerWidth>539 && window.innerWidth<767){
          // 3.5
          setPaddingRes('3.5rem')
        }else if(window.innerWidth>767 && window.innerWidth<911){
          //4.5
          setPaddingRes('4.5rem')
        }else if(window.innerWidth>911){
          //5
          setPaddingRes('5rem')
        }


        if(window.innerWidth<540){
          setResMargin('1.5rem')
        }else if(window.innerWidth>541){
          setResMargin('2.5rem')
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
      

  return (
    <Fragment>
    <div className='container-fluid pages flex-column'>
    <div className='profilePageHeight'>
   

    <SearchBar /> 
    
    <div className='videoBox mx-auto mt-3'>
    <iframe width="100%" height="100%" src={videoData.videourl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>
    
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

    <div style={{padding: paddingRes, borderBottom: '0.1rem solid #c0ff1d'}}>


      
    <p className='d-flex flex-row' style={{marginTop: '2rem'}}>
    <Stack direction="row" spacing={2}>
                    
    <Avatar
        alt="Remy Sharp"
        src={playerAvatar}
        sx={{ width: 56, height: 56 }}
    />
    </Stack> <span className='ms-3'><b>{username}</b><br></br><span style={{fontSize:'0.7rem'}}>Uplodaded At : {generatePlainDate(videoData.videouploadtime)}</span><br></br><span style={{fontSize:'0.7rem'}}>Total Views : {videoData.totalViews}</span></span>
    </p>

    
    <div className='row row-cols-1 row-cols-md-1' style={{marginTop: resMargin, marginLeft: '0.5rem'}}>
      <div className='col col-md-12'>
        <h5>Title : {videoData.videotitle}</h5>
      </div>
    </div>

    <div className='row row-cols-1 row-cols-md-1' style={{marginTop: '0.5rem', marginLeft: '0.5rem', whiteSpace:'pre-line'}}>
      <div className='col col-md-12' style={{whiteSpace : 'pre-line'}}>
        <p style={{fontSize: '0.8rem'}}>{videoData.videodescription}</p>
      </div>
    </div>

    </div>

    <div style={{padding: '0.3rem'}}>

    <div className='row row-cols-1 row-cols-md-1' style={{marginTop: resMargin, marginLeft: '0.5rem'}}>
    <h5 className='mx-auto text-center' style={{marginBottom: '2rem', color:'#42590a'}}>All Comments </h5>
    








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
    <p><span class="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><FavoriteIcon/> 797M</span> <span class="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><HeartBrokenIcon fontSize='medium'/> 999M</span> <span class="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}>Reply <SendIcon fontSize='medium'/></span> <span class="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><DeleteSweepIcon fontSize='medium'/></span> </p>
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
            <button onClick={(e)=>{sendNewInfo(e, videoSerial)}} type="button" class="btn btn-sm btn-primary">Update Video ...</button>
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
