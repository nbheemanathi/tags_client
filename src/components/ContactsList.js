import React, { useState } from "react";
import { DELETE_CONTACT_MUTATION, FETCH_CONTACTS } from "../util/graphql";
import { useQuery, useMutation } from "@apollo/client";
import { Table, Input, Space, Button, Popconfirm, message } from "antd";
import {
  ImportOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const ContactsList = (props) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const { loading, data } = useQuery(FETCH_CONTACTS, {
    pollInterval: 10000,
  });
  const [deleteContact] = useMutation(DELETE_CONTACT_MUTATION, {


    // below update does not seem to be necessary
    update(cache, result) {
      const data = cache.readQuery({
        query: FETCH_CONTACTS,
      });
      const cachedUsers = [...data.getUsers];
      console.log(result.data.deleteUser.id);
      cachedUsers.map((obj) => {  return result.data.deleteUser.id === obj.id || obj});
      console.log(cachedUsers);
      cache.writeQuery({
        query: FETCH_CONTACTS,
        data: { getUsers: cachedUsers },
      });
    },

    onCompleted() {
      message.success({
        content: "Deleted Contact Successfully",
        duration: 4,
        className: "notification_message",
      });
    },
  });
  const renderTableColumns = (columns) => {
    const isMobile = window.innerWidth < 600;
    if (isMobile) {
      return columns.filter((column) => column.key === "email" || column.key === "x");
    } else {
      return columns;
    }
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText("");
    confirm();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            className="bg-[#1677ff]"
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "",
  });
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      filters: [],
      filteredValue: filteredInfo.firstName || null,
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      sortOrder: sortedInfo.columnKey === "firstName" && sortedInfo.order,
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      filteredValue: filteredInfo.lastName || null,
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      sortOrder: sortedInfo.columnKey === "lastName" && sortedInfo.order,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      dataIndex: "",
      width: "10%",
      key: "x",
      render: (record) => {
        const userId = record.id;
        return (
          <div>
            <Button
              type="text"
              onClick={() => props.onEditUser(record)}
              className="primary-button"
              icon={<EditOutlined />}
            ></Button>
            <Popconfirm title="Confirm Delete?"
             onConfirm={() => {
                deleteContact({
                  variables: {
                    userId,
                  },
                });
              }}>
              <Button type="text" danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const onChange = (pagination, filters, sorter, extra) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const TableHeader = () => {
    return (
      <div>
        <h2 className="text-lg font-bold mb-5">Contacts</h2>
        <div className="flex space-x-2 space-y-2 md:space-y-0 md:flex-row flex-col">
          <Button className="bg-[#1677ff]" type="primary" icon={<PlusOutlined />} onClick={() => props.onAddNew()}>
            Add Contact
          </Button>
          <Button icon={<ImportOutlined />}>Bulk Contact Import</Button>
          <Button onClick={() => clearAll()}>Clear Filters and Sorters</Button>
        </div>
      </div>
    );
  };
  return (
    <div>
      {!loading && (
        <div>
          <Table
            rowKey={(record) => record.id}
            title={() => <TableHeader />}
            columns={renderTableColumns(columns)}
            dataSource={data?.getUsers}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};

export default ContactsList;
