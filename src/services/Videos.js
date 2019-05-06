import axios from "axios";

class Videos {

  static ApiKey = 'AIzaSyDDXQZPV4H9oKc52-X101LGdeEQ0iSpBlA'; //should hide it for security reasons!  
  
  //the defaut value empty - (pageToken = '') -  is for the first call 
  static getVideosFromWS = (pageToken = '') => { 
    return axios.get(`https://www.googleapis.com/youtube/v3/videos?pageToken=${pageToken}&part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=10&key=${this.ApiKey}`)
  }
  //this function returns json of videos object from the youtube rest API
}

export default Videos;

