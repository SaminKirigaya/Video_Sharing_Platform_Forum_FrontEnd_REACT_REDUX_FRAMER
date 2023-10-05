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
  // Redirecting back state
  const [nowGoBack, setNowGoBack] = React.useState(false);
  const [responsiveReplyBox, setResponsiveReply] = useState('')
  const [open, setOpen] = React.useState(false); // Snackbar open close state
  const [responseMessage, setResponseMessage] = React.useState(''); // initially any error or success message at snackbar
  const [stringComment, setStringComment] = useState('')
  
  const [eventSuccess, setEventSuccess] = useState(false)
  
  const token = useSelector((state)=>state.tokenData.token)
  const serial = useSelector((state)=>state.userserialData.serialId)
  const {videoSerial} = useParams()

  const [showHideComment, setShowHideComment] = useState(false)
  const [commentReplay, setCommentReplay] = useState('')
  const [iframemargin, setIframemargin] = useState('')

  const [videoData, setVideoData] = useState({
    videourl : '',
    videotitle : '',
    videodescription : '',
    videolike : 0,
    videodislike : 0,
    videouploadtime : null,
    totalViews : 0,
    tags: '',
    videoUploader : '',
    videoUploaderImage : '',
    sameVids : []
})

  const [videoComs, setVideoComs] = useState({
    videoComs : [],
    comsReply : []
  })

  const [colWidth, setColWidth] = useState('')


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

                setVideoData((prevState)=>({...prevState, videourl: response.data.videourl, videotitle: response.data.videotitle, videodescription: response.data.videodescription, videolike: response.data.videolike, videodislike: response.data.videodislike, videouploadtime: response.data.videouploadtime, videoUploader: response.data.videousername, videoUploaderImage: response.data.videouserimage, tags : response.data.videotags, sameVids: response.data.sameTypeVids, totalViews: response.data.totalViews}))
            }
            
        }catch(err){
            console.log(err)
        }
      
    }

    // call for add comments regarding this video
    const getThisVideoComms = async()=>{
      try{
        const res = await axios({
          url : `/getThisVideoComsMainPage`,
          method : 'post',
          data : {
              videoSl : videoSerial
          }
      }) 
      const [response] = await Promise.all([res])
      if(response.data.message == 'success'){
          await Promise.all(
          setVideoComs((prevState)=>({...prevState, videoComs : response.data.comments}))
          )
      }

     

      }catch(err){
        console.log(err)
      }
    }
    
    

      // generate commenting time format
      const generateCommentingTime = (oldTime)=>{
        var amorpm = ''
        const oldOne = new Date(oldTime) 
        const year = oldOne.getFullYear()
        const month = (oldOne.getMonth()+1).toString().padStart(2,"0")
        const day = oldOne.getDate().toString().padStart(2,"0")
        var hours = oldOne.getHours()
        if(hours>12){
          hours = (hours-12).toString()
          amorpm = 'pm'
        }else if(hours<12){
          hours = (hours).toString()
          amorpm = 'am'
        }else if(hours == 0){
          hours = (hours).toString()
          amorpm = 'am'
        }else if(hours == 12){
          hours = '12'
          amorpm = 'pm'
        }

        const minutes = oldOne.getMinutes().toString().padStart(2,"0")

        return  `${day}-${month}-${year}, ${hours}:${minutes} ${amorpm}`
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
        <div className="card" style={{minWidth: '100%'}}>
    
        <div style={{position: 'relative', top: '0%', left:'0%'}}>
          <img className='imageSamevid' src={each.thumbnailLink} />
        </div>
    
    
        <div style={{position:'absolute', top: '-3%', left: '0%'}}>
          <div className="card-body minWidTxt">
            <p className="card-title d-flex flex-row" style={{wordBreak: 'break-all'}}><Stack direction="row" spacing={2}>
                          
            <Avatar
                alt="Remy Sharp"
                src={each.profileImage}
                sx={{ width: 35, height: 35 }}
            />
            </Stack>  <span className='ms-2'><b>{titleBreaker(each.title)}</b></span></p>
            
            <div className='mx-auto text-center d-flex justify-content-center' style={{position: 'relative', top: '30%', color: 'green'}}>
            <Link className='linkBtn mx-auto d-flex justify-content-center' to={'/seeServerThisVideo/'+each._id}><PlayArrowIcon fontSize='large'/></Link>
            </div>
        </div>
        
        </div>
        </div>
        </div>
      })
    }
  }

  // giving love react
  const giveLoveReact = async(e, videoSerial)=>{
    if(token){
      try{
        const response = await axios({
          url : `/likeThisVideo/${serial}`,
          method : 'post',
          data : {
            videoSl : videoSerial
          }
        })
        if(response.data.message == 'success'){
          setEventSuccess(true)
        }
      }catch(err){
        console.log(err)
      }
    }else{
      setResponseMessage('You are not logged in yet, please log in first ...')
      setOpen(true)
    }
  }


  // giving dis love react
  const giveDisLoveReact = async(e, videoSerial)=>{
    if(token){
      try{
        const response = await axios({
          url : `/dislikeThisVideo/${serial}`,
          method : 'post',
          data : {
            videoSl : videoSerial
          }
        })
        if(response.data.message == 'success'){
          setEventSuccess(true)
        }
      }catch(err){
        console.log(err)
      }
    }else{
      setResponseMessage('You are not logged in yet, please log in first ...')
      setOpen(true)
    }
  }

  // give report at post 
  
  const giveReport = async(e, videoSerial)=>{
    if(token){
      try{
        const response = await axios({
          url : `/reportThisVideo/${serial}`,
          method : 'post',
          data : {
            videoSl : videoSerial
          }
        })
        if(response.data.message == 'success'){
          setResponseMessage('Successfully reported the video ...')
          setOpen(true)
          
          setEventSuccess(true)
          
        }
        else if(response.data.message == 'Already reported ...'){
          setResponseMessage('You already reported the video ...')
          setOpen(true)
          
        }
      }catch(err){
        console.log(err)
      }
    }else{
      setResponseMessage('You are not logged in yet, please log in first ...')
      setOpen(true)
    }
  }

  // sending a comment 
  const sendComment = async(e)=>{
    if(token && serial){
    if(stringComment.length>1){
    try{
      const response = await axios({
        url : `/sendThisComment/${serial}`,
        method : 'post',
        data : {
          comment : stringComment,
          videoSl : videoSerial,
        }
      })
      if(response.data.message == 'success'){
        setResponseMessage('Successfully Commented ...')
        setOpen(true)
        setEventSuccess(true)

        setStringComment('')
        document.getElementById('comment').value = ''
      }else{
        setResponseMessage(response.data.message)
        setOpen(true)
      }
    }catch(err){
      console.log(err)
    }
  }
  }else{
    setResponseMessage('You need to log in to comment in a post ...')
    setOpen(true)
  }
  }

  // setting comments rely and sending 
  const sendCommentReplay = async (e, commentId, inputboxId)=>{
    if(token && serial){
    if(commentReplay.length>1){
      try{
        const response = await axios({
          url : `/sendThisCommentReplay/${serial}`,
          method : 'post',
          data : {
            commentid : commentId,
            replay : commentReplay,
            videoSl : videoSerial,
          }
        })
        if(response.data.message == 'success'){
          setResponseMessage('Successfully Replied ...')
          setOpen(true)
          setEventSuccess(true)
  
          setCommentReplay('')
          document.getElementById(inputboxId).value = ''
        }else{
          setResponseMessage(response.data.message)
          setOpen(true)
        }
      }catch(err){
        console.log(err)
      }
    }
    }else{
      setResponseMessage('You need to log in to replay in comment in a post ...')
      setOpen(true)
    }
  }

  const showMeReplyArea = (e, idName)=>{ // toggle on off replying area
    if(!showHideComment){
      setShowHideComment(true)
      document.getElementById(idName).classList.remove('d-none')
      document.getElementById(idName).classList.add('d-flex')
    }else{
      setShowHideComment(false)
      document.getElementById(idName).classList.remove('d-flex')
      document.getElementById(idName).classList.add('d-none')
    }
  }


  // send love to a comment specific
  const sendLoveToComment = async(e, idNo) =>{
    if(token && serial){


      try{
        const response = await axios({
          url : `/sendThisCommentLove/${serial}`,
          method : 'post',
          data : {
            commentid : idNo,
            videoSl : videoSerial,
          }
        })
        if(response.data.message == 'success'){
          
          setEventSuccess(true)
  
        
        }
      }catch(err){
        console.log(err)
      }



    }else{
      setResponseMessage('You need to log in to react in a comment of a post ...')
      setOpen(true)
    }
  }


  
  // send love to a comment specific
  const sendDisloveToComment = async(e, idNo) =>{
    if(token && serial){

      try{
        const response = await axios({
          url : `/sendThisCommentADislove/${serial}`,
          method : 'post',
          data : {
            commentid : idNo,
            videoSl : videoSerial,
          }
        })
        if(response.data.message == 'success'){
          
          setEventSuccess(true)
  
        
        }
      }catch(err){
        console.log(err)
      }



    }else{
      setResponseMessage('You need to log in to react in a comment of a post ...')
      setOpen(true)
    }
  }

  // Give love to specific replay
  const sendReplayLove = async(e, idNo)=>{
    if(token && serial){


      try{
        const response = await axios({
          url : `/sendThisCommentReplayLove/${serial}`,
          method : 'post',
          data : {
            replayid : idNo,
            videoSl : videoSerial,
          }
        })
        if(response.data.message == 'success'){
          
          setEventSuccess(true)
  
        
        }
      }catch(err){
        console.log(err)
      }



    }else{
      setResponseMessage('You need to log in to react in a comment replay of a post ...')
      setOpen(true)
    }

  }

  // Give dislove to a specific replay
  const sendReplayDislove = async(e, idNo)=>{
    if(token && serial){

      try{
        const response = await axios({
          url : `/sendThisCommentReplayDislove/${serial}`,
          method : 'post',
          data : {
            replayid : idNo,
            videoSl : videoSerial,
          }
        })
        if(response.data.message == 'success'){
          
          setEventSuccess(true)
  
        
        }
      }catch(err){
        console.log(err)
      }



    }else{
      setResponseMessage('You need to log in to react in a comment replay of a post ...')
      setOpen(true)
    }

  }


  // generate each comment replay 
  const generateEachCommentReplay = (commentData, index)=>{
    
    if(commentData.replay && commentData.replay.length>0){
      return  commentData.replay.map((each)=>{
        return    <div className='col col-md-12' style={{whiteSpace : 'pre-line', marginBottom:'2rem'}}>
        <div className="card ms-auto me-3" style={{width: responsiveReplyBox, border: '0.12rem solid #c0ff1d'}}>
        
    
        <div className="card-body">
          <h5 className="card-title d-flex flex-row" style={{borderBottom: '0.1rem solid #5e791a'}}>
          <Stack direction="row" spacing={2}>
    
              <Avatar
                  alt="Remy Sharp"
                  src={each.whoGivingImage}
                  sx={{ width: 45, height: 45, border: '0.15rem solid #c0ff1d' }}
              />
              </Stack>&nbsp;&nbsp;<span className='mt-2 smollUsername'>{each.whoGivingUsername}<p style={{fontSize: '0.6rem'}}>Replied At : {generateCommentingTime(each.replayingTime)} </p></span>
          </h5>
          <p className="card-text" style={{whiteSpace: 'pre-line', padding : '1rem', backgroundColor: '#c0ff1d', borderRadius: '0.8rem'}}>{each.replay}</p>
          
        </div>
    
        <div  className="card-body d-flex justify-content-start align-items-center">
        <p><span onClick={(e)=>{sendReplayLove(e, each._id)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><FavoriteIcon/> {genareteLikedAmount(each.replayLove)}</span> <span onClick={(e)=>{sendReplayDislove(e, each._id)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><HeartBrokenIcon fontSize='medium'/> {genareteDisLikedAmount(each.replayDislove)}</span> </p>
        </div>
    
    
    
        </div>
        </div>


      })  
    }
  }

  

  // generating comments 
  const generateAllComments = ()=>{
    if(videoComs.videoComs.length>1){
      return  videoComs.videoComs.map((each,index)=>{
        return    <div style={{display:'flex', flexDirection:'column', minWidth:colWidth, maxWidth:colWidth, justifyContent:'center'}}>

    

        {/*card col loop each reply has one card with col */}
        <div className='col col-md-12' style={{whiteSpace : 'pre-line', marginBottom:'2rem'}}>
        <div className="card" style={{width: '98.5%', border: '0.12rem solid #c0ff1d'}}>
        
        <div className="card-body">
          <h5 className="card-title d-flex flex-row" style={{borderBottom: '0.1rem solid #5e791a'}}>
          <Stack direction="row" spacing={2}>
    
              <Avatar
                  alt="Remy Sharp"
                  src={each.whoGivingImage}
                  sx={{ width: 45, height: 45, border: '0.15rem solid #c0ff1d' }}
              />
              </Stack>&nbsp;&nbsp;<span className='mt-2 smollUsername'>{each.whoGivingUsername}<p style={{fontSize: '0.6rem'}}>Commented At : {generateCommentingTime(each.commentingTime)}</p></span>
          </h5>
          <p className="card-text" style={{whiteSpace: 'pre-line', padding : '1rem', backgroundColor: '#c0ff1d', borderRadius: '0.8rem'}}>{each.comment}</p>
          
        </div>
    
        <div  className="card-body d-flex justify-content-start align-items-center">
        <p><span onClick={(e)=>{sendLoveToComment(e, each._id)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><FavoriteIcon/> {genareteLikedAmount(each.commentLove)}</span> <span onClick={(e)=>{sendDisloveToComment(e, each._id)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><HeartBrokenIcon fontSize='medium'/> {genareteDisLikedAmount(each.commentDislove)}</span> <span onClick={(e)=>{showMeReplyArea(e, `inputindexNo${index}replyarea`)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}>Reply <SendIcon fontSize='medium'/></span> </p>
        </div>
    
    
        {/* hidden input area */}
        <div id={"inputindexNo"+index+"replyarea"}  className="card-body d-none justify-content-center align-items-center">
        
        <input id={"inputindexNo"+index+"replyarea"+"messagebox"} onChange={(e)=>{setCommentReplay(e.target.value)}} type="text" className="form-control bgsearch" placeholder="Send Reply" aria-label="Send Reply Bar" aria-describedby="button-addon2" />
        <button onClick={(e)=>{sendCommentReplay(e, `${each._id}`, `inputindexNo${index}replyareamessagebox`)}} className="btn searchbtn" type="button" id="button-addon2"><SendIcon /></button>
        
        
        </div>
    
    
        </div>
        </div>
    
        {/*card col loop each reply has one card with col */}
        
    
    
        {/*comments reply */}
        {generateEachCommentReplay(each, index)}
        
    
    
        {/*comment replier ends*/}
    
        </div>
    
      })
    }else if(videoComs.videoComs && videoComs.videoComs[0]){
      
      return    <div style={{display:'flex', flexDirection:'column',minWidth:colWidth, maxWidth:colWidth, justifyContent:'center'}}>

    

        {/*card col loop each reply has one card with col */}
        <div className='col col-md-12' style={{whiteSpace : 'pre-line', marginBottom:'2rem'}}>
        <div className="card" style={{width: '98.5%', border: '0.12rem solid #c0ff1d'}}>
        
        <div className="card-body">
          <h5 className="card-title d-flex flex-row" style={{borderBottom: '0.1rem solid #5e791a'}}>
          <Stack direction="row" spacing={2}>
    
              <Avatar
                  alt="Remy Sharp"
                  src={videoComs.videoComs[0].whoGivingImage}
                  sx={{ width: 45, height: 45, border: '0.15rem solid #c0ff1d' }}
              />
              </Stack>&nbsp;&nbsp;<span className='mt-2 smollUsername'>{videoComs.videoComs[0].whoGivingUsername}<p style={{fontSize: '0.6rem'}}>Commented At : {generateCommentingTime(videoComs.videoComs[0].commentingTime)}</p></span>
          </h5>
          <p className="card-text" style={{whiteSpace: 'pre-line', padding : '1rem', backgroundColor: '#c0ff1d', borderRadius: '0.8rem'}}>{videoComs.videoComs[0].comment}</p>
          
        </div>
    
        <div  className="card-body d-flex justify-content-start align-items-center">
        <p><span onClick={(e)=>{sendLoveToComment(e, videoComs.videoComs[0]._id)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><FavoriteIcon/> {genareteLikedAmount(videoComs.videoComs[0].commentLove)}</span> <span onClick={(e)=>{sendDisloveToComment(e, videoComs.videoComs[0]._id)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><HeartBrokenIcon fontSize='medium'/> {genareteDisLikedAmount(videoComs.videoComs[0].commentDislove)}</span> <span onClick={(e)=>{showMeReplyArea(e, `inputindexNo1replyarea`)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}>Reply <SendIcon fontSize='medium'/></span> </p>
        </div>
    
    
        {/* hidden input area */}
        <div id={"inputindexNo1replyarea"}  className="card-body d-none justify-content-center align-items-center">
        
        <input id={"inputindexNo1replyareamessagebox"} onChange={(e)=>{setCommentReplay(e.target.value)}} type="text" className="form-control bgsearch" placeholder="Send Reply" aria-label="Send Reply Bar" aria-describedby="button-addon2" />
        <button onClick={(e)=>{sendCommentReplay(e, `${videoComs.videoComs[0]._id}`, `inputindexNo1replyareamessagebox`)}} className="btn searchbtn" type="button" id="button-addon2"><SendIcon /></button>
        
        
        </div>
    
    
        </div>
        </div>
    
        {/*card col loop each reply has one card with col */}
        
    
    
        {/*comments reply */}
        {generateEachCommentReplay(videoComs.videoComs[0], 1)}
        
    
    
        {/*comment replier ends*/}
    
        </div>
    }else if(!videoComs.videoComs[0]){
      return    <div style={{display:'flex', flexDirection:'column',minWidth:colWidth, maxWidth:colWidth, justifyContent:'center'}}>

    

        {/*card col loop each reply has one card with col */}
        <div className='col col-md-12' style={{whiteSpace : 'pre-line', marginBottom:'2rem'}}>
        <div className="card" style={{width: '98.5%', border: '0.12rem solid #c0ff1d'}}>
        
        <div className="card-body">
          
          <p className="card-text" style={{whiteSpace: 'pre-line', padding : '1rem', backgroundColor: '#c0ff1d', borderRadius: '0.8rem'}}>Kindly Be Considerate While You Comment In Other's Post ... </p>
          
        </div>
    
       
    
    
        {/* hidden input area */}
       
    
    
        </div>
        </div>
    
        {/*card col loop each reply has one card with col */}
        
    
    
        {/*comments reply */}
        
        
    
    
        {/*comment replier ends*/}
    
        </div>
    }
  }

   const showTagBadges = ()=>{ // showing tag at top of video
    if(videoData.tags.includes(',')){
      let splitting = videoData.tags.split(',')
      
      return  splitting.map((each)=>{
        return  <span className="badge rounded-pill bg-success me-1">{each}</span>
      })
    }else{
      return  <span className="badge rounded-pill bg-success me-1">{videoData.tags}</span>
    }

   
   }


  // Effects Here
  useEffect(() => {
    if(window.innerWidth<540){
      setIframemargin('1rem')
    }

    if(window.innerWidth>1000){
      setColWidth('86vw')
    }else{
      setColWidth('78vw')
    }

    if(window.innerWidth<767){
      setResponsiveReply('80%')
    }else{
      setResponsiveReply('90%')
    }


  
    // Initialize tooltips when the component mounts
    window.$('[data-bs-toggle="tooltip"]').tooltip();
    getThisVideoData()

    getThisVideoComms()


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
    setEventSuccess(false)

    getThisVideoData()
    getThisVideoComms()
    
    
  },[videoSerial, eventSuccess])

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
    <iframe id="videoIframe" width="100%" height="100%" style={{marginLeft:iframemargin}} src={videoData.videourl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowTransparency allowFullScreen></iframe>
    </div>

    <div className='sameVideos2'>
    {/* generating col with card in link of another video to go back this page with another video link here */}
    <div className='row row-cols-1 row-cols-md-1'>




    {/* each col each video link of same tye */}
    
    {/* each col each video link of same tye */}

    {generateSameTypeVids()}








    </div>

    </div>




    
    
    <div onClick={(e)=>{giveLoveReact(e, videoSerial)}} className='d-flex justify-content-center align-items-center iconmain1' data-bs-toggle="tooltip" data-bs-placement="right" title={genareteDisLikedAmount(videoData.videolike)}> 
    <FavoriteIcon fontSize='large'/> 
    </div>

    

    <div onClick={(e)=>{giveDisLoveReact(e, videoSerial)}} className='d-flex justify-content-center align-items-center iconmain2' data-bs-toggle="tooltip" data-bs-placement="right" title={genareteLikedAmount(videoData.videodislike)}> 
    <HeartBrokenIcon fontSize='large'/>
    </div>

    <div onClick={(e)=>{giveReport(e, videoSerial)}} className='d-flex justify-content-center align-items-center iconmain3'> 
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
    </Stack> <span className='ms-3'><b>{videoData.videoUploader}</b><br></br><span style={{fontSize:'0.7rem'}}>Uplodaded At : {generateCommentingTime(videoData.videouploadtime)}</span><br></br><span style={{fontSize:'0.7rem'}}>Total Views : {videoData.totalViews}</span></span>
    </p>
    <p style={{whiteSpace: 'pre-line', fontWeight: 'bold'}}>Title : {videoData.videotitle} </p>
    <p style={{whiteSpace: 'pre-line', fontSize: '0.8rem'}}> {videoData.videodescription}</p>
    </div>


    <div className='commentsArea2 d-flex justify-content-center align-items-center flex-column mx-auto'>
      <h5>Comments ...</h5>
      <div id="inputindexNo"  className="card-body d-flex justify-content-center align-items-center" style={{width:'100%'}}>
    
    <input id="comment" onChange={(e)=>{setStringComment(e.target.value)}} type="text" className="form-control bgsearch" placeholder="Send Comment" aria-label="Send Comment Bar" aria-describedby="button-addon2" />
    <button onClick={(e)=>{sendComment(e)}} className="btn searchbtn" type="button" id="button-addon2"><SendIcon /></button>
    
    
    </div>
      
      
    </div>


    <div className='allComments mx-auto' style={{padding: '2rem'}}>

    <div className='row row-cols-1 row-cols-md-1 justify-content-center'>
      


    {generateAllComments()}

    
    






    </div>

    </div>


    </div>
    </div>

    {nowGoBack ? <Navigate to='/' replace /> : null}

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
