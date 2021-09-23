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
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/">search</NavLink>
          </li>
          <li>
            <NavLink to="/">your library</NavLink>
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
            <li><NavLink to="/">station1</NavLink></li>
            <li><NavLink to="/">station1</NavLink></li>
            <li><NavLink to="/">station1</NavLink></li>
            <li><NavLink to="/">station1</NavLink></li>
            <li><NavLink to="/">station1</NavLink></li>
            <li><NavLink to="/">station1</NavLink></li>
            <li><NavLink to="/">station1</NavLink></li>
            <li><NavLink to="/">station1</NavLink></li>
            <li><NavLink to="/">station1</NavLink></li>
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