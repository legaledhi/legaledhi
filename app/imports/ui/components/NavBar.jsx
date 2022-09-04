import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, CloudDownload, PersonCircle } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  return (
    <div>
      {currentUser ? ([null]) :
        ([
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} to="/">
                <img width="50px" src="../images/hidoe-logo.png" alt="hidoe logo" />
              </Navbar.Brand>
              <h4 className="me-auto">Hawaii DOE Legislative Tracker</h4>
              <Nav.Link id={COMPONENT_IDS.NAVBAR_LOGIN_DROPDOWN_SIGN_IN} as={NavLink} to="/signin">
                <button id="login" type="button" className="btn btn-outline-secondary">Login</button>
              </Nav.Link>
            </Container>
          </Navbar>,
        ])}
      {currentUser ? ([
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} to="/">
              <img width="50px" src="../images/hidoe-logo.png" alt="hidoe logo" />
            </Navbar.Brand>
            <h4 className="me-auto">HIDOE Legislative Tracker</h4>
            <Nav className="me-auto justify-content-center flex-grow-1 pe-3">
              <Nav.Link href="#Option 1">Option 1</Nav.Link>
              <Nav.Link href="#Option 2">Option 2</Nav.Link>
              <Nav.Link href="#Option 3">Option 3</Nav.Link>
              {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
                [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} to="/admin" key="admin">Admin Option</Nav.Link>,
                  <NavDropdown id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} title="Admin Option 2: Dropdown" key="manage-dropdown">
                    <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} to="/manage-database"><CloudDownload /> Admin Option 2: Dropdown</NavDropdown.Item>
                  </NavDropdown>]
              ) : ''}
            </Nav>
            <NavDropdown id={COMPONENT_IDS.NAVBAR_CURRENT_USER} title={currentUser}>
              <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/changeme"><PersonCircle /> View Profile</NavDropdown.Item>
              <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_SIGN_OUT} as={NavLink} to="/signout"><BoxArrowRight /> Sign out</NavDropdown.Item>
            </NavDropdown>
          </Container>
        </Navbar>,
      ]) : ([null])}
    </div>

  );
};

export default NavBar;
