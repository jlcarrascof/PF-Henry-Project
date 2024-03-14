import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../Redux/Reducer/reducer";
import {
  deleteUsers,
  disableUser,
  getUsers,
} from "../../../Redux/Actions/actions";
import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { GetRef, TableColumnsType, TableColumnType } from "antd";
import { Space, Input, Button, Table, Tag } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { showConfirmationModal } from "../utils/ConfirmModal";

type InputRef = GetRef<typeof Input>;

interface DataType {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  role: string;
  permissions: string;
  isDisabled: boolean;
  actions: any;
}

type DataIndex = keyof DataType;

const UserDashboard: React.FC<{}> = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const users = useSelector((state: State) => state.allUsers);
  const dispatch = useDispatch();

  const handleClickDelete = async (
    id: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    try {
      showConfirmationModal(() => {
        dispatch(deleteUsers(id));
        console.log("Disabling user...", id);
        window.location.reload();
      });
    } catch (error) {
      console.log("Something went wrong with the handleClick");
    }
  };

  const handleClickDisable = async (
    id: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    try {
      showConfirmationModal(() => {
        dispatch(disableUser(id));
        console.log("Disabling user...", id);
        window.location.reload();
      });
    } catch (error) {
      console.log("Something went wrong with the handleClick");
    }
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const data: DataType[] = users
    ? users.map((user) => ({
        _id: user?._id,
        firstName: user?.profile?.firstName || "No firstName",
        lastName: user?.profile?.lastName || "No lastName",
        dateOfBirth: user?.profile?.dateOfBirth || "No Birthday",
        email: user.user_email || "No Email",
        phone: user.phone || "No Phone",
        role: user.role,
        permissions: user.permissions,
        isDisabled: user.isDisabled || false,
        actions: (
          <Space size="middle">
            <a onClick={(event) => handleClickDisable(user?._id, event)}>
              Disable
            </a>
            <a onClick={(event) => handleClickDelete(user?._id, event)}>
              Delete
            </a>
          </Space>
        ),
      }))
    : [];

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "20%",
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "20%",
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      width: "20%",
      ...getColumnSearchProps("dateOfBirth"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "20%",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
      ...getColumnSearchProps("role"),
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      width: "10%",
      ...getColumnSearchProps("permissions"),
    },
    {
      title: "Disabled",
      dataIndex: "isDisabled",
      key: "isDisabled",
      width: "10%",
      render: (isDisabled: boolean) =>
        isDisabled ? <Tag color="red">Disabled</Tag> : null,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: "10%",
      ...getColumnSearchProps("actions"),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      className="userTable-Container"
    />
  );
};

// export default UserDashboard;

export default UserDashboard;
