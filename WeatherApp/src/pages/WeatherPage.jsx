import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";

function WeatherPage() {
  const { city } = useParams();
  const [searchTime, setSearchTime] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "9c5b4559e8af3e34a94ce15030fa459d";

  useEffect(() => {
    const fetchAllWeather = async () => {
      try {
        setLoading(true);

        // Chiamata per il meteo attuale
        const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`);
        // Chiamata previsioni 5 giorni / 3 ore
        const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=en`);

        if (!currentRes.ok || !forecastRes.ok) throw new Error("City not found");

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();
        setCurrentWeather(currentData);

        const dailyForecast = forecastData.list.filter((f) => f.dt_txt.includes("12:00:00"));
        setForecast(dailyForecast);

        // orario esatto in cui i dati sono stati ricevuti
        const now = new Date();
        const timeString = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        setSearchTime(timeString);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchAllWeather();
    }
  }, [city]);

  if (loading)
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="grow" variant="light" />
      </Container>
    );

  if (error)
    return (
      <Container className="mt-5 text-center">
        <Alert variant="danger" className="glass-card">
          {error}
        </Alert>
        <Link to="/" className="btn btn-light rounded-pill">
          Torna Indietro
        </Link>
      </Container>
    );

  return (
    <Container className="py-5">
      {/* CARD METEO ATTUALE */}
      <Row className="justify-content-center mb-5">
        <Col md={6}>
          <Card className="glass-card text-center p-4 border-0 shadow-lg text-white">
            <Card.Body>
              <h1 className="display-4 fw-bold">{currentWeather.name}</h1>
              <p className="lead">{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</p>
              <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`} alt="weather icon" />
              <h2 className="display-2 fw-bold">{Math.round(currentWeather.main.temp)}°C</h2>
              <h3 className="text-capitalize mb-4">{currentWeather.weather[0].description}</h3>
              <Row className="border-top pt-3">
                <Col>
                  <p className="mb-0 small">Humidity</p>
                  <p className="fw-bold">{currentWeather.main.humidity}%</p>
                </Col>
                <Col>
                  <p className="mb-0 small">Wind</p>
                  <p className="fw-bold">{currentWeather.wind.speed} m/s</p>
                </Col>
                <Col>
                  <p className="mb-0 small">Will it rain?</p>
                  <p className="fw-bold">{currentWeather.clouds.all > 70 ? "Likely" : "Not likely"}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* PREVISIONI 5 GIORNI */}
      <h4 className="text-center text-white mb-4 text-uppercase fw-light" style={{ letterSpacing: "3px" }}>
        Next days
      </h4>
      <Row className="g-3 justify-content-center">
        {forecast.map((day, index) => (
          <Col key={index} xs={6} md={2}>
            <Card className="glass-card border-0 text-center text-white h-100 p-2">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <p className="small mb-0">{new Date(day.dt_txt).toLocaleDateString("gb-GB", { weekday: "short" })}</p>
                <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="icon" />
                <p className="fw-bold mb-0">{Math.round(day.main.temp)}°C</p>
                <p className="x-small text-capitalize" style={{ fontSize: "0.7rem" }}>
                  {day.weather[0].description}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-5">
        <Link to="/" className="btn btn-circle" style={{ textDecoration: "none", color: "white" }}>
          ←
        </Link>
      </div>
    </Container>
  );
}

export default WeatherPage;
