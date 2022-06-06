import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Popover right</Popover.Header>
    <Popover.Body>no ice cream will actually be delivered</Popover.Body>
  </Popover>
);

export default function SummaryForm({ setOrderPhase }) {
  const checkboxLabel = (
    <span>
      I agree to{" "}
      <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check type="checkbox" label={checkboxLabel} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Confirm order
      </Button>
    </Form>
  );
}
