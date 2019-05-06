import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "../App.css";

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = { VideosList: [], VideoId: '' };
    }

    
    //and get the parameter 
    static getDerivedStateFromProps(props, state) {
        return {
            VideosList: props.store.videosArray, //set the state with the data(the videos array) that already stored at the store (- redux) 
            VideoId: props.match.params.id      //get the parameter id from the url and sets the state with it
        };
    }

    render() {
        var _videoById = this.state.VideosList.filter(video => video.id === this.state.VideoId);//filter the videos array to get the one with same id as the parameter id from the url
        var videoLink = 'https://www.youtube.com/watch?v=' + this.state.VideoId;
        var video = _videoById.map((video, index) =>  //extract all the data from the specific video
            <div className='singleVideoDiv' key={index}>
                <div>
                    <div className='videoTitle'>
                        {video.snippet.title}
                    </div>
                    <img alt={video.id} src={video.snippet.thumbnails.medium.url} />
                    <div className='videoDetailsDiv'>
                        <div>
                            Channel Name: {video.snippet.channelTitle}
                        </div>
                        <div>
                            Views: {video.statistics.viewCount}
                        </div>
                        <div>Likes: {video.statistics.likeCount}
                        </div>
                    </div>
                    <div className='watchOnYoutube'>
                        <a href={videoLink}>WATCH ON YOUTUBE</a>
                    </div></div>
            </div>
        );
        return (
            <div>
                <div className='backToListLink'>
                    <Link to='/videos'>Back to list</Link></div>
                <div className='containerDiv'>
                    {video}</div>
            </div>
        );
    }
}
const mapStoreToProps = state => {
    return {
        store: state
    };
};
export default connect(mapStoreToProps)(Video);
