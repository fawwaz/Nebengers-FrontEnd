import React, { Component } from 'react';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Ride extends Component{
	
	componentWillMount(){
		var ride_id = this.props.params.ride_id;
		this.props.getDetailedRide(ride_id);
		this.props.getUserRideRequest(ride_id);
	}

	renderDetail(){
		if(this.props.ride_detail){
			const display_only = ['from_location_name','to_location_name','price','departure_datetime','additional_notes']
			var ride_detail = this.props.ride_detail.result;
			const detailed_item = Object.keys(ride_detail).map((key) =>{
				let value = ride_detail[key];
				// <tr>
				// 	<td>{String(key.replace(/_/g,' '))}</td>
				// 	<td>{value}</td>
				// </tr>

				// <p> <b>{String(key.replace(/_/g,' '))}</b> : {value} </p>
				if(!(value instanceof Object) && (display_only.indexOf(key) > -1)){
					return(
						<p> <b>{String(key.replace(/_/g,' '))}</b> : {value} </p>						
					)
				}
			});



			return(
				<div>
					{detailed_item}
				</div>
			);
		}
	}

	renderUserRideRequest(){
		if(this.props.userride_request){
			console.log('userride_request is : ... ');
		}
	}

	renderButtonRequest() {
		if(this.props.userride_request){
			var userride_request 	= this.props.userride_request;
			console.log('printing user_id from renderbuttonrequest');
			console.log(cookie.load('user_id'));
			var current_user_id		= cookie.load('user_id'); 
				
			// find if we are already requested
			var requested 			= false;
			userride_request.result.data.forEach(function(riderequest){
				if(riderequest.user_id == current_user_id){
					requested 		= true;
				}
			});

			if(requested){
				return (
					<button className="btn btn-warning">
						<h2>Menunggu Persetujuan.</h2>
					</button>
				);
			}else{
				return(
					<button className="btn btn-success" onClick={this.handleRideRequest.bind(this)}>
						<h2>Minta tebengan</h2>
					</button>
				);
			}
		}
	}

	renderPhoto() {
		if(this.props.ride_detail){
			return(
				<img src={this.props.ride_detail.result.user.profile_image_small} className="hidden-xs hidden-sm"/>
			);
		}
	}

	handleRideRequest(){
		//console.log('handling ride request here');
		var ride_id = this.props.params.ride_id;
		this.props.createRideRequest(ride_id);
	}

	render() {
		return(
			<div className="col-md-8 col-md-offset-2">
				<div className="panel panel-default">
					<div className="panel-heading">
						<ul className="nav nav-pills">
							<h4 className="active"><Link to="/dashboard" > &lsaquo; Kembali ke halaman utama .. </Link></h4>
						</ul>
					</div>
					<div className="panel-body">
						<div className="row">
							<div className="col-md-6">
								{this.renderDetail()}
							</div>
							<div className="col-md-6">
								<div className="text-center">
									{this.renderPhoto()}
									 <br /><br />
									{this.renderButtonRequest()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {  
  return { 
  		ride_detail: state.rides.ride_detail,
  		userride_request: state.rides.userride_request,
  		user: state.auth.user
  };
}

export default connect(mapStateToProps, actions)(Ride);
