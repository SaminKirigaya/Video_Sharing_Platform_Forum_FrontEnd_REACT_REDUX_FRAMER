import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function ProfilePage() {
  const coverImg = useSelector((state)=>state.coverImgData.coverImgPath)
  const playerAvatar = useSelector((state) => state.profImgData.proImgPath)
  const userName = useSelector((state)=>state.usernameData.username)
  return (
    <Fragment>
        <div className='container-fluid pages flex-column'>
        <div className='profilePageHeight'>
            <div className='coverHolder d-flex'>
              <img className='coverImage' src={coverImg} />
            </div>

            <div className='d-flex mx-auto posAvatar'>
              <Stack direction="row" spacing={2}>
        
              <Avatar
                  alt="Remy Sharp"
                  src={playerAvatar}
                  sx={{ width: 75, height: 75, border: '0.15rem solid #c0ff1d' }}
              />
              </Stack>
            </div>

            <div className='mt-5 mb-3'>
              <p className='text-center welcomeTxt'>Welcome Home, <b>{userName}</b></p>
            </div>

            <div className='row row-cols-1 row-cols-md-2'>
              <div className='col'>

              <div class="card mb-3" style={{maxWidth: '540px'}}>
              <div class="row g-0">
                <div class="col-md-4">
                <Stack direction="row" spacing={2}>
        
                <Avatar
                    alt="Remy Sharp"
                    src={playerAvatar}
                    sx={{ width: 55, height: 55, border: '0.15rem solid #c0ff1d' }}
                />
                </Stack>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    
                  </div>
                </div>
              </div>
              </div>
              </div>

              <div className='col'>

              </div>

              <div className='col'>
              
              </div>
              

            </div>



        </div>
        </div>
    </Fragment>
  )
}

export default ProfilePage
