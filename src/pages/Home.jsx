import React, { Component } from 'react'
import { PlaylistPreview } from '../cmps/playlist.preview.jsx';
import { stationService } from '../services/playlist.service.js';
export class Home extends Component {
    state={
        playlists:null,
    }

    async componentDidMount() {
        const res = await stationService.query();
        this.setState({playlists:res})
        console.log(res);
    }


    render() {
        const {playlists}=this.state
        if (!playlists) return <h1>loading...</h1>
        return (
            <div>
                {playlists.map((playlist=><PlaylistPreview playlist={playlist}/>))}
            </div>
        )
    }
}
