import React from 'react'

import { TrackPreview } from './track-preview'

export function TrackList({ songs, playTrack, onAddToNextQueue, stations, currStation,onAddToStation }) {
    return (<>
        {songs.map((track, idx) => <TrackPreview track={track} idx={idx} playTrack={playTrack} onAddToNextQueue={onAddToNextQueue} stations={stations} onAddToStation={onAddToStation} currStation={currStation} />)}
    </>
    )
}
