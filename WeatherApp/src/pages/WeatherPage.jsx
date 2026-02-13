import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert, Badge } from "react-bootstrap";

function WeatherPage() {
  const { city } = useParams(); // "NomeCittà,CodiceNazione"
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "9c5b4559e8af3e34a94ce15030fa459d";
}
