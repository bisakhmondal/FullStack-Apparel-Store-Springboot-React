import React, {useState} from "react"
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Navigation from "./components/Navigation"
import Hero from './components/Hero'
import CardList from "./components/CardList"
// import Booking from "./components/Booking"
import Login from "./components/Login"
import Register from "./components/Register"
import LandingPage from "./components/LandingPage"

const App= ()=> {
  const [input, setIp]=useState('');
  return (
      <Router>

        <Navigation  sip={setIp} />
         <Switch>
          <Route exact path="/" >
          {/* <Hero /> */}
          <LandingPage />
          {/* <CardList ip={input}/> */}
          </Route>
          {/* <Route path="/store">
            <Booking />
          </Route> */}

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

        </Switch> 
  </Router>
    
  );
}

export default App;
