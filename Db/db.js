const pool = require("./dbSetup").connect();


//////////////// USERS ////////////////////
  
const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(200).json(results.rows.id)
  })
}

const checkUser = (request, response) =>{
  
  pool.query('SELECT * FROM users WHERE username = $1', [request.username], (error, results) => {
    
    if(error){
      console.log(error)
      throw error
    }

    if(results.rows.length){

      pool.query('SELECT * FROM users WHERE username=$1 AND password = $2', [request.username,request.password], (error, results) => {
    
        if(error){
          console.log(error)
          throw error
        }

        if(results.rows.length){

          response.status(200).json(results.rows[0].id)
        }

        else{
          response.json({error:"wrong password"})
        }

    })}

    else{
      response.json({error:"Username does not exist"})
    }


  })
  
}
  
const createUser = (request, response) => {
  
  pool.query('SELECT * FROM users WHERE username=$1',[request.username],(error, results) => {
    if (error) {
      console.log(error)
      throw error
    }

    if(results.rows.length){
      console.log(error)
      return response.json({error: "User already exists"})
    }

    else{
      pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [request.username, request.password], (error, results) => {
        console.log(error)
        if (error) {
          throw error
        }
        
        checkUser(request,response);
      
      })
    }
    
  })

}
  
/////////////// NOTES ////////////////////////////

const addNote = (request, response) =>{

  const userId = parseInt(request.id)

  /* Insert the note to the notes db */
  pool.query('INSERT INTO notes (note) values($1)', [request.note], (error, resSelect) => {
    if (error) {
      throw error
    }
    /* Extract the newly created node's id */
    pool.query('select id from notes where note=$1 ', [request.note], (error, results) => {
      if (error) {
        throw error
      }
  
      /* Update the owners table*/
      pool.query('insert into owners values($1,$2) ', [request.id,results.rows[0].id], (error, results) => {
        if (error) {
          throw error
        }
        return response.status(200).json({message:"successfull"})
        
      })
     
    }
    )
    
  })
  
}

const showNotes = (request, response)=>{
  
  const id = parseInt(request.id)
  pool.query('SELECT id,note FROM notes WHERE id IN (SELECT DISTINCT noteId FROM owners WHERE ownerId=$1)', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

}

const showNotesColab = (request, response)=>{
  
  const id = parseInt(request.id)
  pool.query('SELECT id,note FROM notes WHERE id IN (SELECT DISTINCT noteId FROM colaborators WHERE colabId=$1)', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

}

const showNotesRead = (request, response)=>{
  
  const id = parseInt(request.id)
  pool.query('SELECT id,note FROM notes WHERE id IN (SELECT DISTINCT noteid FROM readers WHERE readerid=$1)', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

}

const deleteNote = (request, response)=>{
  
  /*
      Todo  Use SQL referntial intergrity options for auto deletion from other tables that refer to it
  */

  const noteId = parseInt(request.noteId)


  /* deleting from readers for avoiding referntial integrity error */
  pool.query('Delete from readers where noteid=$1', [noteId], (error, results) => {
    if (error) {
      throw error
    }

    /* deleting from readers for avoiding referntial integrity error */
    pool.query('Delete from colaborators where noteid=$1', [noteId], (error, results) => {
      if (error) {
        throw error
      }
    
      /* deleting from owners for avoiding referntial integrity error */
      pool.query('DELETE FROM owners where noteId=$1', [noteId], (error, results) => {
        if (error) {
          throw error
        }

        /* Finally deleting from notes */
        pool.query('DELETE FROM notes where id=$1', [noteId], (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).json({message:"successfull"})
        })
    
      })

    })

  })
 
}

const updateNote = (request, response)=>{
  
  const noteId = parseInt(request.noteId)

  pool.query('UPDATE notes SET  note=$1 where id=$2', [request.newNote,noteId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({message:"successfull"})
  })
}

const shareColab = (request, response)=>{

  /* Getting the userid for the username entered */
  pool.query('select id from users where username=$1', [request.username], (error, res) => {
      if (error) {
        throw error
      }

      /* If the user is found add him to the colaborators databse for that note*/
      if(res.rows.length){

        pool.query('insert into colaborators values($1, $2) ', [res.rows[0].id,request.noteId], (error, res) => {
          if (error) {
            throw error
          }
          response.status(200).json({"message":"successfull"});
        
        })
      }
      
      else{
        response.json({"error":"User not found"});
      }
      
    })
 
}

const shareRead = (request, response)=>{
  
  /* Getting the userid for the username entered */
  pool.query('select id from users where username=$1', [request.username], (error, res) => {
      if (error) {
        throw error
      }
      
      /* If the user is found add him to the readers databse for that note*/


      if(res.rows.length){
        pool.query('insert into readers values($1, $2) ', [res.rows[0].id,request.noteId], (error, res) => {
          if (error) {
            throw error
          }
          response.status(200).json({"message":"successfull"})
        })
      }

      else{
        response.json({"error":"User not found"});
      }
    })
 
}



  module.exports = {
    getUserById,
    createUser,
    checkUser,
    addNote,
    showNotes,
    deleteNote,
    updateNote,
    shareColab,
    showNotesColab,
    showNotesRead,
    shareRead
  }