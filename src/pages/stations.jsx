import React, { Component } from 'react'
import { connect } from 'react-redux'

import { StationPreview } from '../cmps/station-preview.jsx';
import { loadStations } from '../store/station.actions.js';

class _Stations extends Component {
  state = {
  }
  componentDidMount() {
    this.props.loadStations();
  }


  /**
   * 
   *  <div className="stations-container">
   *    <section className='stationss-container card-grid'>
   *  </section>
   * </div>
   * 
   */

  render() {
    const { stations } = this.props
    if (!stations) return <h1>loading...</h1>
    return (
      <div className="stations-container">

        <header>
          <h1>Playlists</h1>
        </header>
        <section className='stationss-container card-grid'>
          {stations.map((station => <StationPreview key={station._id} station={station} />))}
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    stations: state.stationMoudle.stations
  }
}
const mapDispatchToProps = {
  loadStations,
}


export const Stations = connect(mapStateToProps, mapDispatchToProps)(_Stations)