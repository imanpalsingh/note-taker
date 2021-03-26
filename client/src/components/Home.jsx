/*
    This component is reposible for showing all the notes, and componenets to add notes.
*/

import { Redirect } from 'react-router-dom'
import React from "react";
import axios from "axios";
import Notes from "./Notes";
import {NoteText} from "../SubComponents/Inputs";
import "../styles/Home.css"


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

            if(result.data.error){
                console.log(result.data.error);
            }

            else{
                console.log(result)
            }
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
        <div class="NoteContainer">
            <Notes type="owner"heading="Notes" />
            <Notes type="colab" heading="Colaborating" />
            <Notes type="read" heading="Reading Now" />
        </div>
    </>
   );
  }
