import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function HomePage() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() && country.trim()) {
      navigate(`/meteo/${city},${country}`);
    }
  };

  return (
    <Container className="mt-5 vh-100">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card className="shadow-lg border-0 p-3">
            <Card.Body>
              <h1 className="text-center mb-4">WEATHER FORECAST</h1>
              <Form onSubmit={handleSearch}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control placeholder="Es: Verona" value={city} onChange={(e) => setCity(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nation</Form.Label>
                  <Form.Control placeholder="Es: IT" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  WILL IT RAIN?
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
