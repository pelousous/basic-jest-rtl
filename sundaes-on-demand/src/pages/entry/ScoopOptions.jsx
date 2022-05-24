import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export const ScoopOptions = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (e) => {
    updateItemCount(name, e.target.value);
  };

  return (
    <Col sx={12} sm={6} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label>{name}</Form.Label>
        <Form.Control type="number" default={0} onChange={handleChange} />
      </Form.Group>
    </Col>
  );
};
