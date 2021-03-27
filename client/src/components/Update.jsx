import {Modal,Button} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";

export default function Example(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShare = (event)=>{
            
             /*
                Put request to update a note
            */
            axios.put("note",{

                noteId: props.id,
                newNote: event.target.newNote.value
            })
            .then(result=>{

            })
            event.preventDefault();
            handleClose()
    }
    return (
      <>
        <Button variant="primary" onClick={()=>handleShow}>
          Update
        </Button>
  
        <Modal show={show} onHide={()=>handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Updating a node</Modal.Title>
          </Modal.Header>
          <form onSubmit={()=>handleShare}>
          <div className="form-group" style={{margin:"0.2em"}}>

                    <input type="text" name="newNote" placeholder="Enter updated text" className="form-control" id="recipient-name" />
            </div>
        
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>handleClose}>
              Close
            </Button>
            <Button type="Submit" variant="primary">
              Update
            </Button>
          </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
  