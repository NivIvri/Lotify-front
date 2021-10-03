import React, { Component } from 'react';
import createStationImg from '../assets/img/create-station.jpg'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CreatableSelect from 'react-select/creatable';
import { eventBusService } from '../services/event-bus.service';
// import { ActionMeta, OnChangeValue } from 'react-select';
import { connect } from 'react-redux'
import { addStation } from '../store/station.actions.js';

class _CreateStation extends Component {
    state = {
        station: {
            name: "",
            tags: [],
        },
        isCreate: false
    }

    labelOptions = [
        { value: "happy", label: "happy" },
        { value: "pop", label: "Pop" },
        { value: "sad", label: "Sad" },
        { value: "alternative", label: "Alternative" },
        { value: "Rock", label: "Rock" },
        { value: "rap", label: "Rap" },]

    componentDidMount() {
        eventBusService.on("create-playlist", this.create)
    }

    create = () => {
        this.setState({ isCreate: !this.state.isCreate })
    }

    handleChange = ({ target }) => {
        if (Array.isArray(target)) {
            let tags = target.map(option => option.value)
            this.setState(prevState => ({ ...prevState, station: { ...prevState.station, tags } }))
            return
        }
        const key = target.name
        const val = target.value
        this.setState(prevState => ({ ...prevState, station: { ...prevState.station, [key]: val } }),
            console.log(this.state))
    }


    onAddStation = (ev) => {
        ev.preventDefault()
        const newStation = {
            name: this.state.station.name,
            tags: this.state.station.tags,
            likedByUsers: [],
            songs: [
            ]
        }
        this.props.addStation(newStation)
        this.create()
    }


    render() {
        const { isCreate, station } = this.state
        return (
            <>
                <div className={`create-playlist ${isCreate ? "on" : "off"}`} onSubmit={(ev) => { this.onAddStation(ev) }}>
                    <div className="header">
                        <h1>Create station</h1>
                        <button onClick={this.create}>X</button>
                    </div>
                    <div className="body flex">
                        <form onSubmit={(ev) => ev.preventDefault()}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Station's name"
                                value={station.name}
                                onChange={this.handleChange}
                                autoComplete="off"
                            />

                            <CreatableSelect
                                onChange={(e) => this.handleChange({ 'target': e })}
                                name='label'
                                className="select"
                                closeMenuOnSelect={false}
                                options={this.labelOptions}
                                isMulti
                                placeholder="Tags..."
                            />
                            <Button variant="contained" endIcon={<SendIcon />}>
                                Send
                            </Button>
                            {/* <button type='submit'>Create</button> */}
                        </form>
                    </div>
                </div>
                <div className={`body-modal ${isCreate ? "on" : "off"}`} onClick={this.create}></div>
            </>
        );
    }
}


function mapStateToProps(state) {
    return {
    }
}
const mapDispatchToProps = {
    addStation
}


export const CreateStation = connect(mapStateToProps, mapDispatchToProps)(_CreateStation)



//{
//    "_id": "5c08",
//    "name": "arctic monkeys",
//    "tags": ["Funk", "Happy"],
//    "createdAt": 1541652422,
//    "createdBy": {
//        "_id": "u101",
//        "fullname": "app",
//        "imgUrl": "http://some-photo/"
//    },
//    "likedByUsers": [],
//    "songs": [
//        {
//            "id": "bpOSxM0rNPM",
//            "title": "Arctic Monkeys - Do I Wanna Know?",
//            "imgUrl": "https://i.ytimg.com/vi/bpOSxM0rNPM/hqdefault.jpg",
//            "duration": "PT4M26S"
//        },
//        {
//            "id": "6366dxFf-Os",
//            "title": "Arctic Monkeys - Why`d You Only Call Me When You`re High?",
//            "imgUrl": "https://i.ytimg.com/vi/6366dxFf-Os/hqdefault.jpg",
//            "duration": "PT4M49S"
//        },
//        {
//            "id": "VQH8ZTgna3Q",
//            "title": "Arctic Monkeys - R U Mine?",
//            "imgUrl": "https://i.ytimg.com/vi/VQH8ZTgna3Q/hqdefault.jpg",
//            "duration": "PT3M44S"
//        },
//        {
//            "id": "ma9I9VBKPiw",
//            "title": "Arctic Monkeys - Fluorescent Adolescent",
//            "imgUrl": "https://i.ytimg.com/vi/ma9I9VBKPiw/hqdefault.jpg",
//            "duration": "PT3M16S"
//        }
//    ]
//}