"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import Image from "next/image";
import save_book from "../../../../public/images/save_book.svg";
import ImageUpload from "../upload/Upload";
import { updateBook } from "@/app/apiCalls/bookApiCalls";

const UpdateBook = ({ book }: any) => {
  const [form] = Form.useForm();
  const [fileUpload, setFileUpload] = useState<any[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  // console.log("the book info in update component", book);
  // console.log("the book info in update component", fileUpload);

  useEffect(() => {
    if (book) {
      form.setFieldsValue(book);
    }
  }, [form, book]);

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
      await updateBook(book._id, formData);
      messageApi.open({
        type: "success",
        // duration: 3000,
        content: "Book Updated successfully",
      });
      form.resetFields();
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content: `${error.message}`,
      });
      console.log("the error while saving book", error);
    }
  };
  return (
    <div className="mt-5">
      <div className="w-[80%] mx-auto flex  rounded">
        {contextHolder}
        <div className="flex flex-col w-1/2 ">
          <h2 className="text-2xl font-bold pb-5 text-[#003060]">
            Update Book
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
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="455" />
                  </Form.Item>
                </div>

                <div className="flex flex-col gap-2">
                  <Form.Item
                    hasFeedback
                    label="Quantity"
                    name="quantity"
                    validateTrigger="onBlur"
                    className="w-1/2"
                    rules={[{ required: true }]}
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
                {fileUpload.length === 0 && book.picture !== "" && (
                  <div className="flex h-52 mx-auto w-1/2 mb-3">
                    <Image
                      width={250}
                      height={100}
                      className="w-full h-full"
                      object-fit="cover"
                      src={book.picture}
                      alt="picture"
                    />
                  </div>
                )}
                <Form.Item label="Picture" name="picture">
                  <ImageUpload setFileUpload={setFileUpload} />
                </Form.Item>
              </div>

              <Form.Item>
                <Button htmlType="submit">Update Book</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="flex  relative w-1/2 pt-16 h-fit">
          <Image src={save_book} object-fit="cover" alt="signUp img" />
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
