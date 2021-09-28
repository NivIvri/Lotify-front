import React, { Component } from 'react';
import createStationImg from '../assets/img/create-station.jpg'

import CreatableSelect from 'react-select/creatable';
import { eventBusService } from '../services/event-bus.service';
// import { ActionMeta, OnChangeValue } from 'react-select';

export class CreateStation extends Component {
    state = {
        station: {
            name: "",
            tags: [],
        },
        isCreate: false
    }

    componentDidMount() {
        // const { stationId } = this.props.match.params
        // console.log(this.props.match)
        eventBusService.on("create-playlist", this.create)
    }

    create = () => {
        // console.log('banana');
        this.setState({ isCreate: !this.state.isCreate })
    }

    handleChange = ({ target }) => {
        const key = target.name
        const val = target.value
        this.setState(prevState => ({ ...prevState, station: { ...prevState.station, [key]: val } }))
    }

    handleSelectChange = (val) => {
        // console.log(val);
        this.setState(prevState => ({ ...prevState, station: { ...prevState.station, tags: val.value } }))
    }
    // handleInputChange = (inputValue: any, actionMeta: any) => {
    //     console.group('Input Changed');
    //     console.log(inputValue);
    //     console.log(`action: ${actionMeta.action}`);
    //     console.groupEnd();
    // };

    render() {
        const { isCreate, station } = this.state
        return (
            <div className={`create-playlist ${isCreate ? "on" : "off"}`} onSubmit={this.onAddStation}>
                <div className="header">
                    <h1>Create station</h1>
                    <button onClick={this.create}>X</button>
                </div>
                <div className="body flex">
                    <img src={createStationImg} alt="" />
                    <form onSubmit={(ev) => ev.preventDefault()}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Station's name"
                            value={station.name}
                            onChange={this.handleChange}
                        />
                        <CreatableSelect
                            className="select"
                            isClearable
                            isMulti
                            onChange={this.handleSelectChange}
                            onInputChange={this.handleInputChange}
                            options={[{ value: "happy", label: "happy" }, { value: "pop", label: "Pop" }, { value: "sad", label: "Sad" }, { value: "alternative", label: "Alternative" }, { value: "Rock", label: "Rock" }, { value: "rap", label: "Rap" },]}
                            placeholder="Tags..."
                        />
                <button>Create</button>
                    </form>
                </div>

            </div>
        );
    }
}