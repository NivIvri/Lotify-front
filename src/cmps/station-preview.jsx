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


const useStyles = makeStyles({
    playIcon: {
        fontSize: 40,
        color: '#00ff00',

    }
})

const navigateToStation = (stationId) => {
    window.location.href = `http://localhost:3000/station/${stationId}`;
}

const playRandTrack = () => {
    if (this.state.isPlaying) {
        //pause -possible eventBus
        this.props.setCurrTrack({}, 0);
    } else {
        const songs = [...this.state.station.songs];
        const idx = Math.floor(Math.random() * (songs.length))
        const track = songs[idx]
        this.props.setCurrTrack(track, idx);
        this.props.setQueue(songs, idx);
    }
    this.setState({ isPlaying: !this.state.isPlaying })
}

export function StationPreview({ station }) {
    const [isPlaying, setIsPlaying] = useState(false);


    const theme = createTheme({
        palette: {
            primary: {
                main: '#1db954'
            }
        }
    });
    const classes = useStyles()
    return (

        <div className="station-preview">
            {/* <Link className="img-card" to={`/station/${station._id}`}> */}
            <div className="img-card" onClick={() => navigateToStation(station._id)}>
                <div className="square-ratio img-container">
                    {station.songs.length > 0 &&
                        <img src={`${station.songs[0].imgUrl}`} />
                    }
                    {!station.songs.length &&
                        <img src={stationImg} />
                    }

                    <div className="play-icon-container" onClick={(e) => {
                        e.stopPropagation()
                        console.log('clicked play');
                    }}>
                        <ThemeProvider theme={theme}>
                            {/* <PlayCircleFilledIcon color="primary" fontSize="large"></PlayCircleFilledIcon> */}
                            {/* <PlayCircleFilledWhiteIcon className={classes.playIcon} color="secondary" fontSize="large"/> */}
                            <PlayCircleFilledWhiteIcon className={`${classes.playIcon} play-icon`} />
                            {/* <PlayCircleIcon className={classes.playIcon} /> */}
                            {/* <FavoriteBorderIcon className={`${classes.playIcon}`} ></FavoriteBorderIcon> */}
                        </ThemeProvider>

                    </div>
                </div>
                <h3 className="station-name-header">{station.name}</h3>
                <p className="station-desc">
                    {station.songs.reduce((songStr, song) => {
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