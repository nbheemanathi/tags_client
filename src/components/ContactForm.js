import React, { useState, useEffect, useContext } from "react";
import { Button, Form, Input, InputNumber, message, Select } from "antd";
import { useMutation } from "@apollo/client";
import { ADD_CONTACT_MUTATION, FETCH_CONTACTS, UPDATE_CONTACT_MUTATION } from "../util/graphql";
import { AuthContext } from "../context/auth";
const ContactForm = (props) => {
  const [currentContact, setCurrentContact] = useState(props.contact);

  const context = useContext(AuthContext);
  const [form] = Form.useForm();
  const [addContact] = useMutation(ADD_CONTACT_MUTATION, {
    refetchQueries: [{ query: FETCH_CONTACTS }],

    onCompleted() {
      message.success({
        content: "Successfully Added Contact",
        duration: 4,
        className: "notification_message",
      });
      props.onCancel();
    },
    onError(error) {
      message.warn({
        content: error.message,
        duration: 10,
        className: "notification_message",
      });
    },
  });
  const [updateUser] = useMutation(UPDATE_CONTACT_MUTATION, {
    refetchQueries: [{ query: FETCH_CONTACTS }],
    onCompleted() {
      message.success({
        content: "Successfully Updated Contact",
        duration: 4,
        className: "notification_message",
      });
      props.onCancel();
    },
    onError(error) {
      message.warn({
        content: error.message,
        duration: 10,
        className: "notification_message",
      });
    },
  });
  const onSubmit = (data) => {
    if (currentContact.id) {
        updateUser({
          variables: {
            userId: currentContact.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,           
          },
        });
    } else {
      addContact({
        variables: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        },
      });
    }
  };
  return (
    <div className="p-6 bg-white">
      <div className="font-bold mb-10 text-lg text-primary-default">
        {currentContact.id ? <span>Edit Contact</span> : <span>Add Contact</span>}
      </div>
      <Form
        initialValues={currentContact}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        size="default"
        onFinish={onSubmit}
      >
        
        
        <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "First Name is required!" }]}>
          <Input maxLength={25} />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Last Name is required!" }]}>
          <Input maxLength={25} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "Please enter valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      
        <Form.Item wrapperCol={{ offset: 4, span: 10 }}>
          <Button className="bg-[#1677ff]" type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" style={{ margin: "0 8px" }} onClick={() => props.onCancel()}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
