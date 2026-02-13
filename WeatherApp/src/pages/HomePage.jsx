import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";

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
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Card className="circle-card border-0 shadow-lg">
        <Card.Body className="d-flex flex-column justify-content-center align-items-center w-100">
          <h2 className="text-center mb-4 fw-bold text-white">WEATHER</h2>

          <Form onSubmit={handleSearch} className="w-100">
            <Form.Group className="mb-3">
              <Form.Control
                className="glass-input rounded-pill text-center"
                placeholder="City (es: Verona)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                className="glass-input rounded-pill text-center"
                placeholder="Nation (es: IT)"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="btn-circle">
              GO
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default HomePage;
