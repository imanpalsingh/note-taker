import React, { useState } from "react";
import Form from "./components/Form";
import Home from "./components/Home";

import Wrap from "./components/AppWrapper";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App(props) {

  const [isAuthed, authenticate] = useState(false);
  
  return (
    <Router>
      <Switch>
        <Route exact path="/signup">
          <Form type="signup" auth={isAuthed} setAuth = {authenticate} />
        </Route>
        <Route exact path="/login">
          <Form type="login" auth={isAuthed} setAuth = {authenticate} />
        </Route>
        <Route exact path="/Home">
          <Home auth={isAuthed} setAuth = {authenticate} />
        </Route>
        <Route path="/">
          <Wrap auth={isAuthed} />
        </Route> 
    </Switch>
   </Router>
  );
}

export default App;
