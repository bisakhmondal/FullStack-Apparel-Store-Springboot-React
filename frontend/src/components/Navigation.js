import React from 'react'
import 'tachyons';
import './nav.css'
import { Link } from "react-router-dom";
import cart from "./cart.png"

const Navigation = ({sip}) => {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-light bg-light shadow-5" style={{fontFamily:"'Open Sans Condensed', sans-serif", fontSize:"20px"}}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link style={{ textDecoration: 'none' }} to='/' ><p className=" ffff nav-link pa2 f3 black" >B Store</p></Link>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link style={{ textDecoration: 'none' }} to='/' > <p className="nav-link dim">Deals <span className="sr-only">(current)</span> </p></Link>
                    </li>
                    <li className="nav-item">
                        <Link style={{ textDecoration: 'none' }} to='/book_flight' > <p className="nav-link">Book Flights</p></Link>
                    </li>

                </ul>
                <div className="form-inline my-2 my-lg-0 pa0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search Deals" aria-label="Search" onChange={e => sip(e.target.value)} />
                    <a class="ant-btn ant-btn-primary ant-btn-lg" style={{marginRight:8}} href="/login">Sign In</a>
                    <a class="ant-btn ant-btn-danger ant-btn-lg" href="/register">Sign Up</a>
                    <div style={{position:"relative", textAlign:"center"}}>
                    <img src={cart} height="40" />
                    <h4 style={{position:"absolute", top:"10px", left:"14px"}}>9</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation
