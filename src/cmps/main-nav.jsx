import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import logoImg from '../assets/img/logo.jpg'
import logo from '../assets/img/gramophone-svgrepo-com.svg'
// '../icons/liked.svg'
import { eventBusService } from '../services/event-bus.service'
import { socketService } from '../services/socket.service'
class _MainNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
        },
        {
          id: 4,
          name: "Liked Songs",
          to: "/station/likedTracks",
          fa: 'fa-heart'
        },
        {
          id: 5,
          name: "Friends",
          to: "/friends",
          fa: 'fa-user-friends'
        }
      ],
      activLink: 1,
      selectedStationId: null,
      isMenuOpen: false

    }

    // Methods Binding:
    // this.toggleMenu = this.toggleMenu.bind(this)

  }
  componentDidMount() {

  }

  handleClick = async (linkId) => {
    await this.toggleMenu(!this.state.isMenuOpen)
    this.setState({ activLink: linkId })
  }

  setSelectedStationId = (stationId) => {
    this.setState(prevState => ({ ...prevState, selectedStationId: stationId }))
  }

  toggleMenu = async (newIsMenuOpen) => {
    // console.log('newIsMenuOpen', newIsMenuOpen);
    this.setState({ isMenuOpen: newIsMenuOpen })
  }

  render() {
    const { stations } = this.props
    const { activLink, links, selectedStationId, isMenuOpen } = this.state
    if (!links) {
      return <div>loading.</div>
    }
    return (
      <>
        <div className="hamburger-wrapper">
          <div className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={this.toggleMenu.bind(this, !isMenuOpen)}>
            <div></div>
          </div>

        </div>

        <nav className={isMenuOpen ? 'main-nav active' : 'main-nav'}>
          {/* <div className="humb" onClick={() => this.toggleMenu()}>
            <div className="humb-strip"></div>
            <div className="humb-strip"></div>
            <div className="humb-strip"></div>
          </div> */}

          <Link to='/Home'>
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

                <NavLink to={link.to}>
                  <span className={`nav-icon fas ${link.fa}`}></span>
                  {link.name}</NavLink>
              </li>
            })}
            <li onClick={() => { eventBusService.emit("create-playlist") }} className="nav-create">
              <a>
                <span className="nav-icon fas fa-plus-square"></span>
                Create Playlist
              </a>
            </li>
            {/*<li>
              <NavLink to={'/station/likedTracks'}>
                {/* <span>
                  <img src={likedSongsSvg} alt="" className="liked-songs-svg" />
                </span> */}
            {/*<span className={`nav-icon fas fa-heart`}></span>
                Liked Songs</NavLink>

            </li>*/}
            {/*<li>
              <NavLink to={'/friends'}>
                {/* <span>
                  <img src={likedSongsSvg} alt="" className="liked-songs-svg" />
                </span> */}
            {/*<span className={`nav-icon fas fa-user-friends`}></span>
                Friends</NavLink>

            </li>*/}
          </ul>
          <ul className="stations">
            {
              stations.map(station => {
                return <li key={station._id} onClick={() => this.setSelectedStationId(station._id)}>
                  <NavLink to={`/station/${station._id}`}
                    className={selectedStationId === station._id ? 'station-link selected-station' : 'station-link'}>
                    {station.name}
                    {/* {station.name.length < 28 ? station.name : station.name.slice(0, 28) + '...'} */}
                  </NavLink></li>
              })
            }

          </ul>
        </nav>
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