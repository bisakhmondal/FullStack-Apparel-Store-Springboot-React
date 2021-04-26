import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import putNotification from "./Notification"
import {useHistory} from "react-router-dom"
import axios from 'axios'
const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };


const Register = () => {
  const [form] = Form.useForm();
  const history = useHistory()

  const send = async values => {
    try {
      putNotification("Registering...")
      const resp = await axios.post("https://localhost:8443/api/v1/registration",
        {
          firstName: values.firstname,
          lastName: values.lastname,
          email: values.email,
          password: values.password,
        }
      )

      if (resp.status === 200) {
        putNotification("Registration Successful", resp.data)
        history.push("/store")
      }
    } catch (error) {
      putNotification("!!Error!!", error.response?.data?.message)
    }


  }


  return (
    <>
    <div style={{paddingTop:100}}></div>
  <div style={{ fontFamily:"'Open Sans Condensed', sans-serif",  fontWeight:"bolder"}}>
      <h1 style={{marginLeft:100, fontWeight:"bolder"}}> Sign Up</h1>
    <Form
      {...formItemLayout}
      form={form}
      size="large"
      style={{width:"60%"}}
      name="register"
      onFinish={send}
      scrollToFirstError
    >

<Form.Item
        name="firstname"
        label="First Name"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your First Name!',
            whitespace: false,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastname"
        label="Last Name"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your Last Name!',
            whitespace: false,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" style={{width:"18%"}}>
          Register
        </Button>
        <div style={{paddingTop:10}} >
                Or <a href="/login">login now!</a>
                </div>
      </Form.Item>
    </Form>
    </div>
    </>
  );
}

export default Register
