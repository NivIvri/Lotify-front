import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
class _MainNav extends React.Component {
  state = {

  }




  render() {
    return (
      <nav className="main-nav">
        <div className="banner">Lotify</div>
        <ul>
          <li className="active">
            <span className="fas fa-home nav-icon"></span>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <span className="fas fa-search nav-icon"></span>
            <NavLink to="/">Search</NavLink>
          </li>
          <li>
            <span className="fas fa-library nav-icon"></span>
            <NavLink to="/">Your library</NavLink>
          </li>
        </ul>
        <div className="stations-wrapper">
          <ul className="stations">
            <li><NavLink to="/">station1</NavLink></li>
            <li><NavLink to="/">station1</NavLink></li>
            <li><NavLink to="/">station1</NavLink></li>
            <li><NavLink to="/">station1</NavLink></li>
            <li><NavLink to="/">station1</NavLink></li>
            <li><NavLink to="/">station1</NavLink></li>
            <li><NavLink to="/">station1</NavLink></li>

          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {

  }
}
export const MainNav = connect(mapStateToProps)(_MainNav)