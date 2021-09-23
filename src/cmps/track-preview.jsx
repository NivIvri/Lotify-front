export function TrackPreview({track,idx}){
    return (
        <tr className="song-container">
            <td>{idx+1}</td>
            <td><img src={track.imgUrl} alt="" />{track.title}</td>
            <td>{getTimeFromDuration(track.duration)}</td>
        </tr>
    )
}

function getTimeFromDuration(duration){
    let time='';
    for (var i=0;i<duration.length;i++){
        switch(duration[i]){
            case 'M':
                time+=':'
                case 'H':
            break;
            case 'S':
            case 'T':
            case 'P':
                break;
            default:
                time+=duration[i]
            }
    }
    return time;
}