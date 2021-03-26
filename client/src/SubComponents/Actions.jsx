/*
    This file contains some exceptional event handlers
*/

import axios from "axios";


export function Delete(event){

    /*
        delete request to delete a node
    */
    axios.delete("note",{
        params : {
            noteId: event.target.id
        }
        
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


