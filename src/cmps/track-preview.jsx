export function TrackPreview({ track, idx, playTrack }) {
    return (
        <tr className="song-container" onClick={() => playTrack(track,idx)}>
            <td>{idx + 1}</td>
            <td><img src={track.imgUrl} alt="" />{track.title}</td>
            <td>{getTimeFromDuration(track.duration)}</td>
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