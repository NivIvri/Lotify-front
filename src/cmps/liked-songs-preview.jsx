import { Link } from 'react-router-dom'
export function LikedSongsPreview({ station }) {
    return (
        // original code
        // <div className="station-preview liked-songs">
        <div className="station-preview liked-songs">
            <Link className="img-card" to={`/station/${station._id}`}>
                <h3 className="station-name-header">{station.name}</h3>
                <p className="station-desc">
                    {station.songs.reduce((songStr, song) => {
                        songStr += ',' + song.title
                        return songStr;
                    }, '').slice(0, 30) + '...'}
                </p>
            </Link>
        </div>
    )
}