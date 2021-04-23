import React, {useState, useEffect} from 'react';
import 'tachyons'

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

const Card = ({ deal }) => {
    const [validTill, setVT] = useState(null);

    const calculateTime = () =>{
        let difference = -1
        if(validTill!==null){
            difference = +new Date(validTill) - +new Date();
        }
        let timeLeft = {
            minutes:0,
            seconds:0
        };

    if (difference > 0) {
        timeLeft = {
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
    }

    const [date, setDate] = useState(calculateTime());

    useEffect(()=>{
        setVT(new Date(new Date().getTime() + 1000* randomIntFromInterval(30, 180))) //making the deal valid for in between 30 & 180 sec
    }, [])
    
    useEffect(()=>{
        
        const timer = setTimeout(()=>{
            setDate(calculateTime())
        }, 1000)
        return () => clearTimeout(timer)
     })

    return (
        
        <section class="cf dib br3 tc bw5 w-30 h-20 ma2 grow shadow-5 pa2-ns">
<p className="btn btn-warning tc white b pa-2" >Deal Alert</p>
            {(date.minutes===0 && date.seconds===0) ?
            <article class="fl w-100 w-50-m  w-25-ns pa2-ns">
                <h3 className="display-2">{deal.name} Ended</h3>
            </article>

            :
            <>
            <article class="fl w-100 w-50-m  w-25-ns pa2-ns">
                <h3 className="display-4">{deal.name}</h3>
                <div class="">
                    {/* <img src={deal.url} alt='' */}
                        {/* class="db bg-center cover aspect-ratio--object" /> */}
                    <h1 class="f2 pa2 f2-ns mb0 black-90 tl">From: {deal.source}</h1>
                    <h3 class="f2 pa2 f2-ns mb0 black-90 tl">To: {deal.destination}</h3>
                </div>
                <h2 className="f2 tl">Original Price: <span style={{color:"#820001"}}>{deal.price.toFixed(2)}/-</span></h2>

                <h1>Hurry up!!</h1>
                <div className="f3">Available for: {date.minutes} minutes, {date.seconds} seconds</div>
                <div class="ph2 ph0-ns pb3 pa1   db">
                <p className="btn btn-success tc white b pa-1 f4" >Discounted Price: {Math.abs(deal.price-deal.discount).toFixed(2)}</p>
                </div>
            </article>
            </>
        }
        </section>
    )
};

export default Card;