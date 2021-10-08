import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';
import logo from '../assets/img/gramophone-svgrepo-com.svg'

export class LoginSignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // credentials: {
      username: '',
      password: '',
      fullname: ''
      // facebookUserId: null,
      // img: null
      // }
    }
  }

  responseFacebook = async response => {

    try {

      const newCredentials = {
        username: response.email,
        password: response.userID,
        fullname: response.name,
        facebookUserId: response.userID,
        img: response.picture.data.url
      }
      this.props.onSubmit(newCredentials)
    }
    catch (e) {
      console.log('err:', e);
    }
  }

  handleChange = ({ target }) => {
    console.log('here');
    this.setState(ps => ({ ...ps, [target.name]: target.value }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const credentials = this.state
    this.props.onSubmit(credentials)
  }

  resetCredentials = () => {
    this.setState({ username: '', fullname: '', password: '', facebookUserId: null, img: null })
  }
  handleClose = (e) => {
    this.resetCredentials()
    this.props.closeForm()
  }
  render() {
    const { username, fullname, password } = this.state
    return (
      <section className="form-wrapper">
        <span className="close-form" onClick={this.handleClose}>X</span>
        <div className="form-logo">
          <img src={logo} alt="" />
        </div>
        <h2 className="form-header">{this.props.isLogin ? 'Sign in to continue' : 'Signup to continue'}</h2>
        <form action="" className="login-signup-form flex column" onSubmit={this.handleSubmit}>
          <input type="text" name="username" placeholder="Enter your username" value={username}
            onChange={this.handleChange} />

          {!this.props.isLogin && <input type="text" name="fullname" placeholder="Enter your FullName"
            value={fullname} onChange={this.handleChange} />}

          <input type="password" name="password" placeholder="Enter your password" value={password}
            onChange={this.handleChange} />

          <button type="submit" className="login-signup-btn">{this.props.isLogin ? 'Login' : 'Signup'}</button>
          <button className="facebook-login-btn-wrapper" type="button">
            {this.props.isLogin ? 'Or Login with Facebook' : 'Or Signup with Facebook'}

            <FacebookLogin
              className="facebook-login-btn"
              appId="992060094973798"
              autoLoad={true}
              fields="name,email,picture"
              onClick={this.facebookComponentClicked}
              callback={this.responseFacebook} />
          </button>
        </form>
      </section>

    )
  }
}