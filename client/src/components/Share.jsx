import {Modal,Button} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";

export default function Example(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShare = (event)=>{
        let type = null;
            if(event.target.shareType[0].checked){
                type="colab"
            }

            else if(event.target.shareType[1].checked){
                type="read"
            }
            axios.post("share",{
                username: event.target.username.value,
                noteId : props.id,
                type: type

                
            })
            .then(result=>{
    
            })
            event.preventDefault();
    }
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Share
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Share Note</Modal.Title>
          </Modal.Header>
          <form onSubmit={()=>handleShare}>
          <div className="form-group " style={{margin:"0.4em"}}>
                    <label id="username-share" htmlFor="recipient-name" className="col-form-label">username</label>
                    <input type="text" name="username" className="form-control" id="recipient-name" />
                </div>
        <div className="form-group" style={{margin:"0.4em"}}>
            <label htmlFor="message-text" className="col-form-label">Add as</label>
            <div className="form-check" style={{margin:"0.4em"}}>
                <input className="form-check-input" type="radio" name="shareType" id="colab" />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    Contributor
                </label>
                <br />
                <input className="form-check-input" type="radio" name="shareType" id="read" />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    Reader
                </label>
            </div>
        </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="Submit" variant="primary">
              Share
            </Button>
          </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
  