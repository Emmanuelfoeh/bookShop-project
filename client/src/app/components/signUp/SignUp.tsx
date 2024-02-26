import React from 'react'
import { Button, Form, Input, Select } from "antd";
const SignUp = ({onFinish}:any) => {
      const [form] = Form.useForm();
     const { Option } = Select;
  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <div className="flex gap-3">
          <Form.Item
            hasFeedback
            label="First Name"
            name="firstName"
            validateTrigger="onBlur"
            className="w-1/2"
            rules={[{ required: true, max: 100 }]}
          >
            <Input placeholder="Emmanuel" />
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Last Name"
            name="lastName"
            validateTrigger="onBlur"
            className="w-1/2"
            rules={[{ required: true, max: 100 }]}
          >
            <Input placeholder="Rhal" />
          </Form.Item>
        </div>
        <div className="flex gap-3">
          <Form.Item
            label="Email"
            name="email"
            validateTrigger="onBlur"
            className="w-1/2"
            rules={[
              { required: true, message: "Please input your E-mail!" },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input placeholder="emmanuel@gmail.com" />
          </Form.Item>
          <Form.Item
            label="UserName"
            hasFeedback
            name="userName"
            validateTrigger="onBlur"
            className="w-1/2"
            rules={[{ required: true, max: 50 }]}
          >
            <Input placeholder="emmanuelRl" />
          </Form.Item>
        </div>
        <div className="flex gap-3">
          <Form.Item
            label="Password"
            name={"password"}
            rules={[
              {
                required: true,
                min: 8,
                message: "Required! with at least 8 characters",
              },
            ]}
            className="w-1/2"
          >
            <Input.Password type="password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name={"confirmPassword"}
            dependencies={["password"]}
            hasFeedback
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
            className="w-1/2"
          >
            <Input />
          </Form.Item>
        </div>
        <div className="flex">
          <Form.Item
            label="Role"
            name="role"
            validateTrigger="onBlur"
            className="w-1/2"
            hasFeedback
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select>
              <Option value="ADMIN">ADMIN</Option>
              <Option value="USER">USER</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item>
          <Button htmlType="submit">Sign Up</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignUp