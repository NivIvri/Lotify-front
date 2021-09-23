import React, { Component } from 'react'
 const playlistService =require ('../services/playlist.service.js')

export class Home extends Component {

    async componentDidMount() {
        const res = await playlistService.query();
        console.log(res);
    }

    render() {
        return (
            <div>
                hi
            </div>
        )
    }
}
