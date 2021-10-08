import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MainLayout } from '../cmps/layout/MainLayout.jsx';

import { StationPreview } from '../cmps/station-preview.jsx';
import { LikedSongsPreview } from '../cmps/liked-songs-preview.jsx';
import { loadStations } from '../store/station.actions.js';

class _Stations extends Component {
  state = {
  }
  componentDidMount() {
    this.props.loadStations();
    document.body.style.backgroundImage = ' linear-gradient(#03080d, #121212)'

  }


  getLikedSongsStation = (stations) => {
    // console.log('stations from stations', stations);
    // debugger
    return stations.find(station => station.genre === 'likedTracks')
  }

  render() {
    let { stations } = this.props
    if (!stations) return <h1>loading...</h1>
    const likedSongsStation = this.getLikedSongsStation(stations)
    stations = stations.filter(station => station._id !== 'likedTracks')
    return (
      <div className="station-page">
        <div className="station-container">
          <MainLayout>
            <header className="stations-header">
              <h1>Playlists</h1>
            </header>
            <section className='card'>
              <div className="flex genre">
                <LikedSongsPreview station={likedSongsStation} />
                {stations.map(station => <StationPreview key={station._id} station={station} />)}
              </div>
            </section>
            {/* </div> */}
          </MainLayout >
        </div>

      </div>
    )


    return (
      <div className="stations-wrapper">
        <MainLayout>
          <header>
            <h1>Playlists</h1>
          </header>
          <section className='stationss-container card-grid'>

            {stations.map((station, idx) => {
              return idx === 0 ?
                <LikedSongsPreview key={station._id} station={station} /> :
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