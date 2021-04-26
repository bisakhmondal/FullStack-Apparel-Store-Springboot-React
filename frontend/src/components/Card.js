import React, { useState, useEffect } from 'react';
import 'tachyons'
import { useRecoilState } from "recoil"
import { cartState } from "../states/atoms"


const Card = ({ deal }) => {
    const [cart, setCart] = useRecoilState(cartState)
    const [item_, setItem] = useState(null);
    const updateCart = () => {
        var isThere = cart.filter(d => d?.id === deal.id)
        const restItems = cart.filter(d => d?.id !== deal.id)
        var item;
        if (isThere.length === 0) {
            item = deal
        }else{
            item = isThere[0]
        }
        const newItem = {...item, "quantity": item?.quantity +1 || 1 }
        console.log([...restItems, newItem])
        setCart([...restItems, newItem])
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    return (

        <section class="cf dib br3 tc bw5 w-30 h-20 ma2 shadow-5 pa2-ns">
            <>
                <article class="fl w-100 w-50-m  w-25-ns pa2-ns">
                    <h3 className="f2">{deal.name}</h3>
                    <div class="db bc-center w-100 h-200 br2 br--top ">
                        <img src={`http://${deal.image}`} height="350" width="250" alt={deal.name}
                            class="" />
                        {/* <h1 class="f2 pa2 f2-ns mb0 black-90 tl">From: {deal.source}</h1>
                            <h3 class="f2 pa2 f2-ns mb0 black-90 tl">To: {deal.destination}</h3> */}
                    </div>
                    <h2 className="f3 tl">Original Price: <span style={{ color: "#820001", fontWeight: "bolder" }}>{deal.price.toFixed(2)}/-</span></h2>

                    {/* <h1>Hurry up!!</h1>
                        <div className="f3">Available for: {date.minutes} minutes, {date.seconds} seconds</div> */}
                    <div class="ph2 ph0-ns pb3 pa1   db">
                        <p className="btn btn-danger tc white b pa-1 f4" style={{ borderRadius: 40 }}>Discounted Price: {Math.abs(deal.discount).toFixed(2)}</p>
                        <br></br>
                        <button className="ant-btn ant-btn-primary" style={{ fontFamily: "'Open Sans Condensed', sans-serif", fontSize: 20, height: 50 }} onClick={updateCart}>Add to Cart</button>
                    </div>
                </article>
            </>
        </section>
    )
};

export default Card;