import { Link } from 'react-router-dom'
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { createMuiTheme, createTheme, ThemeProvider } from '@material-ui/core/styles';

// import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
export function StationPreview({ station }) {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#1db954'
            }
        }
    });
    return (
        <div className="station-preview">
            <Link className="img-card" to={`/station/${station._id}`}>
                <div className="square-ratio img-container">
                    <img src={`${station.songs[0].imgUrl}`} />
                    <div className="play-icon">
                        <ThemeProvider theme={theme}>
                            <PlayCircleFilledIcon color="primary" fontSize="large"></PlayCircleFilledIcon>

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
            </Link>
        </div>
    )
}