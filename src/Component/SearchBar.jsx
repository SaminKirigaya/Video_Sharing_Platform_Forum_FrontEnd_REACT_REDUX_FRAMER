import React, { Fragment } from 'react'
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  return (
    <Fragment>
    <div className='d-flex totalbox row row-cols-1 row-cols-md-12'>
    <div class="col col-md-12 input-group mb-3 searchtotal">
    <input type="text" class="form-control bgsearch" placeholder="Search ..." aria-label="Search Bar" aria-describedby="button-addon2" />
    <button class="btn searchbtn" type="button" id="button-addon2"><SearchIcon /></button>
    </div>
    </div>
    </Fragment>
  )
}
