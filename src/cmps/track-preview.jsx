import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { stationService } from '../services/async-storage.service';



export function TrackPreview({ track, idx, playTrack, onAddToNextQueue,stations,currStation,onAddToStation }) {
    console.log(currStation);
    return (
        <tr className="song-container" onClick={() => playTrack(track, idx)}>
            <td className='song-num'>{idx + 1}</td>
            <td><img src={track.imgUrl} alt="" /></td>
            <td>{track.title}</td>
            <td>{getTimeFromDuration(track.duration)}</td>
            <td className="button-cell" onClick={(ev) => { ev.stopPropagation() }}>
                <Menu menuButton={<MenuButton><i className="fas fa-ellipsis-h"></i></MenuButton>}>
                    <MenuItem onClick={() => onAddToNextQueue(track)}>Add To queue</MenuItem>
                    <MenuItem onClick={() => onAddToStation(track,currStation._id,true)}>Remove from station</MenuItem>
                    {/*<SubMenu label="Add to playlist">
                        {stations.map((station)=>{
                        return (<MenuItem onClick={()=>{onAddToStation(track,station._id)}}>{station.name}</MenuItem>)})
                        }
                    </SubMenu>*/}
                </Menu>
            </td>
        </tr>
    )
}


function getTimeFromDuration(duration) {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;

    duration = duration.replace('PT', '');
    if (duration.indexOf('H') > -1) {
        var hours_split = duration.split('H');
        hours = parseInt(hours_split[0]);
        duration = hours_split[1];
    }
    if (duration.indexOf('M') > -1) {
        var minutes_split = duration.split('M');
        minutes = parseInt(minutes_split[0]);
        duration = minutes_split[1];
    }
    if (duration.indexOf('S') > -1) {
        var seconds_split = duration.split('S');
        seconds = parseInt(seconds_split[0]);
    }
    var str = "";
    if (hours != 0) { str += hours + ":"; }
    if (minutes == 0) { str += "00" + ":"; }
    else if (minutes < 10) { str += "0" + minutes + ":"; }
    else if (minutes > 10) { str += minutes + ":"; }
    else if (minutes == 0) { str += "00:" }
    if (seconds > 0 && seconds < 10) { str += "0" + seconds; }
    else if (seconds < 10) { str += "0" + seconds; }
    else if (seconds > 10) { str += seconds; }
    else if (seconds == 0) { str += "00" }

    return str;
}