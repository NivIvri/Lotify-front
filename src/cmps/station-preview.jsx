import { Link } from 'react-router-dom'
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { createMuiTheme, createTheme, ThemeProvider } from '@material-ui/core/styles';
import stationImg from '../assets/img/stationImg.jpg'
// import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
// import PlayCircleIcon from '@material-ui/icons/';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { setCurrTrack, addToNextQueue, setQueue, loadStations } from '../store/station.actions.js';
import React from 'react'
import { ThreeSixtySharp } from '@material-ui/icons';
import { connect } from 'react-redux'
import { typography } from '@mui/system';
import { withRouter } from "react-router";

const useStyles = makeStyles({
    playIcon: {
        fontSize: 40,
        color: '#00ff00',

    }
})
// const classes = useStyles()

class _StationPreview extends React.Component {
    state = {
        isPlaying: false
    }

    useStyles = makeStyles({
        playIcon: {
            fontSize: 40,
            color: '#00ff00',

        }
    })

    playRandTrack = () => {
        if (this.state.isPlaying) {
            //pause -possible eventBus
            this.props.setCurrTrack({}, 0);
        } else {
            const songs = [...this.props.station.songs];
            const idx = Math.floor(Math.random() * (songs.length))
            const track = songs[idx]
            this.props.setCurrTrack(track, idx);
            this.props.setQueue(songs, idx);
        }
        this.setState({ isPlaying: !this.state.isPlaying })
    }

    navigateToStation = (stationId) => {
        // window.location.href = `http://localhost:3000/station/${stationId}`;
        this.props.history.push(`/station/${stationId}`)
    }

    render() {
        const { station } = this.props
        const theme = createTheme({
            palette: {
                primary: {
                    main: '#22EE44'
                }
            },
            typography: {
                fontSize: '24'
            }
        });

        return (
            <div className="station-preview">
                {/* <Link className="img-card" to={`/station/${station._id}`}> */}
                <div className="img-card" onClick={() => this.navigateToStation(station._id)}>
                    <div className="square-ratio img-container">
                        {station.songs.length > 0 &&
                            <img src={`${station.songs[0].imgUrl}`} />
                        }
                        {!station.songs.length &&
                            <img src={stationImg} />
                        }

                        <div className="play-icon-container" onClick={(e) => {
                            e.stopPropagation()
                            this.playRandTrack()
                        }}>
                            {/* color="primary" */}
                            <ThemeProvider theme={theme}>
                                <PlayCircleFilledWhiteIcon className='play-icon' color="primary" />
                            </ThemeProvider>

                        </div>
                    </div>
                    <div className="station-name-header">
                        {station.name.length < 50 ? station.name : station.name.slice(0, 50) + '...'}
                    </div>
                    <p className="station-desc">
                        {!station.songs.length? '':
                        station.songs.reduce((songStr, song) => {
                            songStr += ',' + song.title
                            return songStr;
                        }, '').slice(0, 30) + '...'}
                    </p>
                    {/* liked? num of songs */}
                    {/* </Link> */}
                </div>
            </div >
        )


    }


}

function mapStateToProps(state) {
    return {
        stations: state.stationMoudle.stations,
        queue: state.stationMoudle.queue,
        currTrack: state.stationMoudle.currTrack,
        user: state.userMoudle.user,

    }
}
const mapDispatchToProps = {
    setCurrTrack,
    setQueue,
}


const __StationPreview = connect(mapStateToProps, mapDispatchToProps)(_StationPreview)
export const StationPreview = withRouter(__StationPreview);