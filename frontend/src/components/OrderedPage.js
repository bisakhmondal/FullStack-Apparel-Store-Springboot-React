import React from 'react'
import OrderedItem from "./OrderedItem"
import { Row, Col } from "antd"
import { useHistory } from "react-router-dom"
import { useRecoilState } from "recoil"
import { cartState, authState } from "../states/atoms"
import putNotification from "./Notification"
import axios from "axios"

const OrderedPage = () => {
    const history = useHistory()
    const [isAuth, setIsAuth] = useRecoilState(authState)
    const [contents, setContents] = React.useState([])

    const fetchData = async () => {
        if (!isAuth) {
            putNotification("Redirecting", "Sire you need to login first")
            history.push("/login")
            return
        }
        const token = localStorage.getItem("token")
        try {
            const route = "https://localhost:8443/api/v1/cart/"
            const resp = await axios.get(route, {
                headers: {
                    Authorization: token
                }
            });
        
            if (resp.status === 200) {
                setContents(resp.data.map(d => <OrderedItem deal={d.product} quantity={d.quantity} />))
                console.log(resp.data)
            }
        } catch (error) {
            console.log(error.response)
            if (error.response?.data?.status === 403) {
                putNotification("session expired", "please relogin")

                localStorage.removeItem("token")
                setIsAuth(false)
            } else {
                putNotification("Error Occured", error.response?.data?.message)

            }
        }
    }
    React.useEffect(() => {
        fetchData()
        // console.log(items)
    }, [])


    return (
        <div className="jumbotron" style={{ backgroundColor: "whitesmoke", minHeight: "100vh"}}>
<Row style={{ fontFamily: "'Open Sans Condensed', sans-serif" }}>
                <Col span={20} >   <h1 className="display-4">Cart</h1></Col>
                {/* <Col span={4} style={{ paddingTop: 50 }} >   <button className="ant-btn ant-btn-danger ant-btn-lg" onClick={checkout} >Checkout</button> </Col> */}
            </Row>

            <Row style={{ padding: 5, fontSize: "18px" }}>
                <Col span={6}> Product </Col>
                <Col span={10}>Product Name</Col>
                <Col span={4}> Quantity  </Col>
                <Col span={4}> Total Value </Col>
            </Row>
            {
                contents
            }       
            
            </div>
    )
}

export default OrderedPage
