import { Link } from 'react-router-dom'
export function StationPreview({ station }) {
    return (
        <div className="station-preview">
            <Link className="img-card" to={`/station/${station._id}`}>
                <div className="square-ratio img-container">
                    <img src={`${station.songs[0].imgUrl}`} />
                </div>
                <h4>{station.name}</h4>
                <p>num of songs</p>
                {/* liked? num of songs */}
            </Link>
        </div>
    )
}