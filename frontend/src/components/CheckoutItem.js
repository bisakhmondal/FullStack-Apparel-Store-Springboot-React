import React from 'react'
import { Row, Col } from 'antd';


const CheckoutItem = ({deal}) => {
  return (
    <div >
      <Row style={{ padding: 5, fontSize: "18px" }}>
        <Col span={6}>
          <img src={`http://${deal.image}`} alt={deal.name} style={{ height: "80px", width: "80px" }} />
        </Col>
        <Col span={10}>{deal.name}</Col>
        {/* <Col span={2}>&#x276E;</Col> */}
        <Col span={4}> {deal.quantity}  </Col>
        {/* <Col span={2}>&#x276F;</Col> */}
        <Col span={4}>{deal.discount* deal.quantity} /-</Col>
        {/* <Col span={4}>&#10005;</Col> */}
      </Row>
    </div>
  )
}

export default CheckoutItem
