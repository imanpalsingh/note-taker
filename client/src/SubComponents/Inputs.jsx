/*
    This componenet contsains various textboxes used 
*/
import React from "react";

export function NoteText(){
    
    return(
        <>
            <input name="note" type="text" placeholder="Write your note here" className="form-control note-text" aria-label="Large" aria-describedby="inputGroup-sizing-sm" required/>
        </>
    )
}

export function Username(){

    return(
        <>
            <label htmlFor="inputEmail"   className="sr-only">username</label>
            <input type="text" name="username" placeholder="Username" className="form-control" id="recipient-name" />
        </>
    )
}

export function Password(){

    return (
        <>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />
        </>
    )
}
