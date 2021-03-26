/*
  This file provides basic landing page redirection
*/

import { Redirect } from 'react-router-dom'

export default function Wrap(props){
  
  
    if(!props.auth)
    return <Redirect to="/login" />

   return(
     <>
     </>
   );
  }
