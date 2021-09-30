import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { DraggableTrackPreview } from './draggable-track-preview';
import { TrackPreviewCopy } from './track-preview-copy';
import { TrackPreview } from './track-preview';


{/* <TrackList songs={station.songs} currStation={station} loadStation={this.loadStation} /> */ }
// {songs.map((track, idx) => <TrackPreview track={track} idx={idx} currStation={currStation} loadStation={loadStation}/>)}



// getTimeFromDuration, onAddToStation, onRemoveFromStation, playTrack,
//     loadStations, addToNextQueue, track, idx, currStation, stations }
export const DraggableTrackList = SortableContainer(({ songs, currStation, loadStation
  // getTimeFromDuration, onAddToStation, onRemoveFromStation, playTrack,
  // loadStations, addToNextQueue, stations
}) => {
  return (
    <div className="station-track-list flex column">
      <div className="list-headers flex">
        <div className="track-num-header">#</div>
        <div className="track-img-header"></div>
        <div className="track-title-header">Title</div>
        <div className="duration-header">◷</div>
        <div className="likes-header">likes</div>
        <div className="actions-header">actions</div>
      </div>
      {

        songs.map((track, idx) => {

          return <DraggableTrackPreview key={track.id} index={idx} track={track} idx={idx}
            currStation={currStation} loadStation={loadStation} />
        })

      }

    </div>
  )
});
// songs.map((track, idx) => <TrackPreviewCopy key={track.id} index={idx} track={track} idx={idx} currStation={currStation} loadStation={loadStation} getTimeFromDuration={getTimeFromDuration} onAddToStation={onAddToStation}
//   onRemoveFromStation={onRemoveFromStation} playTrack={playTrack}
//   loadStations={loadStations} addToNextQueue={addToNextQueue} stations={stations} />)