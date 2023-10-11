import React, { Fragment, useEffect, useState } from 'react'
import WelcomeMsg from './WelcomeMsg';
import axios from 'axios'
import { Link, Navigate, useParams } from 'react-router-dom'
import SearchBar from './SearchBar';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {motion, useAnimate, AnimatePresence} from 'framer-motion'


function Category() {
    const [usname, setUsname] = useState(false)
    const [tagbox, setTagbox] = useState(false)
    const [searchText, setSearchText] = useState('')

    const [scope, Animate] = useAnimate()
    const [scope2, Animate2] = useAnimate()

    const SelectUsername = (e)=>{
        if(usname){
            setUsname(false)
            
        }else if(!usname){
            setUsname(true)
            
        }
    }

    const SelectTagbox = (e)=>{
        if(tagbox){
            setTagbox(false)
            
        }else if(!tagbox){
            setTagbox(true)
            
        }
    }


    useEffect(()=>{
        if(usname){
            
            document.getElementById('usnameinputbox').classList.remove('d-none')
            Animate('.againAnime',{opacity:[0,1], display:'block', y:[-30,0]},{duration:1.3,type:'spring',stiffness:400})
            
        }else{
            Animate('.againAnime',{opacity:[1,0], y:[0,-30]},{duration:1.3,type:'spring',stiffness:400})
            setTimeout(()=>{
                document.getElementById('usnameinputbox').classList.add('d-none')
            },100)
            
        }
    },[usname])

    useEffect(()=>{
        if(tagbox){
           
            document.getElementById('tagLinkBox').classList.remove('d-none')
            Animate2('.secondAnime',{opacity:[0,1], display:'block', y:[-30,0]},{duration:1.3,type:'spring',stiffness:400})

        }else{
            Animate2('.secondAnime',{opacity:[1,0], y:[0,-30]},{duration:1.3,type:'spring',stiffness:400})
            setTimeout(()=>{
                document.getElementById('tagLinkBox').classList.add('d-none')
            },100)
        }
    },[tagbox])

  return (
    <Fragment>
    <div className='container-fluid pages flex-column'>
    <div className='profilePageHeight'>

        <SearchBar />

        <h5 className='mx-auto text-center mt-4 mb-4 welcomeTxt headLine'>Select Categories ...</h5>

        <AnimatePresence>
        <motion.div id='usnameBox' className='mx-auto mt-4 mb-2 ps-md-2' style={{minWidth: '95%', maxWidth: '95%'}} ref={scope}>
        {/* if anyone want to search with username */}
        <span className="badge rounded-pill bg-success me-1 normalLine"> &nbsp;<input checked={usname} onChange={(e)=>{SelectUsername(e)}}  type="checkbox" value="" id="flexCheckIndeterminate"/> &nbsp;Select By Username ?</span>
        
        <div id="usnameinputbox" className='mt-3 d-none againAnime'>
            <div className='row row-cols-1 row-cols-md-6'>
            <div className='col col-md-6'>
            <input onChange={(e)=>{setSearchText(e.target.value)}} type="text" class="form-control bgsearch" placeholder="Search By Username ..." aria-label="Search Bar" aria-describedby="button-addon2" />
            <Link to={'/searchResultUsername/'+searchText} class="btn searchbtn mt-2" type="button" id="button-addon2"><SearchIcon /></Link>
            </div>
            
            </div>
            
        </div>

        </motion.div>
        </AnimatePresence>


        <AnimatePresence>
        <motion.div id='tagBox' className='mx-auto mt-4 mb-2 ps-md-2' style={{minWidth: '95%', maxWidth: '95%'}} ref={scope2}>
        {/* if anyone want to search with username */}
        <span className="badge rounded-pill bg-success me-1 normalLine"> &nbsp;<input checked={tagbox} onChange={(e)=>{SelectTagbox(e)}} type="checkbox" value="anime" id="flexCheckIndeterminate"/> &nbsp;See All Categories ?</span>
        
        <div id="tagLinkBox" className='mt-3 secondAnime normalLine'>
        <Link to={'/searchResultTagType/'+'anime'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Anime <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'cartoon'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Cartoon <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'movie'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Movie <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'adult'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Adult <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'under 18'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Under 18 <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'programming'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Programming <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'jobs'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Jobs <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'politics'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Politics <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'global warming'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Global Warming <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'movie clips'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Movie Clips <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'music videos'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Music Videos <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'game cutscenes'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Game Cutscenes <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'game play'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Game Play <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'sport'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Sport <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'football'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Football <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'cricket'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Cricket <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'baseball'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Baseball <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'soccer'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Soccer <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'news'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> News <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'prank videos'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Prank Videos <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'funny videos'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Funny Videos <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'comedy'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Comedy <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'nasa'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Nasa <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'spacex'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> SpaceX <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'10 miutes craft'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> 10 Minutes Craft <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'educational'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Educational <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'tutorial'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Tutorials <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'cooking'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Cooking <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'food blog'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Food Blog <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'travel'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Travel <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'tourist spot'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Tourist Spots <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'animal'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Animals <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'sea creatures'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Sea Creatures <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'snakes'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Snakes <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'birds'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Birds <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'history'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> History <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'mythology'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Mythology <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'relegious'} className="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Relegious <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        </div>

        </motion.div>

        </AnimatePresence>

        <motion.div whileHover={{scale:[1.1,1]}} transition={{type:'spring',stiffness:400}} className='mx-auto mt-4 d-flex justify-content-center align-items-center' style={{minWidth: '95%', maxWidth: '95%'}}>
        {/* if anyone want to search with username */}
        <Link to='/' className='btn btn-sm btn-primary mx-auto mt-4 headLine'><ArrowBackIcon /> Go Back</Link>
        
        </motion.div>

    </div>
    </div>
    </Fragment>
  )
}

export default Category
