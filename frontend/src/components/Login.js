import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
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
        const onFinish = (values) => {
            console.log('Success:', values);
          };
        
          const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
          };
        
          return (
              <>
              <div style={{paddingTop:100}}></div>
            <div style={{ fontFamily:"'Open Sans Condensed', sans-serif",  fontWeight:"bolder"}}>
                <h1 style={{marginLeft:100, fontWeight:"bolder"}}> Sign In</h1>
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              style={{width:"60%"}}
              onFinish={onFinish}
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
                <Button type="primary" htmlType="submit" style={{width:"20%"}}>
                  Log in
                </Button>
                <div style={{paddingTop:10}} >
                Or <a href="/register">register now!</a>
                </div>
              </Form.Item>
            </Form>
            </div>
            </>
    )
}

export default Login
