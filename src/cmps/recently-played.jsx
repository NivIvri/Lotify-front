import { Link } from 'react-router-dom';
import stationImg from '../assets/img/stationImg.jpg';

export function RecentlyPlayed({ stations }) {
    return (
        <div className="recently-played">
            {stations.map(station => {
                return (<Link to={`/station/${station._id}`} className="station-container">
                    {/* // <div className="station-container"> */}
                    {station.songs.length > 0 &&
                        <img src={`${station.songs[0].imgUrl}`} />
                    }
                    {!station.songs.length &&
                        <img src={stationImg} />
                    }                    <h3>{station.name}</h3>
                    {/* // </div> */}
                </Link >
                )
            })}
        </div >
    )
}