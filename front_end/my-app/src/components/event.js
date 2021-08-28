import React from 'react';

class Event extends React.Component {
    constructor(props) {
      super(props);
      this.state = {event: {}};
    }
  
    componentDidMount() {
      fetch('http://localhost:3001/events')
      .then(res => res.json())
      .then(data => {
        this.setState({
          event: data[0]
        })
      })
    }
  
    render () {
      return <div>
        <h5>{this.state.event.title}</h5>
        <h6>{this.state.event.location}</h6>
        <p>Maximum Capacity: {this.state.event.maximumCapacity}</p>
        <p>Start Date: {this.state.event.startDate}</p>
        <p>End Date: {this.state.event.endDate}</p>
        <div>Description:
          <p>
            {this.state.event.description}
          </p>
        </div>
      </div>
    }
}

export default Event