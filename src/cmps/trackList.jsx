import React from 'react'

import { TrackPreview } from './track-preview'

export function TrackList({ songs, playTrack, onAddToQueue }) {
    return (<>
        {songs.map((track, idx) => <TrackPreview track={track} idx={idx} playTrack={playTrack} onAddToQueue={onAddToQueue} />)}
    </>
    )
}
