import React from 'react'
import axios from 'axios'
import { Form, Input, Button, Checkbox } from 'antd';
import putNotification from "./Notification"
import {useHistory} from "react-router-dom"
import {useRecoilState} from "recoil"
import {authState} from "../states/atoms"

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const Login = () => {
  const history = useHistory()
  const [isAuth, setAuth] = useRecoilState(authState)

  const send = async values => {
    try {
      putNotification("Logging in...")
      const resp = await axios.post("https://localhost:8443/api/v1/login",
        {
          email: values.username,
          password: values.password
        }
      )

      if (resp.status === 200) {
        localStorage.setItem("token", resp.data)
        putNotification("Successful", "You have been successfully logged in!!")
        setAuth(true)
        history.push("/store")
      }
    } catch (error) {
      putNotification("!!Error!!", error.response?.data?.message)
    }


  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div style={{ paddingTop: 100 }}></div>
      <div style={{ fontFamily: "'Open Sans Condensed', sans-serif", fontWeight: "bolder" }}>
        <h1 style={{ marginLeft: 100, fontWeight: "bolder" }}> Sign In</h1>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          style={{ width: "60%" }}
          onFinish={send}
          size="large"
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ width: "20%" }}>
              Log in
            </Button>
            <div style={{ paddingTop: 10 }} >
              Or <a href="/register">register now!</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Login
