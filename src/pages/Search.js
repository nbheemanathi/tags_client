import React, { useState, useEffect } from "react";
import { FETCH_CONTACTS } from "../util/graphql";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { Select, Checkbox, Button, Form, Input } from "antd";
import ContactForm from "../components/ContactForm";
import {
    ImportOutlined,
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
    DeleteOutlined,
  } from "@ant-design/icons";
const { Option } = Select;

function Search() {
  const users = useQuery(FETCH_CONTACTS);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const onUserChange = async (user) => {
    setSelectedUser(user);
    const userData = users.data?.getUsers.find((s) => s.id == user);
    console.log(userData);
    setCurrentUser(userData);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      <h2 className="text-primary-default font-bold text-2xl mb-5">Select User</h2>
      <Button className="bg-[#1677ff]" type="primary" icon={<PlusOutlined />} onClick={() => setCurrentUser({})}>
        Add User
      </Button>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 lg:col-span-6">
          <div className="box p-6">
            <div>
              {!users.loading && (
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Search User"
                  value={selectedUser}
                  onChange={(value) => onUserChange(value)}
                  onSearch={onSearch}
                  filterOption={(input, option) => {
                    console.log(option);
                    console.log(input);
                    return option.children.toLowerCase().includes(input.toLowerCase());
                  }}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {users.data?.getUsers.map((user) => {
                    return (
                      <Option key={user.id} value={user.id}>
                        {user.firstName + " " + user.lastName}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          {currentUser && (
            <div className="box p-4">
              <ContactForm
                contact={currentUser}
                onCancel={() => {
                  setSelectedUser(null);
                  setCurrentUser(null);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
