import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import videoService from '../services/Videos';
import "../App.css";

class VideosList extends Component {
    constructor(props) {
        super(props);
        this.state = { VideosList: [], pageTokens: [] };
    }
    static getDerivedStateFromProps(props, state) {
        return {
            VideosList: props.store.videosArray, //set the state with the data(the videos array) that already stored at the store (- redux) 
            pageTokens: props.store.pageTokensArray //set the state with the data(the pages-tokens) that already stored at the store (- redux) 
        };
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }
    handleScroll = () => {
        //calculate if the user srolled till the bottom of the page*/
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        /*************************************************************/
        if (windowBottom >= docHeight) { //if the user scrolled to the bottom - 

            const token = this.state.pageTokens[this.state.pageTokens.length - 1]; //get the last token at the tokens array stored at the store

            videoService.getVideosFromWS(token).then(videos => { //pass the token to the getVideosFromWS() function to get the next 10 videos
                this.props.dispatch({ type: "AddVideos", videos: videos.data.items }); //after we got response we push the data to the array at the store
               
                //right after pushing the data, we check if the next request is useful, if not -  to avoid unnecessary requests we will stop the requests by remove the eventListener
                if (videos.data.nextPageToken === undefined) {
                    window.removeEventListener("scroll", this.handleScroll);
                }
                else {
                    this.props.dispatch({ type: "AddPageToken", pageToken: videos.data.nextPageToken });
                }
            });

        }
    }

    letsWatch = (id) => {
        this.props.history.push(`/videos/${id}`); //redirect back to the videos list
    }
    render() {
        console.log(this.state);
        var videos = this.state.VideosList.map((video, index) =>
            <div key={index}>
                <div>  <img alt={video.snippet.thumbnails.medium.url} src={video.snippet.thumbnails.medium.url} />
                    <div className='videoTitle'>
                        {video.snippet.title}
                    </div>
                    <div className='letsWatchLink'>
                        <Link
                            onClick={this.letsWatch.bind(this, video.id)}
                            to={`/videos/${video.id}`}
                        >
                            LET'S WATCH
            </Link>
                    </div></div>
            </div>
        );
        return (
            <div>
                <h3 className='title'>Most populer videos</h3>
                <div className='containerDiv'>
                    {videos}</div>
            </div>
        );
    }
}
const mapStoreToProps = state => {
    return {
        store: state
    };
};
export default connect(mapStoreToProps)(VideosList);
