import React, { useState } from "react";
import { Row, Col } from "antd";
import './test.css'
const dataImage = [
  {
    id: 1,
    img: "/image/01.jpg",
  },
  {
    id: 2,
    img: "/image/02.jpg",
  },
  {
    id: 3,
    img: "/image/03.jpg",
  },
  {
    id: 4,
    img: "/image/04.jpg",
  },
  {
    id: 5,
    img: "/image/05.jpg",
  },
  {
    id: 6,
    img: "/image/06.jpg",
  },
];

function Test(props) {
  const [data, setData] = useState(dataImage);
  console.log(data);
  return ( 
  <Row>
      {data.length > 0 ? data.map((item, index) => (
          <Col span={4} key={index} className="img" >
            <img src={item.img} alt="" style= {{width: 180, height: 180, borderRadius: 10, cursor: 'pointer'}} />
         
          </Col>
      )) : null}
  </Row>
  )
}

export default Test;
