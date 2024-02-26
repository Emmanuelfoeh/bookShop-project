"use client";
import React from "react";
import { Button, Form, Input, message } from "antd";
import signIn from "../../../public/images/sign_in_.svg";
import Image from "next/image";
import Link from "next/link";
import { loginUser } from "../apiCalls/userApiCalls";
import { useRouter } from "next/navigation";
const SignUpPage = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async () => {
    const formData = { ...form.getFieldsValue(true) };
    try {
      const logInUser = await loginUser(formData);
       let user = JSON.stringify(logInUser);
     localStorage.setItem("user", user);
      messageApi.open({
        type: "success",
        // duration: 3000,
        content: "User Login Success",
      });
      router.push("/");
    } catch (error) {
      messageApi.open({
        type: "error",
        // duration: 3000,
        content: `Incorrect Credentials`,
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
        <div className="flex relative w-1/2">
          <Image src={signIn} objectFit="cover" alt="signUp img" />
        </div>
        <div className="flex flex-col w-1/2 px-10">
          <h2 className="text-2xl font-bold pb-5">User Sign In</h2>
          <div className="bg-[#f8f8f8] p-3">
            <Form form={form} onFinish={onFinish} layout="vertical">
              <div className="flex flex-col gap-3">
                <Form.Item
                  hasFeedback
                  label="Email"
                  name="email"
                  validateTrigger="onBlur"
                  className="w-1/2"
                  rules={[{ required: true, max: 100 }]}
                >
                  <Input placeholder="Emmanuel" />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  label="Password"
                  name="password"
                  validateTrigger="onBlur"
                  className="w-1/2"
                >
                  <Input.Password />
                </Form.Item>
              </div>

              <Form.Item>
                <Button htmlType="submit">Log In</Button>
              </Form.Item>
            </Form>
            <div className="mt-4">
              <p>
                You do not have an account?{" "}
                <Link className="text-blue-600" href={"/signUp"}>
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
