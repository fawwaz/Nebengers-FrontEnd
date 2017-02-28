import React, { Component } from 'react';  
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Pagination from 'react-js-pagination';
import * as actions from '../actions';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.props.protectedTest();
  }

  handleLogout(e) {
    this.props.logoutUser();
  }

  componentWillMount() {
    this.props.getAvailableRides();
  }

  renderContent() {
    if(this.props.content) {
      return (
        <div>
          <p>{this.props.content}</p>
          <p>Halaman yang sedang aktif : {this.props.params.ride_id} </p>
          <br />
          <a href="#" onClick={this.handleLogout.bind(this)}>Logout</a>
        </div>
      );
    }
  }

  handlePageChange(pageNumber){
    this.props.getAvailableRides(pageNumber);
  }

  renderRides(){
    if(this.props.rides) {
      console.log(this.props.rides);
      const listitem  = this.props.rides.result.data.map( (ride) => {
        return(
          <div className="media">
            <div className="media-left">
              <img className="media-object" src={ride.user.profile_image_small || 'http://placehold.it/128x128'} alt="gambar"/>
              <p>{ride.user.name}</p>
            </div>
            <div className="media-body">
              <h4><Moment tz="Indonesia/Jakarta" locale="id" format="ddd, DD MMM YYYY HH:mm">{ride.departure_datetime}</Moment></h4>
              <p>From : {ride.from_location_name}</p>
              <p>To : {ride.to_location_name}</p>
              Price : <p className="label label-primary">{ride.price/1000} rb</p> Category : <p className="label label-info">{ride.user_vehicle.category}</p>
              <h5>{ride.passenger_number}/{ride.number_of_seat} seat Available </h5>
                <p><Link to={`dashboard/${ride.id}`}>Check details.. </Link></p>
            </div>
          </div>
        );
      });
      return(
        <div>
          {listitem}
        </div>
      );
    }
  }

  renderPagination(){
    if(this.props.rides){
      console.log('renderpagination');
      console.log(this.props.rides);
      console.log('ini isinya toh ' +this.props.rides.current_page + this.props.rides.per_page +  this.props.rides.total);
      return(
        <div>
          <Pagination
            activePage={this.props.rides.result.current_page}
            itemsCountPerPage={this.props.rides.result.per_page}
            totalItemsCount={this.props.rides.result.total}
            onChange={::this.handlePageChange}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="col-md-8 col-md-offset-2">
        <div className="panel panel-default">
          <div className="panel-heading">
            Available Tebengan ..
            <button className="btn btn-danger pull-right" onClick={this.handleLogout.bind(this)}>Log out !</button>
          </div>
          <div className="panel-body">
            {this.renderRides()}
            {this.renderPagination()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {  
  return { 
    content: state.auth.content,
    rides: state.rides.content
  };
}

export default connect(mapStateToProps, actions)(Dashboard); 