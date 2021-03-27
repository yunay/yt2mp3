import axios from 'axios'
import config from '../../config';

export class YoutubeService {

    public getVideosByText(searchString: string) {
        return axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${searchString}&key=${config.youtubeKey}&type=video`).then(result => {
            return result.data.items;
        })
    }

    public getPlaylistsByText(searchString: string){
        return axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${searchString}&key=${config.youtubeKey}&type=playlist`).then(result => {
            return result.data.items;
        })
    }

    public getPlaylistItems(playlistId: string){
      return axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1000&playlistId=${playlistId}&key=${config.youtubeKey}`).then(result => {
          return result.data.items;
      })
    }

    public getVideoById(videoId:string){
        return axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${config.youtubeKey}`).then(result => {
            return result.data.items;
        })
    }
}
