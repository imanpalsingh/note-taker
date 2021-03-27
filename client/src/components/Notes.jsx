
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
        <div class="Note">
            <h1>{props.heading}:</h1>
            <ol>
            {notes.map((note,index)=>{
                return (
                    <span style={{display:"block"}}  key={index}><li>{note.note}
                        &nbsp;

                        { 
                        (props.type==="owner") &&  
                            <>
                                <Share id={note.id}/>
                                <button  id={note.id} onClick={Delete} type="button" className="btn btn-primary">Delete</button>
                            </>
                        }
                        {(props.type==="owner" || props.type==="colab") && (<Update id={note.id} />)}
                        
                    </li>  
                    </span>
                    )     
                }
             
            )
        }
        </ol>
    </div>
   );
  }