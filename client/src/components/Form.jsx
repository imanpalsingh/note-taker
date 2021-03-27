/*
  This component provides generic form for logingin in and signing up
*/


import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import {Link} from "react-router-dom";
import {Username, Password} from "../SubComponents/Inputs";
import "../styles/Form.css";


export default function Form(props){

    
    function onSubmit(event){

        
        /*

        A generic call to auth route is done.
        Type parameter determines if it is a sign up or login request

        */

        axios.post("auth",{
            username: event.target.username.value,
            password: event.target.password.value,
            type: props.type
        })
        .then(result=>{

            if(result.data.error){
                props.setAuth(false)
                localStorage.setItem("Auth", "false")
                localStorage.setItem("id","-1")
                alert(result.data.error);
            }

            else{
               
                props.setAuth(true)
                localStorage.setItem("Auth", "true");
                localStorage.setItem("id",'' + result.data);
            }
        })
        event.preventDefault();
    }

    return(

        <>
            { props.auth && <Redirect to="/home" />}
            <div className="form-controller">
                <form className="form"onSubmit={onSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">{props.type==="login"?"Log In":"Sign Up"}</h1>
                    <Username />
                    <Password />
                    <button className="btn btn-lg btn-primary" type="submit">{props.type}</button>
                    <Link to={(props.type==="login")?"/signup":"/login"}><br /><br />
                        <span>{(props.type==="login")?"Sign Up":"Login In"}</span>
                    </Link>
                </form>
            </div>
        </>
    )
}