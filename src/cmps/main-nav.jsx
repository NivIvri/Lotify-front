import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import logoImg from '../assets/img/logo.jpg'
import logo from '../assets/img/gramophone-svgrepo-com.svg'
//import logo from '../assets/img/gramophone.png'
import { eventBusService } from '../services/event-bus.service'
class _MainNav extends React.Component {
  state = {
    links: [
      {
        id: 1,
        name: "Home",
        to: "/",
        fa: 'fa-home'
      },
      {
        id: 2,
        name: "Search",
        to: "/search",
        fa: 'fa-search'
      },
      {
        id: 3,
        name: "My Stations",
        to: "/stations",
        fa: 'fa-library'
      }

    ],
    activLink: 1,
    selectedStationId: null

  }


  handleClick = (linkId) => {
    this.setState({ activLink: linkId })
  }

  setSelectedStationId = (stationId) => {
    this.setState(prevState => ({ ...prevState, selectedStationId: stationId }))
  }

  render() {
    const { stations } = this.props
    const { activLink, links, selectedStationId } = this.state
    if (!links) {
      console.log('not links');
      return <div>loading.</div>
    }
    return (
      <>
        <nav className="main-nav">
          <Link to='/home'>
            <div className="banner">
              {/* src\assets\img */}
              <div className="logo-img-container">
                <img src={logo} alt="" />
              </div>
              <h4>Lotify
              <span>.</span>
              </h4>
            </div>
          </Link>
          <ul className="primary-nav">
            {links.map(link => {
              return <li key={link.id} onClick={() => this.handleClick(link.id)} className={link.id === activLink ? 'active' : ''}>
                <span className={`nav-icon fas ${link.fa}`}></span>
                <NavLink to={link.to}>{link.name}</NavLink>
              </li>
            })}
            <li onClick={() => { eventBusService.emit("create-playlist") }} className="nav-create">
              <span className="nav-icon fas fa-plus-square"></span>
              <a>Create Playlist</a>
            </li>



            {/* <li key="0" onClick={(e) => this.setState({ activeIdx: e.key })} className={this.key === activeIdx ? 'active' : ''}>
            <span className="fas fa-home nav-icon"></span>
            <NavLink to="/">Home</NavLink>
          </li>
          <li key="1">
            <span className="fas fa-search nav-icon"></span>
            <NavLink to="/">Search</NavLink>
          </li>
          <li key="2">
            <span className="fas fa-library nav-icon"></span>
            <NavLink to="/stations">Your library</NavLink>
          </li> */}
          </ul>
          <div className="stations-wrapper">
            <ul className="stations">
              {
                stations.map(station => {
                  return <li key={station._id} onClick={() => this.setSelectedStationId(station._id)}><NavLink to={`/station/${station._id}`}
                    className={selectedStationId === station._id ? 'selected-station' : ''}>{station.name}</NavLink></li>
                })
              }

            </ul>
          </div>
        </nav>
        <div className="offset-main"></div>
      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    stations: state.stationMoudle.stations
  }
}
export const MainNav = connect(mapStateToProps)(_MainNav)