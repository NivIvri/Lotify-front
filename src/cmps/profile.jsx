import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { eventBusService } from '../services/event-bus.service';
import { connect } from 'react-redux'
import { loadUser, onSignup, onLogin, onLogout } from '../store/user.actions';

class _UserPrifile extends Component {
    state = {
        loginOrSignup: null,
        isLoggedIn: false,
        credentials: {
            username: null,
            password: null,
        }
    }

    componentDidMount() {
        this.props.loadUser()
    }

    setLoginOrSignup = (loginOrSignup) => {
        this.setState({ loginOrSignup })
    }

    handleChange = ({ target }) => {
        const key = target.name
        const val = target.value
        this.setState(prevState => ({ ...prevState, credentials: { ...prevState.credentials, [key]: val } }))
    }

    onSubmit = () => {
        let credentials
        if (this.state.loginOrSignup === "Login") {
            credentials = { username: this.state.credentials.username, password: this.state.credentials.password }
            this.props.onLogin(credentials)
        } else {
            credentials = { ...this.state.credentials, userPref: this.props.user.userPref }
            console.log('cre',credentials);
            this.props.onSignup(credentials)
        }
        this.setLoginOrSignup(null)
    }


    render() {
        const { loginOrSignup, credentials } = this.state
        const { user } = this.props
        if (!user) return <></>
        return (
            <>
                <div className="profiler">
                    <Menu menuButton={
                        <MenuButton><h2 className="fa-user-alt fas fa-chevron-down-after">{user.fullname}</h2></MenuButton>}>
                        {user.username === "guest" &&
                            <MenuItem onClick={() => this.setLoginOrSignup("Login")}>Login</MenuItem>
                        }
                        {user.username === "guest" ?
                            <MenuItem onClick={() => this.setLoginOrSignup("Signup")}>Signup</MenuItem> :
                            <MenuItem onClick={async () => {
                               await this.props.onLogout()
                                this.props.loadUser()
                            }
                            }>Logout</MenuItem>
                        }
                    </Menu>
                </div>
                <div className={`create-playlist ${loginOrSignup ? "on" : "off"}`} >
                    <div className="header">
                        <h1>{loginOrSignup}</h1>
                        <button onClick={() => this.setLoginOrSignup(null)}>X</button>
                    </div>
                    <div className="body flex">
                        <form onSubmit={(ev) => ev.preventDefault()}>
                            <TextField
                                className="username"
                                label="Username"
                                value={credentials.username}
                                name="username"
                                autoComplete="off"
                                onChange={this.handleChange}
                            />
                            {loginOrSignup === "Signup" &&
                                <TextField
                                    className="fullname"
                                    label="Full Name"
                                    value={credentials.fullname}
                                    name="fullname"
                                    autoComplete="off"
                                    onChange={this.handleChange}
                                />}
                            <TextField
                                className="create-name"
                                label="Password"
                                ref='password'
                                hintText="Password"
                                floatingLabelText="Password"
                                type="password"
                                value={credentials.password}
                                name="password"
                                autoComplete="off"
                                onChange={this.handleChange}
                            />

                            <div className="buttons flex">
                                <Button style={{ height: "33px", background: '#1db954' }} variant="contained" onClick={this.onSubmit}>
                                    {loginOrSignup}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={`body-modal ${loginOrSignup ? "on" : "off"}`} onClick={() => this.setLoginOrSignup(null)}></div>
            </>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.userMoudle.user
    }
}
const mapDispatchToProps = {
    loadUser,
    onSignup,
    onLogin,
    onLogout
}


export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserPrifile)