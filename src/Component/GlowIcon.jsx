import React, { Fragment,useEffect, useState } from 'react'
import axios from 'axios'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {motion, useAnimate} from 'framer-motion'

import  {Link} from 'react-router-dom' 


function GlowIcon() {
  const [firstScope, AnimeFirst] = useAnimate()
  const [secondScope, AnimeSecond] = useAnimate()
  const [bigOrSmall, setSize] = useState('')

  
  useEffect(()=>{
    if(window.innerWidth>750){
      setSize('large')
    }else{
      setSize('small')
    }

    document.getElementById('mainLink').addEventListener('mouseover',()=>{
      AnimeFirst('.againAnimateFirst',{scale:[1.1,1]},{type:'spring',stiffness:600})
      AnimeSecond('.againAnimateSecond',{scale:[1.1,1]},{type:'spring',stiffness:600})
    })

  },[])

  return (
    <Fragment>
  
    <motion.div ref={firstScope}>
    <Link to='/termsandcondition'>
    <motion.div id='mainLink' style={{color:'#198754'}} animate={{rotate:[0,380,0]}} transition={{duration:4, repeat:Infinity, repeatDelay:2, ease:'linear'}} className='insideRound d-flex align-items-center againAnimateFirst'>
      <div className='mx-auto'><QuestionMarkIcon  fontSize={bigOrSmall} />  </div>
    </motion.div>
    </Link>
    </motion.div>

    <motion.div ref={secondScope}>
    <motion.div className='onmostTop againAnimateSecond'>
    </motion.div>
    </motion.div>

    </Fragment>
  )
}

export default GlowIcon
