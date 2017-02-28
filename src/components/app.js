import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import * as actions from '../actions';

class App extends Component {  
  render() {
    return (
      <div>
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="container col-md-8 col-md-offset-2">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="#">Nebengers Web</a>
              </div>
                  
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav pull-right">

                  </ul>
              </div>
          </div>
      </nav>


      <div className="container">
        {this.props.children}
      </div>

      <footer>
        <div class="row">
          <div className="col-lg-12">
            <p className="text-center">Made with React</p>
          </div>
        </div>
      </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {  
  return { 
    user: state.auth.user
  };
}

export default connect(mapStateToProps, actions)(App); 