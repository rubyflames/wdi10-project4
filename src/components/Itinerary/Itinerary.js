import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {Button, Row, Col}
from 'react-bootstrap';

import firstDummyData from '../../data/data';
import {dummyData} from './dummyData';
import './Itinerary.css';

import {removeTrips} from '../../actions/userSelectedTripsAction'

import {mjo} from './massiveJSONobj';

class Itinerary extends Component {
    constructor(props){
      super(props);
      let data = localStorage.getItem('user-trip-selection')
      // console.log(JSON.parse(data));
      data = JSON.parse(data);
      this.state = {
          data
      };
    }

    componentWillUnmount(){
      // debugger;
    }

    cancel = () => {
      // cancel store data
      this.props.cancelTrips();
      this.props.history.goBack();
    }

    confirmTripsClick = () => {
      const svrPath = 'users/1';
      axios.post(svrPath,mjo).
      then(res=>{
        if (res.data) {
          console.log(`server post to ${svrPath} responded with data: `, res.data);
        }else {
          console.log(`server post to ${svrPath} responded: `, res);
        }
      }).
      catch(err=>{
        if (err.response) {
          console.error(`server post to ${svrPath} error. responded with: `, err.response);
        }else {
          console.error(`server post to ${svrPath} error: `, err.response);
        }
      });
    }

    dataRow = (loc) => (
      <tr key={loc.id}>
        <td>{loc.name.trim()}</td>
        <td>$ {loc.price_pax}</td>
        <td>{loc.pax}</td>
        <td>$ {loc.price_pax * loc.pax}</td>
      </tr>
      );

    render() {
      const {user_trips} = this.props;
      return(
        <div className="itinerary">
          <table className="table table-hover table-bordered table-responsive">
            <thead>
              <tr>
                <td>Name</td>
                <td>Price</td>
                <td>Pax</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {
                user_trips?
                user_trips.map(loc =>
                   this.dataRow(loc)):""
              }
            </tbody>
          </table>
          <span>
            <Button bsStyle="default" bsSize="large" onClick={this.cancel}>Cancel</Button>
            <Button bsStyle="success" bsSize="large" onClick={this.confirmTripsClick}>Confirm</Button>
          </span>
      </div>)
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cancelTrips: () => {
      dispatch(removeTrips())
    }
  }
}

const mapStateToProps = (state)=>{
  return {
    user_trips: state.user_trips
  }
}

Itinerary = connect(mapStateToProps, mapDispatchToProps)(Itinerary);
export default withRouter(Itinerary);
