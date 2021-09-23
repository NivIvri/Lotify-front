import React, { Component } from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
//import VolumeDown from '@mui/icons-material/VolumeDown';
//import VolumeUp from '@mui/icons-material/VolumeUp';
import next from '../assets/img/next.svg';
import pause from '../assets/img/pause.png';
import play from '../assets/img/play.svg';
import shuffle from '../assets/img/shuffle.svg';
import ReactPlayer from 'react-player'

export class AppFooter extends Component {
    state = {
        track: {
            _id: "bpOSxM0rNPM",
            title: "Arctic Monkeys - Do I Wanna Know?",
            imgUrl: "https://i.ytimg.com/vi/bpOSxM0rNPM/default.jpg",
            duration: "PT4M26S",
        },
        volum: 30,
        isPlayedTrack: false
    }

    handleChange = (event, newValue) => {
        this.setState({ volum: newValue });
        console.log(this.state.volum);
    };
    togglePlay = () => {
        this.setState({ isPlayedTrack: !this.state.isPlayedTrack })
    }

    render() {
        const { track, isPlayedTrack } = this.state
        if (!track) return <div>loading
        </div>
        return (
            <div className='playing-bar'>
                <ReactPlayer
                    playing={isPlayedTrack}
                    url={`https://www.youtube.com/watch?v=${track._id}`}
                    onDuration={this.onDuration}
                    onProgress={this.onProgress}
                    width='0px'
                    heigth='0px'
                />
                <div className="volum">
                    <Box sx={{ width: 200 }}>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            {/*<VolumeDown />*/}
                            <Slider aria-label="Volume" value={this.state.value} onChange={this.handleChange} />
                            {/*<VolumeUp />*/}
                        </Stack>
                    </Box> </div>

                <div className="player-controls">
                    <div className="player-controls-btn flex">
                        <img src={shuffle} />
                        <img src={next} />
                        {
                            isPlayedTrack &&
                            <img src={pause} onClick={this.togglePlay} />
                        }
                        {
                            !isPlayedTrack &&
                            <img src={play} onClick={this.togglePlay} />
                        }
                        <img src={next} />
                    </div>
                    <div className='played-input'>
                        <input type='range' />
                    </div>
                </div>


                <div className='song-name-bar flex'>
                    <div>
                        {track.title}
                    </div>
                    <div>♥</div>
                    <img className='track-img' src={track.imgUrl} />
                </div>
            </div>
        )
    }
}

