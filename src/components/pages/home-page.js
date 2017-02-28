import React, { Component } from 'react';
import { Link } from 'react-router';

class HomePage extends Component {  

  handleLogin(){
  	window.location
  }
  render() {
    return (
      <div className="jumbotron text-center col-md-8 col-md-offset-2">
      	<h2>Selamat datang di Nebengers Web Unofficial</h2>
      	<p>Silahkan mulai mencari tebengan dengan login terlebih dahulu !</p>
      	<h2 onClick={() => {window.location.href = '#/login'}} className="btn btn-primary">Login</h2>
      </div>
    );
  }
}

export default HomePage;  