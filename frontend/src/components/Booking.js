import React from 'react'
import { Button, Switch, Select, notification,DatePicker ,TimePicker} from 'antd';
import axios from 'axios';
import moment from 'moment';
import Flight from "./flights"


const { Option } = Select
const openNotification = (Header, s) => {
    notification.open({
        message: Header,
        description: s !== "" ? `Please Select Correct ${s} from the Dropdown List` : s,
        placement: 'bottomRight',
    });
};

const Booking = () => {
    const aps = ["Kolkata (CCU)", "Delhi (DEL)", "Mumbai (BOM)", "Bangalore (BLR)", "Chennai (CAA)", "Hyderabad (HYD)", "Guwahati (GAU)"]

    const renderAps = aps.map((v, idx) => <Option value={idx}>{v}</Option>)

    const [src, setSrc] = React.useState(-1);
    const [dst, setDest] = React.useState(-1);
    const [leg, setLeg] = React.useState(true);
    const [date, setDate] = React.useState(new Date().toLocaleDateString());
    const [time, setTime] = React.useState(new Date().toLocaleTimeString());

    const [flights, setFlights] = React.useState([])

    const Validate = async () => {
        if (src === dst) {
            openNotification('Put Correct Information', "Source & Destination")
            return
        }
        else if (src === -1) {
            openNotification('Put Correct Information', "Source")
            return
        }
        else if (dst === -1) {
            openNotification('Put Correct Information', "Destination")
            return
        }

        const data = {
            source: aps[src],
            destination: aps[dst],
            direct: Number(!leg)
        }
        try {

            const resp = await axios.post("http://localhost:8080/apis/flights", data)
            setFlights(resp.data.map(d => JSON.parse(d)))
            
            if(resp.data.length===0){
                openNotification("No Flights available","")
            }
        } catch (error) {
            openNotification("Network request failed","")
            console.log(error)
        }

    }

    return (
        <>
            <p className="f2 tc pa1" style={{ paddingTop: 100 }}> Flight Booking</p>
            <div class="jumbotron" style={{ paddingTop: 10, backgroundColor: "white" }}>
                <div class="container pa1 tc f4" >
                    Source: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        onSelect={e => setSrc(e)}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        {renderAps}
                    </Select><br />
                    Destination: &nbsp; <Select
                        showSearch
                        style={{ width: 200, paddingTop: 30, paddingBottom: 30 }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        onSelect={e => setDest(e)}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        {renderAps}
                    </Select><br />
                    <div style={{ paddingBottom: 20 }}>
                    Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <DatePicker defaultValue={moment(date, "DD/MM/YYYY")} format={"DD/MM/YYYY"}
                    onChange={(p, d)=> setDate(d)} />
                    
                    </div>
                    <div style={{ paddingBottom: 20 }}>
                    Time:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <TimePicker onChange={(p,t) => setTime(t)} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                    
                    </div>
                    <div style={{ paddingBottom: 20 }}>
                        Show Legs: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Switch defaultChecked onChange={() => setLeg(!leg)} /><br />
                    </div>
                    <Button type="primary" danger onClick={Validate}>
                        Find
                    </Button>
                    <br />
                </div>
                {flights.length !== 0 ?
                    <>
                        <hr />
                        <div className='tc'>
                            {flights.map(f=> <Flight flight={f} date={date} time={time}/>)}
                        </div>
                    </>
                    :
                    <></>
                }
            </div>
        </>
    )
}

export default Booking
