import React, { Component } from "react";
import '../style/Header.css'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // images: [],
      background : "mypageContainer"
    }
  }
  render() {
    return (
      <div>
        <div className="headerContainer">
          <div className="header-title-container">
            <span className="logo-name-header">W</span>
            <span className="logo-name">EA</span>
            <span className="logo-name-header">D</span>
            <span className="logo-name">RESSER</span>
          </div>
          <div className="user-box">
            <div><i className="fas fa-user"></i></div>
            <div><i className="fas fa-sign-in-alt"></i></div>
          </div>
        </div>
      </div >
    );
  }

}

export default Header;
