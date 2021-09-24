import React from 'react'

import { TrackPreview } from './track-preview'

export function TrackList({ songs, playTrack, onAddToQueue }) {
    return (
        <div className='main-container-track'>
            {songs.map((track, idx) => {
                return <TrackPreview track={track} idx={idx} playTrack={playTrack} onAddToQueue={onAddToQueue} />
            })}
        </div>
    )
}
