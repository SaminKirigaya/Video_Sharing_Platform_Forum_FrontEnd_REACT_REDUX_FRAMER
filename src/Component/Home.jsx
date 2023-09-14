import React, { Fragment, useEffect, useState } from 'react'

function Home() {

    // Effects Here
    useEffect(() => {
        // Initialize tooltips when the component mounts
        window.$('[data-bs-toggle="tooltip"]').tooltip();
    
        //  to clean up the tooltips when the component unmounts
        return () => {
          window.$('[data-bs-toggle="tooltip"]').tooltip('dispose');
        };
      }, []); // [ ] empty mean it will only run once after first render like component did mount :>
 


    return (
        <Fragment>
            <div className='container-fluid pages'>
                
            </div>
        </Fragment>
    )
}

export default Home
