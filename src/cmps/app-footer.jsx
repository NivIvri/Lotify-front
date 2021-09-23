import React, { Component } from 'react'

export class AppFooter extends Component {
    state = {
        track: {
            _id: "bpOSxM0rNPM",
            title: "Arctic Monkeys - Do I Wanna Know?",
            imgUrl: "https://i.ytimg.com/vi/bpOSxM0rNPM/default.jpg",
            duration: "PT4M26S"
        }
    }
    render() {
        const { track } = this.state
        if (!track) return <div>loading
        </div>
        return (
            <div className='playing-bar'>
                <div>♥</div>
                <img className='track-img' src={track.imgUrl} />
                <div className='song-name-bar'>
                {track.title}
                </div>
            </div>
        )
    }
}
