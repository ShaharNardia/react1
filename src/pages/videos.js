import React, { Component } from 'react';
import VideosList from '../components/VideosList.js';
import Video from '../components/Video.js';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import "../App.css";

class Videos extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Redirect exact from="/" to="/videos" />
          <Route exact path='/videos' component={VideosList} /> {/*do not forget to put the 'exact' for every route strats the same as other routes -*/} 
          <Route path='/videos/:id' component={Video} />        {/*other way it will route allways to the same path*/}
        </Switch>
      </Router>
    );
  }
}
export default Videos;
