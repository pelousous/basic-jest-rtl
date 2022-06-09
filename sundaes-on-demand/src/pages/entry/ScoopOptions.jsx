import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export const ScoopOptions = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    const isInvalid =
      value < 0 || value > 10 || value % 1 !== 0 || value === "";

    setInvalid(isInvalid);

    if (!isInvalid) updateItemCount(name, value);
  };
  const [invalid, setInvalid] = useState(false);

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`https://3030-pelousous-basicjestrtl-qb8chneooxi.ws-eu47.gitpod.io/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInvalid={invalid}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};
