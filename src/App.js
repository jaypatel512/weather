import React, { Component } from 'react';
import logo from './logo.svg';
import { Navbar, Nav, Col, Container, Row, NavItem, Spinner } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/dist/journal/bootstrap.css';

const PLACES = [
  { name: "Round Rock", zip: "78681" },
  { name: "San Jose", zip: "95112" }
];

class WeatherDisplay extends Component {

  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }

  componentDidMount() {
    const zip = this.props.zip;
    const URL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&appid=73f380995f6df11f9d0f897ce72aecbf&units=imperial"

    fetch(URL).then(res => res.json()).then(json => {
      console.log(json)
      this.setState({ weatherData: json })
    })
  }

  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <Spinner animation="grow" variant="success" />;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    if (!weatherData) return <Spinner animation="grow" variant="success" />;
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    }
  }

  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
        <Navbar bg="primary" variant="dark" expand="lg">
          <Navbar.Brand href="#home">React Simple Weather App</Navbar.Brand>
        </Navbar>
        <Container>
          <Row className="mt-5">
            <Col md={4} sm={4}>
              <h3>Select a city</h3>
              <Nav
                variant="pills"
                className="flex-column"
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <Nav.Item key={index} className="header-nav-item">
                    <Nav.Link to={index} eventKey={index}>
                      {place.name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
