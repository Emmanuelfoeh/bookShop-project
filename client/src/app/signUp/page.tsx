"use client";
import React from "react";
import { Button, Form, Input, Select, message } from "antd";
import signUp from "../../../public/images/sign_up_.svg";
import Image from "next/image";
import Link from "next/link";
import { signUpUser } from "../apiCalls/userApiCalls";
import { useRouter } from "next/navigation";
const SignUpPage = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { Option } = Select;

  const router = useRouter()
  const onFinish = async () => {
    const formData = { ...form.getFieldsValue(true) };
    try {
      delete formData.confirmPassword;
      console.log("signup input values:", formData);
      await signUpUser(formData);
      messageApi.open({
        type: "success",
        // duration: 3000,
        content: "User SignUp Success",
      });
      router.push('/login')
    } catch (error) {
      console.log("the error in onFinished", error);
      messageApi.open({
        type: "error",
        // duration: 3000,
        content: `${error}`,
      });
    }
  };

  return (
    <div>
      <header className=" bg-white z-50 sticky top-0 p-2">
        <div className="w-[95%] mx-auto flex items-center justify-between z-40 relative">
          <Link className="text-2xl font-bold text-[#003060]" href={"/"}>
            Bookshop
          </Link>
        </div>
      </header>
      <div className="flex  py-5">
        {contextHolder}
        <div className="flex flex-col w-1/2 px-10">
          <h2 className="text-2xl font-bold pb-5">User Sign Up</h2>
          <div className="bg-[#f8f8f8] p-3">
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
                          new Error(
                            "The new password that you entered do not match!"
                          )
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

              <div className="mt-4">
                <p>
                  Already have an account?{" "}
                  <Link className="text-blue-600" href={"/login"}>
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
        <div className="flex relative w-1/2">
          <Image src={signUp} objectFit="cover" alt="signUp img" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
