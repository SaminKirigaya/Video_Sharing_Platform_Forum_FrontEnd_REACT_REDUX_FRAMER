import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Navigate, useParams } from 'react-router-dom'
import SearchBar from './SearchBar';
import { useSelector, useDispatch } from 'react-redux'
import Pagination from 'react-js-pagination';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { motion, useAnimate} from 'framer-motion'

import WelcomeMsg from './WelcomeMsg';
import { callForNotificationApi } from './NotificationApi';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


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



function LikedVideos() {
    
    const [open, setOpen] = React.useState(false); // Snackbar open close state
    const [responseMessage, setResponseMessage] = React.useState(''); // initially any error or success message at snackbar
    const [oldVideos, setOldVideos] = useState([]) //old uploaded vids from rest api
    const [thewidth, setWidth] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20; // Number of items to display per page

    const token = useSelector((state)=>state.tokenData.token)
    const serial = useSelector((state)=>state.userserialData.serialId)

    const dispatch = useDispatch()
    const [scope, Animate] = useAnimate()
    
    axios.defaults.headers.common['Authorization'] = 'Bearer '+token // axios auth set
    
    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2
        }
      }
    }
    
    const item = {
      hidden: { opacity: 0 },
      show: { opacity: 1 }
    }
    

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



    // Rest api to call for all old uploaded videos

    const getOldVideosData = async(e)=>{
        if(serial && token){
            try{
                const response = await axios({
                    url : `/likedVideos/${serial}`,
                    method : 'post',
                    data : {
                        userId : serial
                    }
                })
                if(response.data.message == 'success'){
                    setOldVideos(response.data.oldVideos)
                }
                }catch(err){
                console.log(err)
                }
        }else{
            setResponseMessage('Please log in first to see your liked videos ...')
            setOpen(true)
        }
      
    }

    // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    Animate('.againAnime', {opacity: [0,1]}, {duration:1.3})
  };

    //upload this video serial to my later watch list
    const addThisToWatchlist = async(e, serialVideo)=>{
      if(serial && token){
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
      }else{
        setResponseMessage('Seems like you are not even logged in yet, please log in to add this video to your watchlist.')
        setOpen(true)
      }
      
    }



    // show all old videos in card format
    const showAllOldVideosInCard = ()=>{
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const currentData = oldVideos.slice(startIndex, endIndex);
      

      return currentData.map((each, index)=>{
        return (<motion.div key={index} variants={item} transition={{duration: 1.3}} className='col d-flex justify-content-center mb-5 againAnime' style={{width: thewidth}}> 
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

        <Link to={"/seeServerThisVideo/"+each._id}>
        <motion.div whileHover={{scale:1.1}} transition={{type: 'spring', stiffness: 1000}} className='loveemo4 d-flex justify-content-center align-items-center'>
        <PlayArrowIcon fontSize='large'/>
        </motion.div>
        </Link>

        <div className="card-body" style={{backgroundColor: '#c0ff1d'}}>
          <h5 className="card-title d-flex flex-row" style={{borderBottom: '0.1rem solid #5e791a'}}><Stack direction="row" spacing={2}>

          <Avatar
              alt="Remy Sharp"
              src={each.playerAvatar}
              sx={{ width: 45, height: 45, border: '0.15rem solid #c0ff1d' }}
          />
          </Stack>&nbsp;&nbsp;<span className='mt-2 smollUsername headLine'>{each.username}<p style={{fontSize: '0.6rem',fontFamily: 'PT Serif'}}>Uploaded At : {generatePlainDate(each.uploadingDate)}</p></span></h5>
          
          <p className="card-text smollTitle normalLine">{makeItSmoll(each.title)}</p>
          
        </div>
        </motion.div>
        </motion.div>)
      })
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

      const intervalID = setInterval(() => {
        // Your interval logic here
        
            console.log('send api')
            callForNotificationApi(serial, token, dispatch)
  
        
  
        }, 50000);

      if(window.innerWidth>710 && window.innerWidth<800){
        setWidth('13rem')
      }else if(window.innerWidth>810 && window.innerWidth<900){
        setWidth('14rem')
      }else if(window.innerWidth>900 && window.innerWidth<1000){
        setWidth('15.6rem')
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

        <WelcomeMsg/>
        <SearchBar />

        <h5 className='mx-auto text-center mt-4 mb-4 welcomeTxt headLine'>Liked Videos ...</h5>

        <motion.div ref={scope} variants={container} initial="hidden" animate="show" className='row row-cols-1 row-cols-md-4 mb-5 d-flex justify-content-center p-3'>

          
          {oldVideos ? showAllOldVideosInCard() : <div className='d-flex mx-auto w-100 justify-content-center'><p className='mx-auto fontcol normalLine'>It Seems You Have Not Reacted Love In Any Videos So Far ... 😖</p></div>}
      
          {oldVideos.length<1 ? <div className='d-flex mx-auto w-100 justify-content-center'><p className='mx-auto fontcol normalLine'>Some Error Occured Or It Seems You Have Not Reacted Love In Any Videos So Far ... 😖</p></div>:null}



        </motion.div>


        <Pagination
        activePage={currentPage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={oldVideos.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="mb-5 page-item"
        linkClass="page-link mx-auto"
        innerClass="pagination mx-auto text-center"

        
        />


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

export default LikedVideos
