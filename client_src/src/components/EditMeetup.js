import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class EditMeetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      city: '',
      address: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    this.getMeetupDetails();
  }

  getMeetupDetails() {
    let meetupId = this.props.match.params.id;
    axios.get(`https://young-springs-94270.herokuapp.com/api/meetups/${meetupId}`)
      .then(respone => {
        this.setState({
          id: respone.data.id,
          name: respone.data.name,
          city: respone.data.city,
          address: respone.data.address,
        }, () => {
          console.log(this.state);
        })
      }).catch(err => console.log(err));
  }

  editMeetup(newMeetup) {
    axios.request({
      method:'put',
      url:`https://young-springs-94270.herokuapp.com/api/meetups/${this.state.id}`,
      data: newMeetup
    }).then(respone => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  onSubmit(e){
    const newMeetup ={
      name: this.refs.name.value,
      city: this.refs.city.value,
      address: this.refs.address.value,
    }
    this.editMeetup(newMeetup);
    e.preventDefault();
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return(
      <div>
        <br />
        <Link className="btn grey" to="/">Back</Link>
        <h1>Edit Meetup</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-field">
            <input type="text" name="name" ref="name" value={this.state.name} onChange={this.handleInputChange} />
            <label htmlFor="name">Name</label>
          </div>
          <div className="input-field">
            <input type="text" name="city" ref="city" value={this.state.city} onChange={this.handleInputChange} />
            <label htmlFor="city">City</label>
          </div>
          <div className="input-field">
            <input type="text" name="address" ref="address" value={this.state.address} onChange={this.handleInputChange} />
            <label htmlFor="address">Address</label>
          </div>
          <input type="submit" value="save" className="btn" />
        </form>
      </div>
    )
  }
}

export default EditMeetup;
