import React, { Fragment, useEffect, useState } from 'react'
import WelcomeMsg from './WelcomeMsg';
import axios from 'axios'
import { Link, Navigate, useParams } from 'react-router-dom'
import SearchBar from './SearchBar';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function Category() {
    const [usname, setUsname] = useState(false)
    const [tagbox, setTagbox] = useState(false)
    const [searchText, setSearchText] = useState('')
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
            document.getElementById('tagBox').classList.add('d-none')
            document.getElementById('usnameinputbox').classList.remove('d-none')
            
        }else{
            document.getElementById('tagBox').classList.remove('d-none')
            document.getElementById('usnameinputbox').classList.add('d-none')
        }
    },[usname])

    useEffect(()=>{
        if(tagbox){
            document.getElementById('usnameBox').classList.add('d-none')
            document.getElementById('tagLinkBox').classList.remove('d-none')
        }else{
            document.getElementById('usnameBox').classList.remove('d-none')
            document.getElementById('tagLinkBox').classList.add('d-none')
        }
    },[tagbox])

  return (
    <Fragment>
    <div className='container-fluid pages flex-column'>
    <div className='profilePageHeight'>

        <SearchBar />

        <h5 className='mx-auto text-center mt-4 mb-4 welcomeTxt'>Select Categories ...</h5>

        <div id='usnameBox' className='mx-auto mt-4 mb-2 ps-md-2' style={{minWidth: '95%', maxWidth: '95%'}}>
        {/* if anyone want to search with username */}
        <span class="badge rounded-pill bg-success me-1"> &nbsp;<input checked={usname} onChange={(e)=>{SelectUsername(e)}}  type="checkbox" value="" id="flexCheckIndeterminate"/> &nbsp;Select By Username ?</span>
        
        <div id="usnameinputbox" className='mt-3 d-none'>
            <div className='row row-cols-1 row-cols-md-6'>
            <div className='col col-md-6'>
            <input onChange={(e)=>{setSearchText(e.target.value)}} type="text" class="form-control bgsearch" placeholder="Search By Username ..." aria-label="Search Bar" aria-describedby="button-addon2" />
            <Link to={'/searchResultUsername/'+searchText} class="btn searchbtn mt-2" type="button" id="button-addon2"><SearchIcon /></Link>
            </div>
            
            </div>
            
        </div>

        </div>


        <div id='tagBox' className='mx-auto mt-4 mb-2 ps-md-2' style={{minWidth: '95%', maxWidth: '95%'}}>
        {/* if anyone want to search with username */}
        <span class="badge rounded-pill bg-success me-1"> &nbsp;<input checked={tagbox} onChange={(e)=>{SelectTagbox(e)}} type="checkbox" value="anime" id="flexCheckIndeterminate"/> &nbsp;See All Categories ?</span>
        
        <div id="tagLinkBox" className='mt-3'>
        <Link to={'/searchResultTagType/'+'anime'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Anime <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'cartoon'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Cartoon <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'movie'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Movie <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'adult'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Adult <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'under 18'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Under 18 <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'programming'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Programming <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'jobs'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Jobs <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'politics'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Politics <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'global warming'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Global Warming <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'movie clips'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Movie Clips <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'music videos'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Music Videos <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'game cutscenes'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Game Cutscenes <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'game play'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Game Play <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'sport'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Sport <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'football'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Football <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'cricket'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Cricket <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'baseball'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Baseball <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'soccer'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Soccer <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'news'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> News <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'prank videos'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Prank Videos <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'funny videos'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Funny Videos <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'comedy'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Comedy <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'nasa'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Nasa <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'spacex'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> SpaceX <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'10 miutes craft'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> 10 Minutes Craft <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'educational'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Educational <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'tutorial'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Tutorials <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'cooking'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Cooking <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'food blog'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Food Blog <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'travel'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Travel <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'tourist spot'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Tourist Spots <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'animal'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Animals <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'sea creatures'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Sea Creatures <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'snakes'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Snakes <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'birds'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Birds <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'history'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> History <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'mythology'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Mythology <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        <Link to={'/searchResultTagType/'+'relegious'} class="badge rounded-pill bg-success me-1 hoverdes mb-2" type="button" id="button-addon2"> Relegious <KeyboardDoubleArrowRightIcon fontSize='small'/></Link>
        </div>

        </div>


        <div className='mx-auto mt-4 d-flex justify-content-center align-items-center' style={{minWidth: '95%', maxWidth: '95%'}}>
        {/* if anyone want to search with username */}
        <Link to='/' className='btn btn-sm btn-primary mx-auto mt-4'><ArrowBackIcon /> Go Back</Link>
        
        </div>

    </div>
    </div>
    </Fragment>
  )
}

export default Category
