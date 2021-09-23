import React, { Component } from 'react'
import { PlaylistPreview } from '../cmps/playlist.preview.jsx';
import { stationService } from '../services/async-storage.service.js';

export class Home extends Component {
    state = {
        playlists: null,
    }
    async componentDidMount() {
        const playlists = await stationService.query();
        this.setState({ playlists })         
    }

    render() {
        const { playlists } = this.state
        if (!playlists) return <h1>loading...</h1>
        return (
            <section className='station-container'>
                {playlists.map((playlist => <PlaylistPreview playlist={playlist} />))}
                {playlists.map((playlist => <PlaylistPreview playlist={playlist} />))}
                {playlists.map((playlist => <PlaylistPreview playlist={playlist} />))}
                {playlists.map((playlist => <PlaylistPreview playlist={playlist} />))}
            </section>
        )
    }
}
