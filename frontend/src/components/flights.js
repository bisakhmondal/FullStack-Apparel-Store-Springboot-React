import React, { useState, useEffect } from 'react';
import 'tachyons'
import { Timeline } from 'antd';
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
const Flights = ({ flight, date, time }) => {

    return (

        <section class="cf dib br3 tc bw5 w-30 h-20 ma2 grow shadow-5 pa2-ns">
            <>
                <article class="fl w-100 w-50-m  w-25-ns pa2-ns" style={{paddingTop:30}}>
                    <Timeline>
                        <Timeline.Item>{flight.src}</Timeline.Item>
                            {flight.hops.map(d=> <Timeline.Item color="red">{d}</Timeline.Item>)}                        
                        <Timeline.Item>{flight.dst}</Timeline.Item>
                    </Timeline>
                    <p>Time: {`${date} ${new Date(new Date(date.split('/').reverse().join('-')+'T'+time).getTime() + randomIntFromInterval(1000, 1000000)).toLocaleTimeString()} pm`}</p>
                    <h3>Fare: {(Math.random()*(14000)+2000).toFixed(2)} /-</h3>
                    <p className="btn btn-success tc white b pa-1" >Know More</p>
                </article>
            </>
        </section>
    )
};

export default Flights;