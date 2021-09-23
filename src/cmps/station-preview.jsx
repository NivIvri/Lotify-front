import { Link } from 'react-router-dom'
export function StationPreview({station}){
    return(
        <div className="station-preview">
            <Link to={`/station/${station._id}`}>
            <img src={`${station.songs[0].imgUrl}`} />
            <h3>{station.name}</h3>
            {/* liked?
            num of songs */}
            </Link>
        </div>
    )
}