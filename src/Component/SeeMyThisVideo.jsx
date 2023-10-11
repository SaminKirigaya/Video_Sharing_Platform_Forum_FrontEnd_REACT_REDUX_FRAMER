import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { Navigate, Link, Form, useParams } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import axios from 'axios';


import SearchBar from './SearchBar';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import SendIcon from '@mui/icons-material/Send';

import {AnimatePresence, motion, useAnimate} from 'framer-motion'
import { callForNotificationApi } from './NotificationApi';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  




export default function SeeMyThisVideo() {
    const [open, setOpen] = React.useState(false); // Snackbar open close state
    const [responseMessage, setResponseMessage] = React.useState(''); // initially any error or success message at snackbar
    const [eventSuccess, setEventSuccess] = useState(false)
    const [videoComs, setVideoComs] = useState({
      videoComs : [],
      comsReply : []
    })
  
    const dispatch = useDispatch()
    const [colWidth, setColWidth] = useState('')

    
  const [showHideComment, setShowHideComment] = useState(false)
  const [commentReplay, setCommentReplay] = useState('')
  const [scope,Animate] = useAnimate()

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
    const [stringComment, setStringComment] = useState('')
    
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
    var amorpm = ''
    const year = newDate.getFullYear()
    const month = (newDate.getMonth()+1).toString().padStart(2,"0")
    const date = newDate.getDate().toString().padStart(2,"0")
  
    var hours = newDate.getHours()
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

        const minutes = newDate.getMinutes().toString().padStart(2,"0")

    return `${date}-${month}-${year}, ${hours}:${minutes} ${amorpm}`
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
        Animate('.againAnime', {opacity: [0,1]}, {duration:1.5})
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
          Animate('.againAnime', {opacity: [0,1]}, {duration:1.5})
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


   // deleting specific comment
  const deleteThisComment = async(e, commentId)=>{
    if(serial && token){
      try{
        const response = await axios({
          url : `/deleteThisComment/${serial}`,
          method: 'post',
          data : {
            commentId : commentId
          }
        })

        if(response.data.message == 'success'){
          setEventSuccess(true)
          Animate('.againAnime', {opacity: [0,1]}, {duration:1.5})
        }
      }catch(err){
        console.log(err)
      }
    }else{
      setResponseMessage('Make sure to login to delete a comment ...')
      setOpen(true)
    }
  }


  // deleting a specific replay
  const deleteThisReplay = async(e, replayId)=>{
    if(serial && token){
      try{
        const response = await axios({
          url : `/deleteThisReplay/${serial}`,
          method: 'post',
          data : {
            replayId : replayId
          }
        })

        if(response.data.message == 'success'){
          setEventSuccess(true)
        }
      }catch(err){
        console.log(err)
      }
    }else{
      setResponseMessage('Make sure to login to delete a comment replay ...')
      setOpen(true)
    }
  }


  // generate each comment replay 
  const generateEachCommentReplay = (commentData, index)=>{
    
    if(commentData.replay && commentData.replay.length>0){
      return  commentData.replay.map((each,index)=>{
        return    <motion.div key={index} whileHover={{scale:1.02}} animate={{opacity:[0,1]}} transition={{type:'spring', stiffness:400}} className='col col-md-12 againAnime' style={{whiteSpace : 'pre-line', marginBottom:'2rem'}}>
        <div className="card ms-auto me-3" style={{width: responsiveReplyBox, border: '0.12rem solid #c0ff1d'}}>
        
    
        <div className="card-body">
          <h5 className="card-title d-flex flex-row" style={{borderBottom: '0.1rem solid #5e791a'}}>
          <Stack direction="row" spacing={2}>
    
              <Avatar
                  alt="Remy Sharp"
                  src={each.whoGivingImage}
                  sx={{ width: 45, height: 45, border: '0.15rem solid #c0ff1d' }}
              />
              </Stack>&nbsp;&nbsp;<span className='mt-2 smollUsername headLine'>{each.whoGivingUsername}<p style={{fontSize: '0.6rem',fontFamily: 'PT Serif'}}>Replied At : {generateCommentingTime(each.replayingTime)} </p></span>
          </h5>
          <p className="card-text" style={{whiteSpace: 'pre-line', padding : '1rem', backgroundColor: '#c0ff1d', borderRadius: '0.8rem',fontFamily: 'PT Serif'}}>{each.replay}</p>
          
        </div>
    
        <div  className="card-body d-flex justify-content-start align-items-center">
        <p><motion.span whileHover={{scale:1.15}} transition={{type:'spring', stiffness:400}} onClick={(e)=>{sendReplayLove(e, each._id)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><FavoriteIcon/> {genareteLikedAmount(each.replayLove)}</motion.span> <motion.span whileHover={{scale:1.15}} transition={{type:'spring', stiffness:400}} onClick={(e)=>{sendReplayDislove(e, each._id)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><HeartBrokenIcon fontSize='medium'/> {genareteDisLikedAmount(each.replayDislove)}</motion.span> <motion.span whileHover={{scale:1.15}} transition={{type:'spring', stiffness:400}} onClick={(e)=>{deleteThisReplay(e, each._id)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}>Delete <DeleteSweepIcon fontSize='medium'/></motion.span></p>
        </div>
    
    
    
        </div>
        </motion.div>


      })  
    }
  }

  

  // generating comments 
  const generateAllComments = ()=>{
    
    if(videoComs.videoComs.length>1){
      
      return  videoComs.videoComs.map((each,index)=>{
        
        return <motion.div key={index} layout style={{display:'flex', flexDirection:'column', minWidth:colWidth, maxWidth:colWidth, justifyContent:'center'}} ref={scope}>

  
        {/*card col loop each reply has one card with col */}
        <motion.div whileHover={{scale:1.02}} animate={{opacity:[0,1]}} transition={{type:'spring', stiffness:400}} className='col col-md-12 againAnime' style={{whiteSpace : 'pre-line', marginBottom:'2rem'}}>
        <div className="card" style={{width: '98.5%', border: '0.12rem solid #c0ff1d'}}>
        
        <div className="card-body">
          <h5 className="card-title d-flex flex-row" style={{borderBottom: '0.1rem solid #5e791a'}}>
          <Stack direction="row" spacing={2}>
    
              <Avatar
                  alt="Remy Sharp"
                  src={each.whoGivingImage}
                  sx={{ width: 45, height: 45, border: '0.15rem solid #c0ff1d' }}
              />
              </Stack>&nbsp;&nbsp;<span className='mt-2 smollUsername headLine'>{each.whoGivingUsername}<p style={{fontSize: '0.6rem', fontFamily: 'PT Serif'}}>Commented At : {generateCommentingTime(each.commentingTime)}</p></span>
          </h5>
          <p className="card-text" style={{whiteSpace: 'pre-line', padding : '1rem', backgroundColor: '#c0ff1d', borderRadius: '0.8rem',fontFamily: 'PT Serif'}}>{each.comment}</p>
          
        </div>
    
        <div  className="card-body d-flex justify-content-start align-items-center">
        <p><motion.span whileHover={{scale:1.15}} transition={{type:'spring', stiffness:400}}  onClick={(e)=>{sendLoveToComment(e, each._id)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><FavoriteIcon/> {genareteLikedAmount(each.commentLove)}</motion.span> <motion.span whileHover={{scale:1.15}} transition={{type:'spring', stiffness:400}} onClick={(e)=>{sendDisloveToComment(e, each._id)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><HeartBrokenIcon fontSize='medium'/> {genareteDisLikedAmount(each.commentDislove)}</motion.span> <motion.span whileHover={{scale:1.15}} transition={{type:'spring', stiffness:400}} onClick={(e)=>{showMeReplyArea(e, `inputindexNo${index}replyarea`)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}>Reply <SendIcon fontSize='medium'/></motion.span> <motion.span whileHover={{scale:1.15}} transition={{type:'spring', stiffness:400}} onClick={(e)=>{deleteThisComment(e, each._id)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}>Delete <DeleteSweepIcon fontSize='medium'/></motion.span> </p>
        </div>
    
    
        {/* hidden input area */}
        <motion.div initial={{y:[-10]}} id={"inputindexNo"+index+"replyarea"}  className="card-body d-none justify-content-center align-items-center againAnime">
        
        <motion.input id={"inputindexNo"+index+"replyarea"+"messagebox"} onChange={(e)=>{setCommentReplay(e.target.value)}} type="text" className="form-control bgsearch" placeholder="Send Reply" aria-label="Send Reply Bar" aria-describedby="button-addon2" />
        <button onClick={(e)=>{sendCommentReplay(e, `${each._id}`, `inputindexNo${index}replyareamessagebox`)}} className="btn searchbtn" type="button" id="button-addon2"><SendIcon /></button>
        
        
        </motion.div>
    
    
        </div>
        </motion.div>
    
        {/*card col loop each reply has one card with col */}
        
    
    
        {/*comments reply */}
        {generateEachCommentReplay(each, index)}
        
    
    
        {/*comment replier ends*/}
    
        </motion.div>
    
      })
      
      
    }else if(videoComs.videoComs && videoComs.videoComs[0]){
      
      return    <motion.div layout style={{display:'flex', flexDirection:'column',minWidth:colWidth, maxWidth:colWidth, justifyContent:'center'}} ref={scope}>

    

        {/*card col loop each reply has one card with col */}
        <motion.div whileHover={{scale:1.02}} animate={{opacity:[0,1]}} transition={{type:'spring', stiffness:400}} className='col col-md-12 againAnime' style={{whiteSpace : 'pre-line', marginBottom:'2rem'}}>
        <div className="card" style={{width: '98.5%', border: '0.12rem solid #c0ff1d'}}>
        
        <div className="card-body">
          <h5 className="card-title d-flex flex-row" style={{borderBottom: '0.1rem solid #5e791a'}}>
          <Stack direction="row" spacing={2}>
    
              <Avatar
                  alt="Remy Sharp"
                  src={videoComs.videoComs[0].whoGivingImage}
                  sx={{ width: 45, height: 45, border: '0.15rem solid #c0ff1d' }}
              />
              </Stack>&nbsp;&nbsp;<span className='mt-2 smollUsername headLine'>{videoComs.videoComs[0].whoGivingUsername}<p style={{fontSize: '0.6rem',fontFamily: 'PT Serif'}}>Commented At : {generateCommentingTime(videoComs.videoComs[0].commentingTime)}</p></span>
          </h5>
          <p className="card-text" style={{whiteSpace: 'pre-line', padding : '1rem', backgroundColor: '#c0ff1d', borderRadius: '0.8rem', fontFamily: 'PT Serif'}}>{videoComs.videoComs[0].comment}</p>
          
        </div>
    
        <div  className="card-body d-flex justify-content-start align-items-center">
        <p><motion.span whileHover={{scale:1.15}} transition={{type:'spring', stiffness:400}} onClick={(e)=>{sendLoveToComment(e, videoComs.videoComs[0]._id)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><FavoriteIcon/> {genareteLikedAmount(videoComs.videoComs[0].commentLove)}</motion.span> <motion.span whileHover={{scale:1.15}} transition={{type:'spring', stiffness:400}} onClick={(e)=>{sendDisloveToComment(e, videoComs.videoComs[0]._id)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}><HeartBrokenIcon fontSize='medium'/> {genareteDisLikedAmount(videoComs.videoComs[0].commentDislove)}</motion.span> <motion.span whileHover={{scale:1.15}} transition={{type:'spring', stiffness:400}} onClick={(e)=>{showMeReplyArea(e, `inputindexNo1replyarea`)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}>Reply <SendIcon fontSize='medium'/></motion.span> <motion.span whileHover={{scale:1.15}} transition={{type:'spring', stiffness:400}} onClick={(e)=>{deleteThisComment(e, videoComs.videoComs[0]._id)}} className="badge badge-pill badge-success mb-2" style={{color:'green',backgroundColor:'#c0ff1d', cursor:'pointer'}}>Delete <DeleteSweepIcon fontSize='medium'/></motion.span></p>
        </div>
    
    
        {/* hidden input area */}
        <motion.div initial={{y:[-10]}} id={"inputindexNo1replyarea"}  className="card-body d-none justify-content-center align-items-center againAnime">
        
        <input id={"inputindexNo1replyareamessagebox"} onChange={(e)=>{setCommentReplay(e.target.value)}} type="text" className="form-control bgsearch" placeholder="Send Reply" aria-label="Send Reply Bar" aria-describedby="button-addon2" />
        <button onClick={(e)=>{sendCommentReplay(e, `${videoComs.videoComs[0]._id}`, `inputindexNo1replyareamessagebox`)}} className="btn searchbtn" type="button" id="button-addon2"><SendIcon /></button>
        
        
        </motion.div>
    
    
        </div>
        </motion.div>
    
        {/*card col loop each reply has one card with col */}
        
    
    
        {/*comments reply */}
        {generateEachCommentReplay(videoComs.videoComs[0], 1)}
        
    
    
        {/*comment replier ends*/}
    
        </motion.div>

    }else if(!videoComs.videoComs[0]){
      return    <div style={{display:'flex', flexDirection:'column',minWidth:colWidth, maxWidth:colWidth, justifyContent:'center'}}>

    

        {/*card col loop each reply has one card with col */}
        <div className='col col-md-12' style={{whiteSpace : 'pre-line', marginBottom:'2rem'}}>
        <div className="card" style={{width: '98.5%', border: '0.12rem solid #c0ff1d'}}>
        
        <div className="card-body">
          
          <p className="card-text" style={{whiteSpace: 'pre-line', padding : '1rem', backgroundColor: '#c0ff1d', borderRadius: '0.8rem', fontFamily: 'PT Serif'}}>Kindly Be Considerate While You Comment In Other's Post ... </p>
          
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


    
    // Effects Here
    useEffect(() => {

      const intervalID = setInterval(() => {
        // Your interval logic here
        
            console.log('send api')
            callForNotificationApi(serial, token, dispatch)
  
        
  
        }, 50000);

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
        getThisVideoComms()

        //  to clean up the tooltips when the component unmounts
        return () => {
          window.$('[data-bs-toggle="tooltip"]').tooltip('dispose');
          clearInterval(intervalID)
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
    
    <motion.div layout  className='container-fluid pages flex-column'>
    <div className='profilePageHeight'>
   

    <SearchBar /> 
    
    <div className='videoBox mx-auto mt-3'>
    <motion.iframe animate={{x:[-1000,0]}} transition={{type:"spring", stiffness:550}} width="100%" height="100%" src={videoData.videourl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></motion.iframe>
    
    <motion.div whileHover={{scale:1.1}} transition={{type: 'spring', stiffness: 1000}} className='d-flex justify-content-center align-items-center icons' data-bs-toggle="modal" data-bs-target="#staticBackdrop"> 
    <SettingsIcon fontSize='large'/>
    </motion.div>

    <motion.div whileHover={{scale:1.1}} transition={{type: 'spring', stiffness: 1000}} onClick={(e)=>{deleteThisVideo(e, videoSerial)}} className='d-flex justify-content-center align-items-center icons2'> 
    <DeleteSweepIcon fontSize='large'/>
    </motion.div>
    
    <motion.div whileHover={{scale:1.1}} transition={{type: 'spring', stiffness: 1000}} onClick={(e)=>{giveLoveReact(e, videoSerial)}} className='d-flex justify-content-center align-items-center icons3' data-bs-toggle="tooltip" data-bs-placement="right" title={genareteLikedAmount(videoData.videolike)}> 
    <FavoriteIcon fontSize='large'/> 
    </motion.div>

    

    <motion.div whileHover={{scale:1.1}} transition={{type: 'spring', stiffness: 1000}} onClick={(e)=>{giveDisLoveReact(e, videoSerial)}} className='d-flex justify-content-center align-items-center icons4' data-bs-toggle="tooltip" data-bs-placement="right" title= {genareteDisLikedAmount(videoData.videodislike)}> 
    <HeartBrokenIcon fontSize='large'/>
    </motion.div>

    

    </div>
    
    <hr></hr>

    <div style={{padding: paddingRes, borderBottom: '0.1rem solid #c0ff1d'}}>


      
    <p className='d-flex flex-row' style={{marginTop: '2rem'}}>
    <motion.div whileHover={{scale:1.1}} transition={{type: 'spring', stiffness: 1000}}><Stack direction="row" spacing={2}>
                    
    <Avatar
        alt="Remy Sharp"
        src={playerAvatar}
        sx={{ width: 56, height: 56 }}
    />
    </Stack></motion.div> <span className='ms-3 headLine'>{username}<br></br><span style={{fontSize:'0.7rem',fontFamily: 'PT Serif'}}>Uplodaded At : {generatePlainDate(videoData.videouploadtime)}</span><br></br><span style={{fontSize:'0.7rem',fontFamily: 'PT Serif'}}>Total Views : {videoData.totalViews}</span></span>
    </p>

    
    <div className='row row-cols-1 row-cols-md-1' style={{marginTop: resMargin, marginLeft: '0.5rem'}}>
      <div className='col col-md-12'>
        <h5 className='headLine'>Title : &nbsp;{videoData.videotitle}</h5>
      </div>
    </div>

    <div className='row row-cols-1 row-cols-md-1' style={{marginTop: '0.5rem', marginLeft: '0.5rem', whiteSpace:'pre-line'}}>
      <div className='col col-md-12' style={{whiteSpace : 'pre-line'}}>
        <p style={{fontSize: '0.8rem',fontFamily: 'PT Serif'}}>{videoData.videodescription}</p>
      </div>
    </div>

    </div>

    <div style={{padding: '0.3rem'}}>

    <div className='row row-cols-1 row-cols-md-1' style={{marginTop: resMargin, marginLeft: '0.5rem'}}>
    <h5 className='mx-auto text-center headLine' style={{marginBottom: '2rem', color:'#42590a'}}>All Comments </h5>
    
    <div id="inputindexNo"  className="card-body d-flex justify-content-center align-items-center" style={{width:'100%'}}>
    
    <input id="comment" onChange={(e)=>{setStringComment(e.target.value)}} type="text" className="form-control bgsearch" placeholder="Send Comment" aria-label="Send Comment Bar" aria-describedby="button-addon2" />
    <button onClick={(e)=>{sendComment(e)}} className="btn searchbtn" type="button" id="button-addon2"><SendIcon /></button>
    
    
    </div>



    
    <motion.div className='allComments mx-auto' style={{padding: '2rem'}} ref={scope}>

    
    {generateAllComments()}

    {/*card col loop each reply has one card with col */}
    
    {/*card col loop each reply has one card with col */}
    
    {/*comments reply */}
    
    {/*comment replier ends*/}

    </motion.div>
  
    
    

    </div>
    
    </div>

    
    </div>
    </motion.div>






    {/* Modal */}
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content bgbordermodal">
        <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Update Content ...</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

        

        <div className="col col-md-12 mx-auto">
        
        
        <div className='mt-0'> 
        
        <iframe style={{width: '245px', height: '190px'}} src={videoData.videourl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>
        
        </div>



        </div>




        <div className="col col-md-12">
        <label for="title"><b>Title :</b></label>
        <motion.input whileHover={{scale:1.04}} transition={{type: 'spring', stiffness: 1000}} onChange={(e)=>{setNewTitle(e)}} value={videoData.videotitle} id="title" type="text" className="form-control mt-1 mb-2"  placeholder="Set video title ..." autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide a valid title that suit your video ..."/>
        </div>

        <div className="col col-md-12">
        <label for="description"><b>Description :</b></label>
        <motion.textarea whileHover={{scale:1.04}} transition={{type: 'spring', stiffness: 1000}} onChange={(e)=>{setNewDesc(e)}} value={videoData.videodescription} id="description" type="text" className="form-control mt-1 mb-2 videoaddtextarea"  placeholder="Set video discription ..." autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide description that suits your video ... in 200 words."></motion.textarea>
        </div>
        



        <div className="col col-md-12 mt-1">
        <label for="tags"><b>Tags :</b></label>
        <motion.input whileHover={{scale:1.04}} transition={{type: 'spring', stiffness: 1000}} onChange={(e)=>(setCurrentlyInsertedTag(e.target.value))} id="tags" type="text" className="form-control mt-2 mb-2"  placeholder="Set video search tags ..." autoComplete='none' data-bs-toggle="tooltip" data-bs-placement="right" title="Please provide video search tags here in one or two word, after each tag enter click add button kindly ..."/>
        <motion.button whileHover={{scale:1.04}} transition={{type: 'spring', stiffness: 1000}} onClick={(e)=>addNewTag(e)} type="button" className="btn btn-sm btn-primary mb-1">Add</motion.button>
        </div>
        

        <div className="col col-md-12 mt-1">
          {/* show which tag added here*/}
          {videoData.tags ? showAllTags() : null}
        </div>

        
        

        </div>
        <div className="modal-footer">
            <motion.button whileHover={{scale:1.04}} transition={{type: 'spring', stiffness: 1000}} type="button" className="btn btn-sm btn-danger" data-bs-dismiss="modal">Close</motion.button>
            <motion.button whileHover={{scale:1.04}} transition={{type: 'spring', stiffness: 1000}} onClick={(e)=>{sendNewInfo(e, videoSerial)}} type="button" className="btn btn-sm btn-primary">Update Video ...</motion.button>
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
