import React,{Fragment, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import {motion} from 'framer-motion'

function TermsCondition() {
    const [padValue, setPadValue] = useState('')

    useEffect(()=>{
        if(window.innerWidth>500){
            setPadValue('4rem')
        }else{
            setPadValue('1.5rem')
        }
    },[])


  return (
    <Fragment>

    <div className='container-fluid pages flex-column'>
    <div className='profilePageHeight'>
    <motion.div animate={{opacity:[0,1]}} transition={{duration:1.4}} className='d-flex mx-auto w-100 justify-content-center mt-5'><p className='mx-auto fontcol headLine text-center' style={{fontSize:'1.5rem'}}>Terms & Conditions</p></motion.div>
    <div className='d-flex mx-auto w-100 justify-content-center mt-2'><p className='mx-auto fontcol normalLine text-center'>&copy; copyright law reserved 2023 by Samin Arnob</p></div>
    <motion.div animate={{x:[-1000,0]}} transition={{type:'spring', stiffness:300}} className='d-flex mx-auto w-100 justify-content-center mt-1'><p className='mx-auto fontcol normalLine' style={{paddingLeft:padValue, paddingRight:padValue, textAlign:'justify'}}>These Terms and Conditions ("Terms") govern your use of the video sharing forum site ("videoHub") provided by [Samin Arnob]. By using this Site, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use the Site.
    <br></br>
    1. <span className='headLine'>Data Security:</span> &nbsp;
    
    All user data is stored using industry-standard encryption and hashing methods to enhance security and protect against unauthorized access. However, while we implement robust security measures, we cannot guarantee absolute security. You are responsible for safeguarding your account credentials.
    <br></br>
    2. <span className='headLine'>Link Authentication:</span> &nbsp;
    
    All links shared on the Site are subject to rigorous authentication checks to ensure their legitimacy and security. We reserve the right to remove any links that violate our policies or pose security risks.
    <br></br>
    3. <span className='headLine'>User Registration:</span> &nbsp;
    
    Users must provide accurate, complete, and up-to-date information during the registration process. It is your responsibility to maintain the accuracy of your registration information.
    <br></br>
    4. <span className='headLine'>Privacy:</span> &nbsp;
    
    We are committed to protecting your privacy. We do not share client information with any third parties, except as required by applicable laws and regulations. Please review our Privacy Policy for more details on how we handle your data.
    <br></br>
    5. <span className='headLine'>Intellectual Property:</span> &nbsp;
    
    All content, including but not limited to website design, graphics, text, code, and multimedia, is the property of the Company or its licensors. You may not copy, reproduce, modify, distribute, or create derivative works from any part of the Site without prior written consent from the Company.
    <br></br>
    6. <span className='headLine'>Respectful Behavior:</span> &nbsp;
    
    Users are expected to treat each other with respect and courtesy. Hate speech, harassment, discrimination, or any form of abusive behavior will not be tolerated and may result in the suspension or termination of your account.
    <br></br>
    7.  <span className='headLine'>Content Removal and Reporting:</span> &nbsp;
    
    In cases where a video receives 30 or more reports for violating our content guidelines, we reserve the right to remove the video from the platform. Users can report content that they believe violates our guidelines, and our moderation team will review these reports.
    <br></br>
    8. <span className='headLine'>User Responsibility:</span> &nbsp;
    
    Users are solely responsible for their actions on the Site. The Company is not liable for any scams, fraudulent activities, or unethical conduct between users. If you encounter any such behavior, please report it to us.
    <br></br>
    9. <span className='headLine'>Termination of Accounts:</span> &nbsp;
    
    The Company reserves the right to terminate or suspend user accounts at its discretion, especially in cases of repeated violations of these Terms or for any other reason deemed necessary for the integrity and safety of the platform.
    <br></br>
    10. <span className='headLine'>Modification of Terms:</span> &nbsp;
    - We may modify these Terms at any time, and it is your responsibility to review them periodically. Your continued use of the Site after any changes will constitute your acceptance of such changes.
    <br></br>
    11. <span className='headLine'>Disclaimer of Warranties:</span> &nbsp;
    - The Site is provided "as is" and "as available" without any warranties, expressed or implied. We do not guarantee the uninterrupted or error-free operation of the Site. Your use of the Site is at your own risk.
    <br></br>
    12. <span className='headLine'>Limitation of Liability:</span> &nbsp;
    - To the fullest extent permitted by applicable law, the Company shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site, including but not limited to any loss of data, revenue, or profits.
    <br></br>
    13. <span className='headLine'>Governing Law and Jurisdiction:</span> &nbsp;
    - These Terms are governed by and construed in accordance with the laws of [Bangladesh Government]. Any disputes arising from or related to these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts located within [Bangladesh, Dhaka].
    <br></br>
    14. <span className='headLine'>Contact Information:</span> &nbsp;
    - For any questions or concerns regarding these Terms, please contact us at [saminyeasararnob@gmail.com].
    
    By using the Site, you acknowledge that you have read, understood, and agree to these detailed Terms and Conditions. These Terms are a legally binding agreement between you and [videoHub].</p>
    </motion.div>
    </div>
    </div>

    </Fragment>
  )
}

export default TermsCondition
