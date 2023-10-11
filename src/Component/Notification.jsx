import React,{Fragment, useEffect, useState} from 'react'
import axios from 'axios'
import { Navigate, Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import WelcomeMsg from './WelcomeMsg'
import SearchBar from './SearchBar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { notifyFunctions }  from '../Store/Store';
import { motion } from 'framer-motion'
import { callForNotificationApi } from './NotificationApi'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function Notification() {
    // Redirecting back state
    const [nowGoBack, setNowGoBack] = React.useState(false);

    // snackbar open close state
    const [open, setOpen] = React.useState(false);
    const [responseMessage, setResponseMessage] = React.useState(''); // initially any error or success message at snackbar

    const notificationAmount = useSelector((state)=>state.notifyData.notifAmount)
    const token = useSelector((state)=>state.tokenData.token)
    const serial = useSelector((state)=>state.userserialData.serialId)
    const dispatch = useDispatch();
    const [notification, setNotification] = useState([])

    axios.defaults.headers.common['Authorization'] = 'Bearer '+token

    const getAllNotification = async()=>{
        if(serial && token){
            const response = await axios({
                url : `/getNotificationData/${serial}`,
                method : 'post',
                data : {
                    userId : serial
                }
            })

            if(response.data.message == 'success'){
                setNotification(response.data.allNotifications)
            }
        }

    }

    // clearing akll old notifics
    const clearOldNotis = async(e)=>{
        if(serial && token){
            try{
                const response = await axios({
                    url : `/clearNotificationData/${serial}`,
                    method : 'post',
                    data : {
                        userId : serial
                    }
                })

                if(response.data.message == 'success'){
                    setResponseMessage('Succefully Cleared All Old Notifications ...')
                    setOpen(true)
                    dispatch(notifyFunctions.setNewNotif(0))
                    

                    setTimeout(()=>{
                        setNowGoBack(true)
                    }, 1900)
                }

            }catch(err){
                console.log(err)
            }
        }
    }

    

    // generate all notifications from  notification state
    const generateNotifications = ()=>{
        if(notification.length>1){
            return notification.map((each)=>{
                return  <div className='col'>
                <motion.div whileHover={{scale:1.065,backgroundColor:'#f4f6f4'}} transition={{type: 'spring', stiffness: 500}} className="card mb-3 mx-auto" style={{maxWidth: '80%'}}>
                <div className="row g-0">
                  <div className="col-md-2 d-flex align-items-center justify-content-center">
                    <motion.div whileHover={{scale:1.065}} transition={{type: 'spring', stiffness: 1000}} className='d-flex justify-content-center pt-2 mx-auto ps-1'>
                        <Stack direction="row" spacing={2}>
                        <Avatar
                        alt="Remy Sharp"
                        src={each.whoGivingImage}
                        sx={{ width: 60, height: 60 }}
                        />
                        </Stack>
                    </motion.div>
                  </div>
                  <div className="col-md-10">
                    <div className="card-body">
                      <h5 className="card-title headLine">{each.whoGivingUsername}</h5>
                      <p className="card-text normalLine">{each.reason}</p>
                      <motion.p whileHover={{scale:1.05}} transition={{type: 'spring', stiffness: 1000}}><Link to={'/seeServerThisVideo/'+each.videoSerial} className='btn btn-sm btn-primary mx-auto mt-4 headLine'> View It </Link></motion.p>

                    </div>
                  </div>
                </div>
                </motion.div>
                </div>
            })
        }else if(notification[0]){
            return  <div className='col'>
                <motion.div whileHover={{scale:1.065,backgroundColor:'#f4f6f4'}} transition={{type: 'spring', stiffness: 500}} className="card mb-3 mx-auto" style={{maxWidth: '80%'}}>
                <div className="row g-0">
                  <div className="col-md-2 d-flex align-items-center justify-content-center">
                    <motion.div whileHover={{scale:1.065}} transition={{type: 'spring', stiffness: 1000}} className='d-flex justify-content-center pt-2 mx-auto ps-1'>
                        <Stack direction="row" spacing={2}>
                        <Avatar
                        alt="Remy Sharp"
                        src={notification[0].whoGivingImage}
                        sx={{ width: 60, height: 60 }}
                        />
                        </Stack>
                    </motion.div>
                  </div>
                  <div className="col-md-10">
                    <div className="card-body">
                      <h5 className="card-title headLine">{notification[0].whoGivingUsername}</h5>
                      <p className="card-text normalLine">{notification[0].reason}</p>
                      <motion.p whileHover={{scale:1.05}} transition={{type: 'spring', stiffness: 1000}}><Link to={'/seeServerThisVideo/'+notification[0].videoSerial} className='btn btn-sm btn-primary mx-auto mt-4 headLine'> View It </Link></motion.p>
                      
                    </div>
                  </div>
                </div>
                </motion.div>
                </div>
        }
    }


    // handle close open of snackbar here
    const handleClick = () => {
        setOpen(true);
      };
    
    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
    };


    useEffect(()=>{
        const intervalID = setInterval(() => {
            // Your interval logic here
            
                console.log('send api')
                callForNotificationApi(serial, token, dispatch)
      
            
      
            }, 50000);

        if(notificationAmount>0){
            getAllNotification()
        }

        return()=>{
            clearInterval(intervalID)
        }
        
    },[])

    useEffect(()=>{
        if(notificationAmount>0){
            getAllNotification()
        }
        
    },[notificationAmount])


  return (
    <Fragment>
    <div className='container-fluid pages flex-column'>
    <div className='profilePageHeight'>

    <WelcomeMsg/>
    <SearchBar />

    <h5 className='mx-auto text-center mt-4 mb-4 welcomeTxt headLine'>Notifications ...</h5>

    {notificationAmount>0 ? <div className='mx-auto mt-4 mb-2 d-flex justify-content-center align-items-center' style={{minWidth: '95%', maxWidth: '95%'}}>
    {/* if anyone want to search with username */}
    <motion.button whileHover={{scale:1.05}} transition={{type: 'spring', stiffness: 1000}} onClick={(e)=>{clearOldNotis(e)}} type="button" className='btn btn-sm btn-primary mx-auto mt-4 headLine'> Clear All Notifications </motion.button>
    
    </div> : null}
    
    
    

    <div id='usnameBox' className='mx-auto mt-4 mb-2 ps-md-2' style={{minWidth: '95%', maxWidth: '95%'}}>
        
        {notificationAmount==0 ? <div className='d-flex mx-auto mb-4 w-100 justify-content-center'><p className='mx-auto fontcol text-center normalLine'>You have no new notification ... Make sure to view, comment, react with other .</p></div> : <div className='d-flex mx-auto mb-4 w-100 justify-content-center'>
        <div className='row row-cols-1 row-cols-md-1 justify-content-center' style={{ minWidth:'80%'}}>


            {/* each col each notification*/}

            {generateNotifications()}
            
            </div>



        </div> }
    
        
    </div>



    {/* Go back button */}
    <motion.div whileHover={{scale:1.05}} transition={{type: 'spring', stiffness: 1000}} className='mx-auto mt-4 mb-5 d-flex justify-content-center align-items-center' style={{minWidth: '95%', maxWidth: '95%'}}>
        {/* if anyone want to search with username */}
        <Link to='/' className='btn btn-sm btn-primary mx-auto mt-4 headLine'><ArrowBackIcon /> Go Back</Link>
        
        </motion.div>
    
    </div>
    {nowGoBack ? <Navigate to='/' replace /> : null}
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

export default Notification
