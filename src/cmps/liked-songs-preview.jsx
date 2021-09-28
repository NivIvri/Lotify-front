import { Link } from 'react-router-dom'
// import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
export function LikedSongs({ station }) {
    return (
        <div className="station-preview liked-songs">
            <Link className="img-card" to={`/station/${station._id}`}>
                {/* <div className="square-ratio img-container"> */}
                {/* <img src={`${station.songs[0].imgUrl}`} /> */}
                {/* </div> */}
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