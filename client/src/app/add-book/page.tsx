"use client";
import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import save_book from "../../../public/images/save_book.svg";
import Image from "next/image";
import Navbar from "../components/navbar/Navbar";
import ImageUpload from "../components/upload/Upload";
import { addNewBook } from "../apiCalls/bookApiCalls";
import { AnyARecord } from "dns";
import Layout from "../components/Layout/Layout";

const AddBookPage = () => {
  const [form] = Form.useForm();
  const [fileUpload, setFileUpload] = useState<any[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  console.log("picture file: ", fileUpload);

  const onFinish = async () => {
    const inputFields = { ...form.getFieldsValue(true) };
    const { title, price, quantity, description } = inputFields;
    const formData = new FormData();
    formData.append("picture", fileUpload[0]);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("quantity", quantity);

    try {
      await addNewBook(formData);
      messageApi.open({
        type: "success",
        // duration: 3000,
        content: "Book Added successfully",
      });
      form.resetFields();
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content: `${error.message}`,
      });
      console.log("the error while saving book", error);
    }

    // console.log("book input values:", formData);
  };
  return (
    <Layout>
      <div className="w-[80%] mx-auto flex  rounded">
        {contextHolder}
        <div className="flex flex-col w-1/2 ">
          <h2 className="text-2xl font-bold pb-5 text-[#003060]">
            Add new Book
          </h2>
          <div className="bg-[#f8f8f8] p-3">
            <Form form={form} onFinish={onFinish} layout="vertical">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <Form.Item
                    hasFeedback
                    label="Book Title"
                    name="title"
                    validateTrigger="onBlur"
                    className="w-1/2"
                    rules={[{ required: true, max: 100 }]}
                  >
                    <Input placeholder="Atomic Habits" />
                  </Form.Item>

                  <Form.Item
                    hasFeedback
                    label="Price"
                    name="price"
                    validateTrigger="onBlur"
                    className="w-1/2"
                    rules={[{ required: true, max: 100 }]}
                  >
                    <Input placeholder="Rhal" />
                  </Form.Item>
                </div>

                <div className="flex flex-col gap-2">
                  <Form.Item
                    hasFeedback
                    label="Quantity"
                    name="quantity"
                    validateTrigger="onBlur"
                    className="w-1/2"
                    rules={[{ required: true, max: 100 }]}
                  >
                    <Input placeholder="4" />
                  </Form.Item>

                  <Form.Item
                    validateTrigger="onBlur"
                    className="w-full"
                    label="Description"
                    name="description"
                  >
                    <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
                  </Form.Item>
                </div>
                <Form.Item label="Picture" name="picture">
                  <ImageUpload setFileUpload={setFileUpload} />
                </Form.Item>
              </div>

              <Form.Item>
                <Button htmlType="submit">Save Book</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="flex relative w-1/2 pt-16">
          <Image src={save_book} objectFit="cover" alt="signUp img" />
        </div>
      </div>
    </Layout>
  );
};

export default AddBookPage;
