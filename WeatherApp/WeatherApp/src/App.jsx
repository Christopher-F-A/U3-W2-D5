import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import WeatherPage from "./pages/WeatherPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meteo/:city" element={<WeatherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
