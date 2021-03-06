/*
    This file is responsible for showing notes of all types
*/


import React, {useState, useEffect} from "react";
import axios from "axios";
import {Delete} from "../SubComponents/Actions";
import Share from "./Share";
import Update from "./Update";
import "../styles/Notes.css"


export default function ViewNote(props){

    const [notes, updateNotes] = useState([]);
    const currentID  = localStorage.getItem("id");
    
    const fetchNotes = async(url) =>{    
        const response = await axios.get("note",{
            params : {
                id : currentID,
                type:props.type
            }
        });
        return response;
    }

    useEffect(()=>{

        fetchNotes()
        .then(result=>{
            
            updateNotes(result.data)
        })
    })

   return(
        <div className="Note">
            <h1 id={props.heading}>{props.heading}:</h1>
            {notes.map((note,index)=>{
                return (
                    <span className="note-content" style={{display:"block"}}  key={index}>
                        
                        <span className="note-text"> {note.note} </span><br />
                        &nbsp;
                        <span clasname="bottom-button-group">
                        { 
                        (props.type==="owner") &&  
                            <>
                                <Share id={note.id}/>
                                <button  id={note.id} onClick={Delete} type="button" className="btn btn-primary delete-note">Delete</button>
                            </>
                        }
                        {(props.type==="owner" || props.type==="colab") && (<Update id={note.id} />)}
                        </span>
 
                    </span>
                    )     
                }
             
            )
        }
    </div>
   );
  }