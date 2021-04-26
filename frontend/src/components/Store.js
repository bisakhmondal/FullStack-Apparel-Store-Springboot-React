import React from 'react'
import CardList from "./CardList"
import putNotification from "./Notification"
import axios from "axios"
import { Row, Col, Select } from "antd"
const { Option } = Select;



const Store = () => {
    const [data, setData] = React.useState([])
    const shuffle = array => {
        array.sort(() => Math.random() - 0.5)
    }
    const [pref, setPref] = React.useState("1")

    const fetchData = async () => {
        let route = 'https://localhost:8443/api/v1/products/all';

        if(pref==="2"){
            route = 'https://localhost:8443/api/v1/products/gender?sex=male'
        }else if(pref==="3"){
            route = 'https://localhost:8443/api/v1/products/gender?sex=female'
        }else if (pref==="4"){
            route = 'https://localhost:8443/api/v1/products/arrival?arrival=new'
        }else if (pref===5){
            route = 'https://localhost:8443/api/v1/products/arrival?arrival=cheap'
        }
        try {
            const resp = await axios.get(route);
            if (resp.status === 200) {
                shuffle(resp.data)
                // console.log(resp.data);
                setData(resp.data)
            }
        } catch (error) {
            putNotification("Network Error", "Failed to Fetch data")
        }
    }

    React.useEffect(() => {
        fetchData()
    }, [])
    React.useEffect(() => {
        console.log(pref)
        fetchData()
    }, [pref])

    return (
        <div className="jumbotron">
            <h1 className="display-4">Home Store</h1>
            <Row>
                <Col span={18}>
                    <p className='f2 tc'> Top Picks</p>
                </Col>
                <Col span={6}>
                    Filter - <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a filter"
                        optionFilterProp="children"
                        onChange={v => setPref(v)}
                        // onFocus={}
                        // onBlur={}
                        // onSearch={}
                        defaultValue="1"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="1">For ALL</Option>
                        <Option value="2">For MEN</Option>
                        <Option value="3">For WOMEN</Option>
                        <Option value="4">New Arrivals</Option>
                        <Option value="5">High Discount</Option>
                    </Select>
                </Col>
            </Row>
            <CardList data={data} />
        </div>
    )
}

export default Store
