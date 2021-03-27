/*
    This component is reposible for showing all the notes, and componenets to add notes.
*/

import { Redirect} from 'react-router-dom'
import React from "react";
import axios from "axios";
import Notes from "./Notes";
import {NoteText} from "../SubComponents/Inputs";
import "../styles/Home.css"
import "../styles/media.css"


export default function Home(){
  
    /*Using local storage for basic authentication*/
    if(localStorage.getItem("auth")==="false"){

        return <Redirect to="/login" />
    }

    function onSubmit(event){

        const newNote = event.target.note.value;
        const currentID  = localStorage.getItem("id");

        /*
        Post request for creating a new note for the current logged in user.
        */
        axios.post("note",{
            note: newNote,
            id: currentID,
        })
        .then(result=>{
        })
        event.preventDefault();
    }

   return(
       <>
        <form className="form-signin NoteAdder" onSubmit={onSubmit}>   
            <div className="input-group input-group-lg">
                <div className="input-group-prepend">
                    <button  className="input-group-text" id="inputGroup-sizing-lg">Add</button>
                </div>
                <NoteText />
            </div>
        </form>
        <div className="note-links">
            <a href="#Notes" className="nav-link">Notes</a>
            <a href="#Colaborating" className="nav-link">Colaborations</a>
            <a href="#Reading Now" className="nav-link">Reading</a>
            <span className="nav-link" onClick={()=>{alert("(Work in progress) Please visit /login to login again")}}>Logout</span>
           

        </div>
        <div className="NoteContainer">
            <Notes type="owner"heading="Notes" />
            <Notes type="colab" heading="Colaborating" />
            <Notes type="read" heading="Reading Now" />
        </div>
    </>
   );
  }
