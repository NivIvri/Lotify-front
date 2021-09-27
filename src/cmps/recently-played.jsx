import { Link } from 'react-router-dom'
export function RecentlyPlayed({ stations }) {
    return (
        <div className="recently-played">
            {stations.map(station => {
                return (<Link to={`/station/${station._id}`} className="station-container">
                {/* // <div className="station-container"> */}
                    <img src={station.songs[0].imgUrl} alt="" />
                    <h3>{station.name}</h3>
                {/* // </div> */}
                </Link >
                )
})}
        </div >
    )
}