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
//function SeekBar({ played, duration, setPlayed }) {

//    const secToHHMMSS = (secs) => {
//        const pad = (num) => {
//            return ("0" + num).slice(-2);
//        }
//        var minutes = Math.floor(secs / 60);
//        secs = secs % 60;
//        var hours = Math.floor(minutes / 60)
//        minutes = minutes % 60;
//        if (hours === 0) { return `${pad(minutes)}:${pad(secs)}`; }
//        else if (hours !== 0) { return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`; }
//    }
//    var newPlayed = secToHHMMSS(Math.round(played));
//    var newDuration = secToHHMMSS(duration);
//    return (
//        <div style={{ marginBottom: '10vh' }}>
//            <input style={{ width: '90%', margin: '0 5% 0 5%', height: '2px', borderRadius: '10%' }} className="slider"
//                type='range' min={0} value={Math.round(played)} max={duration}
//                onChange={e => setPlayed(e.target.value)} />
//            <span style={{ float: 'left', marginLeft: '5%', marginTop: '3%' }}>{newPlayed}</span>
//            <span style={{ float: 'right', marginRight: '5%', marginTop: '3%' }}>{newDuration}</span>
//        </div>
//    )
//}


class _AppFooter extends Component {
    state = {
        volume: 50,
        isPlayedTrack: false,
        played: 0,
        loaded: 0,
        duration: 0,
    }

    componentDidUpdate(prevProps) {
        if (this.props.currTrack !== prevProps.currTrack) {
            this.setState({ isPlayedTrack: true, played: 0 })


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
        this.setState({ seeking: true })
    }

    handleSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) },
            console.log(this.state.played, 'played')
        )
    }

    handleSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    handleProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }


  

    handleDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ duration })
    }

    ref = player => {
        console.log(player, 'player');
        this.player = player
    }

    render() {
        const { played, isPlayedTrack, volume } = this.state
        console.log(played, 'played');
        const track = this.props.currTrack
        return (
            <div className='playing-bar'>
                {
                    track &&
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

                    />
                }
                <div className="volume">
                    <Box sx={{ width: 200 }}>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            {/*<VolumeDown />*/}
                            <Slider aria-label="Volume" value={volume} onChange={this.handleChange} />
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
                        <input
                            type='range' min={0} max={0.999999} step='any'
                            value={played}
                            onMouseDown={this.handleSeekMouseDown}
                            onChange={(ev) => this.handleSeekChange(ev)}
                            onMouseUp={this.handleSeekMouseUp}
                        /></div>

                </div>


                <div className='song-name-bar flex'>
                    <div>
                        {track ? track.title : ""}
                    </div>
                    <div>♥</div>
                    {
                        track &&
                        <img className='track-img' src={track.imgUrl} />
                    }
                </div>
                <div>
                    <progress max={1} value={played} />

                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        currTrack: state.stationMoudle.currTrack,
<<<<<<< HEAD
=======
        queue: state.stationMoudle.queue
>>>>>>> d4471928ab4264e94fe80832f4d08d61a0fd1427
    }
}
const mapDispatchToProps = {

}


export const AppFooter = connect(mapStateToProps, mapDispatchToProps)(_AppFooter)