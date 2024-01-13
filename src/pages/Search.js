import React, { useState, useEffect } from "react";
import { FETCH_CONTACTS, SEARCH_USER } from "../util/graphql";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { Select, Checkbox, Button, Form, Input } from "antd";
import ContactForm from "../components/ContactForm";
import { ImportOutlined, EditOutlined, PlusOutlined, SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { useForm } from "../util/hooks";
const { Option } = Select;

function Search() {
  const { onChange, onSubmit, values, resetForm } = useForm(mutation, {
    email: "",
    firstName: "",
    lastName: "",
  });
  const users = useQuery(FETCH_CONTACTS);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState(null)
  const onUserChange = async (user) => {
    setSelectedUser(user);
    const userData = users.data?.getUsers.find((s) => s.id == user);
    setCurrentUser(userData);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const [search, { loading }] = useMutation(SEARCH_USER, {
    update(_, result) {
      if(result.data.searchUser.length > 0){
        setCurrentUser(result.data.searchUser[0]);
        setSelectedUser(result.data.searchUser[0]);
        setMessage(null);
      }
      else{
        setCurrentUser(null)
        setSelectedUser(null)
        setMessage("No user found")
        
      }
    },
    onError(err) {
      console.log(err);
      // setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  
  function mutation() {
    search();
  }
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
              {/* {!users.loading && (
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
              )} */}
              <form onSubmit={onSubmit} className="my-8">
                <div className="flex flex-col space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 outline-none">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      className="form-input w-full text-gray-800"
                      placeholder="Enter First Name"
                      value={values.firstName}
                      onChange={onChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 outline-none">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      className="form-input w-full text-gray-800"
                      placeholder="Enter Last Name"
                      value={values.lastName}
                      onChange={onChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 outline-none">Email</label>
                    <input
                      id="Email"
                      name="email"
                      type="email"
                      className="form-input w-full text-gray-800"
                      placeholder="Enter Email"
                      value={values.email}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-5">
                    <button type="button" className="text-sm underline outline-none" onClick={() => resetForm()}>
                      Clear
                    </button>
                  </div>
                  <button type="submit" className="btn rounded outline-none bg-[#1677ff] text-gray-100">
                    Search
                  </button>
                </div>
              </form>
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
                  resetForm()
                }}
              />
            </div>
          )}
          {message && (
            <div className="box p-4">
              <div className="text-center text-gray-500">{message}</div>
              <div className="text-center text-gray-500">Please search again</div>
              <div className="text-center text-gray-500">Or add a new user</div>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
