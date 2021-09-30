import { TrackPreview } from "./track-preview";
import { SortableElement } from 'react-sortable-hoc';

{/* <TrackPreview track={track} idx={idx} currStation={currStation} loadStation={loadStation}/>)} */ }

export const DraggableTrackPreview = SortableElement(({ track, idx, currStation, loadStation }) => {
  return (
    <TrackPreview track={track} idx={idx} currStation={currStation} loadStation={loadStation} />
  )
});