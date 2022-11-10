import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { ROLE } from '../../api/role/Role';
import { Button, Modal, Form } from 'react-bootstrap';
import { PersonPlus } from 'react-bootstrap-icons';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */


function MeasureItem({ measure }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
  <tr>
    <td scope={"col"}>{measure.bitAppropriation}</td>
    <td scope={"col"}>{measure.year}</td>
    <td scope={"col"} align="middle">{measure.measureType}</td>
    <td scope={"col"}>{measure.measureNumber}</td>
    <td scope={"col"}>{measure.measureTitle}</td>
    <td className="measure-item-align"scope={"col"}>{measure.description}</td>

    <td className="measure-item-align" scope={"col"}>{measure.status}</td>

    <td className="measure-item-align" scope="col">
      <Link id={COMPONENT_IDS.INDIVIDUAL_BILL_BUTTON} to={`/individualbill/${measure._id}`}>View</Link>
    </td>

    <td scope="col">
      {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? ([
          <>
        <Button variant="secondary" onClick={handleShow}>
          <PersonPlus className="fs-8 mb-1"/>
        </Button>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Assign Bill to Office</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="OSIP" />
              <Form.Check type="checkbox" label="OFS" />
              <Form.Check type="checkbox" label="OCID" />
              <Form.Check type="checkbox" label="OSSS" />
              <Form.Check type="checkbox" label="OTM" />
              <Form.Check type="checkbox" label="DEPUTY" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Assign</Button>
          </Modal.Footer>
        </Modal>
          </>
      ]) : ''}
    </td>
  </tr>
  )
}

// Require a document to be passed to this component.
MeasureItem.propTypes = {
  measure: PropTypes.shape({
    bitAppropriation: PropTypes.number,
    year: PropTypes.number,
    measureType: PropTypes.string,
    measureNumber: PropTypes.number,
    code: PropTypes.string,
    measureTitle: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default MeasureItem;
