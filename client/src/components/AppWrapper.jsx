/*
  This file provides basic landing page redirection
*/

import { Redirect } from 'react-router-dom'

export default function Wrap(props){
  
  
    if(!props.auth || localStorage.getItem("Auth")===null || localStorage.getItem("Auth")==="false")
    return <Redirect to="/login" />

   return(
     <>
     </>
   );
  }
