import React from "react";
import {
  Navbar,
  NavItem,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
    };
    this.toogleNav = this.toogleNav.bind(this);
    this.logout = this.logout.bind(this);
  }

  toogleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  logout() {
    localStorage.removeItem("userData");
  }

  render() {
    return (
      <Navbar
        dark
        expand="md"
        color="primary"
        style={{ position: "fixed", zIndex: "1", width: "100%" }}
      >
        <div className="container">
          <NavbarToggler onClick={this.toogleNav} />
          <NavLink to="/">
            <NavbarBrand className="mr-auto">Test</NavbarBrand>
          </NavLink>
          <Collapse navbar isOpen={this.state.isNavOpen}>
            <Nav navbar>
              <NavItem>
                <NavLink to="/profile" className="nav-link active ml-3">
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/login" className="nav-link active ml-3">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/signup" className="nav-link active ml-3">
                  SignUp
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={this.logout}
                  to="/"
                  className="nav-link active ml-3"
                >
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default Header;
