import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export function TrackPreview({ track, idx, playTrack,onAddToNextQueue}) {
    return (
        <tr className="song-container"  onClick={() => playTrack(track,idx)}>
            <td className='song-num'>{idx + 1}</td>
            <td><img src={track.imgUrl} alt="" /></td>
            <td>{track.title}</td>
            <td>{getTimeFromDuration(track.duration)}</td>
            <td onClick={(ev) => { ev.stopPropagation() }}>
                <Menu menuButton={<MenuButton><i className="fas fa-ellipsis-h"></i></MenuButton>}>
                    <MenuItem onClick={()=>onAddToNextQueue(track)}>Add To queue</MenuItem>
                </Menu>
            </td>
        </tr>
    )
}


function getTimeFromDuration(duration) {
    let time = '';
    for (var i = 0; i < duration.length; i++) {
        switch (duration[i]) {
            case 'M':
            case 'H':
                time += ':'
                break;
            case 'S':
            case 'T':
            case 'P':
                break;
            default:
                time += duration[i]
        }
    }
    return time;
}