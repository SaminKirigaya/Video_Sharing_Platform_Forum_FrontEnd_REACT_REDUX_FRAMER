import React, { Fragment, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

export default function SearchBar() {
  const [searchText, setSearchText] = useState('')
  useEffect(()=>{
    if(searchText){
      document.getElementById('button-addon2').classList.remove('disabled')
    }else{
      document.getElementById('button-addon2').classList.add('disabled')
    }
  },[searchText])
  return (
    <Fragment>
    <div className='d-flex totalbox row row-cols-1 row-cols-md-12 mx-auto'>
    <div class="col col-md-12 input-group mb-3 searchtotal">
    <input onChange={(e)=>{setSearchText(e.target.value)}} type="text" class="form-control bgsearch" placeholder="Search ..." aria-label="Search Bar" aria-describedby="button-addon2" />
    <Link to={'/searchResult/'+searchText} class="btn searchbtn disabled" type="button" id="button-addon2"><SearchIcon /></Link>
    </div>
    </div>
    </Fragment>
  )
}
