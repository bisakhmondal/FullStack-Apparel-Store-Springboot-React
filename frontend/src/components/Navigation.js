import React from 'react'
import 'tachyons';
import './nav.css'
import { Link } from "react-router-dom";
import cart from "./cart.png"
import { authState, searchState, cartState } from "../states/atoms"
import { useRecoilState, useRecoilValue } from "recoil"
import putNotification from "./Notification"

const Navigation = () => {
    const [authNed, setisauth] = useRecoilState(authState)
    const [search, setSearch] = useRecoilState(searchState)
    const [item, _] = useRecoilState(cartState)

    const getValue = () =>{
        if(item.length===0){
            return 0
        }
        let len = item.map(d => d?.quantity || 0).reduce((a,b) => a+b, 0)
        return len
    }
    const signout = async () => {
        localStorage.removeItem("token");
        setisauth(false)
        putNotification("Successful", "You have been successfully logged out!!")
    }

    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-light bg-light shadow-5" style={{ fontFamily: "'Open Sans Condensed', sans-serif", fontSize: "20px" }}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link style={{ textDecoration: 'none' }} to='/' ><p className=" ffff nav-link pa2 f3 black" >B Store</p></Link>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link style={{ textDecoration: 'none' }} to='/store' > <p className="nav-link dim">Home<span className="sr-only">(current)</span> </p></Link>
                    </li>
                    <li className="nav-item">
                        <Link style={{ textDecoration: 'none' }} to='/newarrivals' > <p className="nav-link">New Arrivals</p></Link>
                    </li>
                    <li className="nav-item">
                        <Link style={{ textDecoration: 'none' }} to='/discount' > <p className="nav-link">Cheap Store</p></Link>
                    </li>
                    <li className="nav-item">
                        <Link style={{ textDecoration: 'none' }} to='/orders' > <p className="nav-link">Past Orders</p></Link>
                    </li>

                </ul>
                <div className="form-inline my-2 my-lg-0 pa0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search Deals" aria-label="Search" onChange={e => setSearch(e.target.value)} />

                    {!authNed ?
                        <div>
                            <a class="ant-btn ant-btn-primary ant-btn-lg" style={{ marginRight: 8 }} href="/login">Sign In</a>
                            <a class="ant-btn ant-btn-danger ant-btn-lg" href="/register">Sign Up</a>
                        </div> :
                        <button class="ant-btn ant-btn-danger ant-btn-lg" onClick={signout}>Sign Out</button>
                    }
                    <Link style={{ textDecoration:"none", position: "relative", textAlign: "center" }} to="/checkout">
                        <img src={cart} height="40" />
                        <h4 style={{ position: "absolute", top: "10px", left: "14px" }}>{getValue()}</h4>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navigation
