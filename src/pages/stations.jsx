import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MainLayout } from '../cmps/layout/MainLayout.jsx';

import { StationPreview } from '../cmps/station-preview.jsx';
import { LikedSongs } from '../cmps/liked-songs-preview.jsx';
import { loadStations } from '../store/station.actions.js';

class _Stations extends Component {
  state = {
  }
  componentDidMount() {
    this.props.loadStations();
    document.body.style.backgroundImage = ' linear-gradient(#03080d, #121212)'

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
      //<div className="stations-container">
      //<div className="main-container">
      <div className="stations-wrapper">
        <MainLayout>
          <header>
            <h1>Playlists</h1>
          </header>
          <section className='stationss-container card-grid'>

            {stations.map((station, idx) => {
              return idx === 0 ?
                <LikedSongs key={station._id} station={station} /> :
                <StationPreview key={station._id} station={station} />

            })
            }
          </section>
          {/* </div> */}
        </MainLayout >
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