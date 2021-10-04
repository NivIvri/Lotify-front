import React, { Component } from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'

import { setPlay, playNextTrack, playPrevTrack, shuffleQueue, toggleIsPlaying,unshuffleQueue } from '../store/station.actions.js';
import { Duration } from '../services/util.service';
import { withRouter } from "react-router";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
//import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import heartNotChecked from '../assets/img/heart-regular.svg';
import { addLikeToTrack, removeLikeFromTrack } from '../store/user.actions';


class _AppFooter extends Component {
    state = {
        volume: 30,
        isPlayedTrack: false,
        played: 0,
        loaded: 0,
        duration: 0,
        inQueue: false,
        isShuffle: false,
        isLiked: false

    }

    componentDidUpdate(prevProps, prevstate) {
        if (this.props.currTrack !== prevProps.currTrack) {
            this.isTrackLiked()
            //this.props.toggleIsPlaying();
            this.props.setPlay()
            this.setState({ played: 0, duration: 0 })
        }
        if (!this.props.user || !prevProps.user) return
        if (this.props.user.likedTracks.length !== prevProps.user.likedTracks.length) {
            this.isTrackLiked()
        }
    }

    isTrackLiked = () => {
        if (!this.props.currTrack) return
        const trackIdxs = this.props.user.likedTracks.map(track => track.id)
        const isLiked = trackIdxs.includes(this.props.currTrack.id)
        this.setState({ isLiked })
        return isLiked
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
        this.player = player
    }


    goNext = () => {
        this.props.playNextTrack()
    }

    goShuffle = () => {
        if(this.state.isShuffle){
            this.props.unshuffleQueue(this.props.playedStation)
        }else{
            this.props.shuffleQueue([...this.props.queue])
        }
        this.setState({ isShuffle: !this.state.isShuffle })
    }

    goPrev = () => {
        this.props.playPrevTrack()
    }
    handleDuration = (duration) => {
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

    toggleLike = async (ev) => {
        ev.stopPropagation()
        this.setState({ isLiked: !this.state.isLiked }, () => {
            if (this.state.isLiked)
                this.props.addLikeToTrack(this.props.currTrack, 'track')
            else {
                this.props.removeLikeFromTrack(this.props.currTrack.id, 'track')
            }
        })
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
                        <div className='img-container-player'>
                            {
                                track &&
                                <img className='track-img' src={track.imgUrl} />
                            }
                        </div>
                        <div>
                            {track ? track.title : ""}
                        </div>
                        <div>
                            {
                                this.state.isLiked && <span className='isLike' onClick={(ev) => { this.toggleLike(ev) }} class="fas fa-heart"></span>
                            }
                            {
                                !this.state.isLiked && <img className='isnotLike' src={heartNotChecked} onClick={(ev) => { this.toggleLike(ev) }} />
                            }
                        </div>
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
                                {volume === 0 &&
                                    <span class="fas fa-volume-mute"></span>}
                                {volume > 0 && volume < 50 &&
                                    <span class="fas fa-volume-down"></span>}
                                {volume > 50 &&
                                    <span class="fas fa-volume-up"></span>}

                                <Slider aria-label="Volume" value={volume} onChange={this.handleChange} />
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
        playedStation: state.stationMoudle.playedStation,
        queue: state.stationMoudle.queue,
        user: state.userMoudle.user

    }
}
const mapDispatchToProps = {
    playNextTrack,
    playPrevTrack,
    shuffleQueue,
    unshuffleQueue,
    toggleIsPlaying,
    setPlay,
    addLikeToTrack,
    removeLikeFromTrack
}


const __AppFooter = connect(mapStateToProps, mapDispatchToProps)(_AppFooter)
export const AppFooter = withRouter(__AppFooter);
