import React, { Fragment } from 'react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { useSelector } from 'react-redux';


function WelcomeMsg() {
    const coverImg = useSelector((state)=>state.coverImgData.coverImgPath)
  const playerAvatar = useSelector((state) => state.profImgData.proImgPath)
  const userName = useSelector((state)=>state.usernameData.username)

  return (
    <Fragment>

    <div className='coverHolder d-flex justify-content-center'>
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

    <div className='mt-3 mb-3'>
        <p className='text-center welcomeTxt'>Welcome Home, <b>{userName}</b></p>
    </div>

    </Fragment>
  )
}

export default WelcomeMsg
