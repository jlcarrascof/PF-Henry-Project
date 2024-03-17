import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../Redux/Reducer/reducer";
import {
  disableRoom,
  getDisabledRooms,
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
  description: string; 
  typeOfRoom: string; 
  num_rooms: number; 
  hotel_id: string;
  address: string;
  price: number; 
  availability: boolean;
  actions: any;
}

type DataIndex = keyof DataType;

const RoomDashboard: React.FC<{}> = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const users = useSelector((state: State) => state.allAdminRooms);
  const dispatch = useDispatch();

  const handleClickDisable = async (
    id: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    try {
      showConfirmationModal(() => {
        dispatch(disableRoom(id));
        console.log("Disabling room...", id);
        /* window.location.reload(); */
      });
    } catch (error) {
      console.log("Something went wrong with the handleClick");
    }
  };

  useEffect(() => {
    dispatch(getDisabledRooms());
  }, [dispatch]);

  const data: DataType[] = users
    ? users.map((user) => ({
        _id: user?._id,
        description: user?.description || "No Description",
        typeOfRoom: user?.typeOfRoom || "Type of Room not defined",
        num_rooms: user?.num_rooms || "No. of Rooms not defined",
        price: user.price || "No pricing defined",
        address: user.address || "No Address",
        hotel_id: user.hotel_id || "No Hotel Linked",
        availability: user.availability,
        actions: (
            <a onClick={(event) => handleClickDisable(user?._id, event)}>
              Disable
            </a>
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
      title: "Room ID",
      dataIndex: "_id",
      key: "_id",
      width: "20%",
      ...getColumnSearchProps("_id"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "20%",
      ...getColumnSearchProps("description"),
    },
    {
      title: "Type Of Room",
      dataIndex: "typeOfRoom",
      key: "typeOfRoom",
      width: "20%",
      ...getColumnSearchProps("typeOfRoom"),
    },
    {
      title: "No. of Rooms",
      dataIndex: "num_rooms",
      key: "num_rooms",
      width: "20%",
      ...getColumnSearchProps("num_rooms"),
    },
    {
      title: "Hotel ID",
      dataIndex: "hotel_id",
      key: "hotel_id",
      width: "20%",
      ...getColumnSearchProps("hotel_id"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "10%",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Pricing per day ($USD)",
      dataIndex: "price",
      key: "price",
      width: "10%",
      ...getColumnSearchProps("price"),
    },
    {
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
      width: "10%",
      render: (availability: boolean) =>
      availability === false ? <Tag color="red">Not Available</Tag> : null,
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


export default RoomDashboard;
