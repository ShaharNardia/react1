const initialState = {
  videosArray: [],
  pageTokensArray: [],
};

const mainreducer = (state = initialState, action) => {
  switch (action.type) {
    case "AddVideos":
      var _videos = action.videos;
      state.videosArray.push(..._videos); // Gets 10 videos as array and push them to the store array as singles
      return { ...state };

    case "AddPageToken":
      var _token = action.pageToken;
      state.pageTokensArray.push(_token); //push the page tokens to array so we will know the next page token
      return { ...state };

    default:
      return state;
  }
};

export default mainreducer;
