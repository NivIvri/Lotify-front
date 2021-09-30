import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { DraggableTrackPreview } from './draggable-track-preview';



{/* <TrackList songs={station.songs} currStation={station} loadStation={this.loadStation} /> */ }
// {songs.map((track, idx) => <TrackPreview track={track} idx={idx} currStation={currStation} loadStation={loadStation}/>)}
export const DraggableTrackList = SortableContainer(({ songs, currStation, loadStation }) => {
  return (
    <div>
      {
        songs.map((track, idx) => <DraggableTrackPreview key={track.id} index={idx} track={track} idx={idx} currStation={currStation} loadStation={loadStation} />)
      }
    </div>
  )
});