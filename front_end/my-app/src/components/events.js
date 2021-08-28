import React from 'react';

class Events extends React.Component {
    constructor(props) {
        super(props)
        this.state = {events: []}
    }

    componentDidMount() {
        fetch('http://localhost:3001/events')
        .then(res => res.json())
        .then(data => {
        this.setState({
            events: data
        })
        })
    }

    render () {
        return <div class="EventsList">
        {this.state.events.map(event => {
            return (<div class="Event">
            <h5>{event.title}</h5>
            <h6>Location: {event.location}</h6>
            <p>Maximum Capacity: {event.maximumCapacity}</p>
            <p>Start Date: {event.startDate}</p>
            <p>End Date: {event.endDate}</p>
            <div class="EventDescription">
                <div><h6>Description:</h6></div>
                <div><p>{event.description}</p></div>
            </div>
            </div>)
        })}
        </div>
    }

}

export default Events
