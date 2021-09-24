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
import { connect } from 'react-redux'

import { playNextTrack, playPrevTrack, shuffleQueue } from '../store/station.actions.js';
import { Duration } from '../services/util.service';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';


class _AppFooter extends Component {
    state = {
        volume: 30,
        isPlayedTrack: false,
        played: 0,
        loaded: 0,
        duration: 0,
        inQueue: false
    }

    componentDidUpdate(prevProps) {
        if (this.props.currTrack !== prevProps.currTrack) {
            this.setState({ isPlayedTrack: true, played: 0, duration: 0 })
        }
    }

    handleChange = (event) => {
        let newValue = event.target.value;
        this.setState({ volume: newValue });
    };
    togglePlay = () => {
        this.setState({ isPlayedTrack: !this.state.isPlayedTrack })
    }


    handleSeekMouseDown = e => {
        if (!this.props.currTrack) return
        this.setState({ seeking: true })
    }

    handleSeekChange = e => {
        if (!this.props.currTrack) return

        this.setState({ played: parseFloat(e.target.value) },
            console.log(this.state.played, 'played')
        )
    }

    handleSeekMouseUp = e => {
        if (!this.props.currTrack) return

        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    handleProgress = state => {
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }


    handleDuration = (duration) => {
        this.setState({ duration })
    }

    ref = player => {
        console.log(player, 'player');
        this.player = player
    }


    goNext = () => {
        this.props.playNextTrack()
    }

    goShuffle = () => {
        this.props.shuffleQueue([...this.props.queue])
    }

    goPrev = () => {
        this.props.playPrevTrack()
    }
    handleDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ duration })
    }


    inQueue = async () => {
        await this.setState({ inQueue: !this.state.inQueue })
        if (this.state.inQueue)
            this.props.history.push(`/queue`)
        else {
            this.props.history.goBack()
        }
    }

    render() {
        const { played, isPlayedTrack, duration, volume } = this.state
        const track = this.props.currTrack
        return (
            <>
                {
                    track &&
                    <div className='player'>

                        <ReactPlayer
                            ref={this.ref}
                            playing={isPlayedTrack}
                            url={`https://www.youtube.com/watch?v=${track.id}`}
                            onDuration={this.onDuration}
                            onProgress={this.onProgress}
                            width='0px'
                            heigth='0px'
                            volume={volume / 100}
                            onSeek={e => console.log('onSeek', e)}
                            onProgress={this.handleProgress}
                            onDuration={this.handleDuration}
                            controls='false'
                        />
                    </div>
                }
                <div className='playing-bar'>

                    <div className="volume">
                        <Box sx={{ width: 200 }}>
                            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                {/*<VolumeDown />*/}
                                <Slider aria-label="Volume" value={volume} onChange={this.handleChange} />
                                {/*<VolumeUp />*/}
                            </Stack>
                        </Box>
                        <div>
                            <span onClick={this.inQueue} class="fas fa-outdent"></span>
                        </div>
                    </div>

                    <div className="player-controls">
                        <div className="player-controls-btn flex">
                            <span class="fas fa-random" onClick={this.goShuffle}></span>

                            {/*<img src={shuffle} onClick={this.goShuffle} />*/}
                            <span class="fas fa-step-forward" onClick={this.goPrev}></span>

                            {/*<img src={next} onClick={this.goPrev} />*/}
                            {
                                isPlayedTrack &&
                                <span class="fas fa-pause" onClick={this.togglePlay}></span>
                                //<img src={pause} onClick={this.togglePlay} />
                            }
                            {
                                !isPlayedTrack &&
                                <span class="fas fa-play" onClick={this.togglePlay}></span>
                                //<img src={play} onClick={this.togglePlay} />
                            }
                            <span class="fas fa-step-forward" onClick={this.goNext}></span>
                            {/*<img src={next} onClick={this.goNext} />*/}
                        </div>
                        <div className='played-input flex'>
                            <Duration seconds={duration * played} />
                            <input
                                type='range' min={0} max={0.999999} step='any'
                                value={played}
                                onMouseDown={this.handleSeekMouseDown}
                                onChange={(ev) => this.handleSeekChange(ev)}
                                onMouseUp={this.handleSeekMouseUp}
                            />
                            <Duration seconds={duration} />
                        </div>
                    </div>


                    <div className='song-name-bar'>
                        <div>
                            {track ? track.title : ""}
                        </div>
                        <div>♥</div>
                        {
                            track &&
                            <img className='track-img' src={track.imgUrl} />
                        }
                    </div>

                </div>
            </>
        )
    }
}


function mapStateToProps(state) {
    return {
        currTrack: state.stationMoudle.currTrack,
        queue: state.stationMoudle.queue

    }
}
const mapDispatchToProps = {
    playNextTrack,
    playPrevTrack,
    shuffleQueue
}


const __AppFooter = connect(mapStateToProps, mapDispatchToProps)(_AppFooter)
export const AppFooter = withRouter(__AppFooter);
