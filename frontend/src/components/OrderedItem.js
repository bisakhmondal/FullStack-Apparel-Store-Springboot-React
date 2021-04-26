import React from 'react'
import { Row, Col } from 'antd';


const OrderedItem = ({deal, quantity}) => {
  return (
    <div >
      <Row style={{ padding: 5, fontSize: "18px" }}>
        <Col span={6}>
          <img src={`http://${deal.image}`} alt={deal.name} style={{ height: "80px", width: "80px" }} />
        </Col>
        <Col span={10}>{deal.name}</Col>
        <Col span={4}> {quantity}  </Col>
        <Col span={4}>{deal.discount*quantity} /-</Col>
      </Row>
    </div>
  )
}

export default OrderedItem
