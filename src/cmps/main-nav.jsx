import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
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
        name: "Your Library",
        to: "/stations",
        fa: 'fa-library'
      },
      //{
      //  id: 4,
      //  name: "Create Playlist",
      //  to: "/createStation",
      //  fa: 'fa-plus-square'
      //}

    ],
    activLink: 1
  }


  handleClick = (linkId) => {
    this.setState({ activLink: linkId })
  }

  render() {
    const { stations } = this.props
    const { activLink, links } = this.state
    if (!links) {
      console.log('not links');
      return <div>loading.</div>
    }
    return (
      <>
        <nav className="main-nav">
          <div className="banner">Lotify</div>
          <ul className="primary-nav">
            {links.map(link => {
              return <li key={link.id} onClick={() => this.handleClick(link.id)} className={link.id === activLink ? 'active' : ''}>
                <span className={`nav-icon fas ${link.fa}`}></span>
                <NavLink to={link.to}>{link.name}</NavLink>
              </li>
            })}




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
                  return <li key={station._id}><NavLink to={`/station/${station._id}`}>{station.name}</NavLink></li>
                })
              }
              <li><NavLink to="/">station1</NavLink></li>
              <li><NavLink to="/">station1</NavLink></li>
              <li><NavLink to="/">station1</NavLink></li>
              <li><NavLink to="/">station1</NavLink></li>

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