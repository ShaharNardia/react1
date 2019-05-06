import React, { Component } from 'react';
import videoService from '../src/services/Videos.js';
import { connect } from "react-redux";
import Videos from './pages/videos.js';


class App extends Component {

  //At the first load of the application we go to the service and get the first data
  componentDidMount() {
    videoService.getVideosFromWS().then(videos => {
      this.props.dispatch({ type: "AddVideos", videos: videos.data.items });  // insert into the store the first 10 videos
      this.props.dispatch({ type: "AddPageToken", pageToken: videos.data.nextPageToken }); // insert into the store the next page token
    });
  }

  render() {
    return (
      <div>
         <div className='header'>Youtube</div> {/*this header is fixed */}
        <div className='mainDiv'> {/*do not forget that fixed header requires margined div so he won't hide anything */}
        <Videos />
        </div>
      </div>
    );
  }
}
export default connect()(App);
