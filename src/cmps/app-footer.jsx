import React, { Component } from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'

import { setPlay, playNextTrack, playPrevTrack, shuffleQueue, toggleIsPlaying } from '../store/station.actions.js';
import { Duration } from '../services/util.service';
import { withRouter } from "react-router";


class _AppFooter extends Component {
    state = {
        volume: 30,
        isPlayedTrack: false,
        played: 0,
        loaded: 0,
        duration: 0,
        inQueue: false,
        isShuffle: false
    }

    componentDidUpdate(prevProps) {
        if (this.props.currTrack !== prevProps.currTrack) {
            //this.props.toggleIsPlaying();
            this.props.setPlay()
            this.setState({ played: 0, duration: 0 })
        }
    }

    handleChange = (event) => {
        let newValue = event.target.value;
        this.setState({ volume: newValue });
    };
    togglePlay = () => {
        if (this.state.isLoaded)
            this.props.toggleIsPlaying();
        // this.setState({ isPlayedTrack: !this.state.isPlayedTrack })
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
        this.setState({ isShuffle: !this.state.isShuffle })
        this.props.shuffleQueue([...this.props.queue])
    }

    goPrev = () => {
        this.props.playPrevTrack()
    }
    handleDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ duration })
    }

    handleEnded = () => {
        this.props.playNextTrack()
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
        const { played, duration, volume, isShuffle } = this.state
        const { isPlaying } = this.props
        const track = this.props.currTrack
        return (
            <>
                {
                    track &&
                    <div className='player'>

                        <ReactPlayer
                            ref={this.ref}
                            playing={isPlaying}
                            url={`https://www.youtube.com/watch?v=${track.id}`}
                            onDuration={this.onDuration}
                            onProgress={this.onProgress}
                            width='0px'
                            heigth='0px'
                            volume={volume / 100}
                            onSeek={e => console.log('onSeek', e)}
                            onProgress={this.handleProgress}
                            onDuration={this.handleDuration}
                            onReady={() => { this.setState({ isLoaded: true }) }}
                            controls='false'
                            onEnded={this.handleEnded}

                        />
                    </div>
                }
                <div className='playing-bar'>
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


                    <div className="player-controls">
                        <div className="player-controls-btn flex">
                            <span className={isShuffle ? "fas fa-random green" : "fas fa-random"} onClick={this.goShuffle}></span>

                            <span className="fas fa-step-forward" onClick={this.goPrev}></span>

                            {
                                isPlaying &&
                                <span class="fas fa-pause" onClick={this.togglePlay}></span>
                            }
                            {
                                !isPlaying &&
                                <span className="fas fa-play" onClick={this.togglePlay}></span>
                            }
                            <span className="fas fa-step-forward" onClick={this.goNext}></span>
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



                    <div className="volume">
                        <div>
                            <span onClick={this.inQueue} className="fas fa-outdent"></span>
                        </div>
                        <Box sx={{ width: 200 }}>
                            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                {/*<VolumeDown />*/}
                                <Slider aria-label="Volume" value={volume} onChange={this.handleChange} />
                                {/*<VolumeUp />*/}
                            </Stack>
                        </Box>

                    </div>
                </div>
            </>
        )
    }
}


function mapStateToProps(state) {
    return {
        currTrack: state.stationMoudle.currTrack,
        isPlaying: state.stationMoudle.isPlaying,
        queue: state.stationMoudle.queue

    }
}
const mapDispatchToProps = {
    playNextTrack,
    playPrevTrack,
    shuffleQueue,
    toggleIsPlaying,
    setPlay
}


const __AppFooter = connect(mapStateToProps, mapDispatchToProps)(_AppFooter)
export const AppFooter = withRouter(__AppFooter);
