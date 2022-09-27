import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import {
  BrowserRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import Landing from '../pages/Landing';
import Homepage from '../pages/Homepage';
import ListStuff from '../pages/ListStuff';
import ListStuffAdmin from '../pages/ListStuffAdmin';
import AddStuff from '../pages/AddStuff';
import BillList from '../pages/BillList';
import UserProfile from '../pages/UserProfile';
import EditStuff from '../pages/EditStuff';
import NotFound from '../pages/NotFound';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import IndividualTestimony from '../pages/IndividualTestimony';
import HearingList from '../pages/HearingList';
import { ROLE } from '../../api/role/Role';
import TestimonyList from '../pages/TestimonyList';
import IndividualBill from '../pages/IndividualBill';
import CreateTestimony from '../pages/CreateTestimony';
import Hearing from '../pages/Hearing';
import SignOut from '../pages/SignOut';

/** Top-level layout component for this application.
 * Called in imports/startup/client/startup.jsx. */
const App = () => (
  <Router>
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route exact path="/about-us" element={<Landing />} />
        <Route path="/bill-list" element={<BillList />} />
        <Route path="/testimony-list" element={<ProtectedRoute><TestimonyList /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
        <Route path="/hearing-list" element={<HearingList />} />
        <Route path="/list" element={<ProtectedRoute><ListStuff /></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><AddStuff /></ProtectedRoute>} />
        <Route path="/user-profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/hearing" element={<ProtectedRoute><Hearing /></ProtectedRoute>} />
        <Route path="/edit/:_id" element={<ProtectedRoute><EditStuff /></ProtectedRoute>} />
        <Route path="/individual-testimony" element={<ProtectedRoute><IndividualTestimony /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminProtectedRoute><ListStuffAdmin /></AdminProtectedRoute>} />
        <Route path="/notauthorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/individualbill" element={<ProtectedRoute><IndividualBill /></ProtectedRoute>} />
        <Route path="/create-testimony" element={<ProtectedRoute><CreateTestimony /></ProtectedRoute>} />
      </Routes>
    </div>
  </Router>
);

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing
 * to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <SignIn />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  children: <SignIn />,
};

export default App;
