import React from 'react'

import { TrackPreview } from './track-preview'

export function TrackList({ songs, currStation, loadStation }) {
    return (<>
        {songs.map((track, idx) => {
            return <TrackPreview  key={track._id} track={track} idx={idx} currStation={currStation} loadStation={loadStation} />
        }
        )}
    </>
    )
}
