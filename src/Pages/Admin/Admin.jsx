import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//components
import Navbar from "../../Components/Sidebar/Navbar";
import Table from "../../Components/Table/Table";
import AddIcon from "../../Components/AddIcon/AddIcon";
import Header from "../../Components/Header/Header";

//redux
import { adminRegister, getAdminData } from "../../Redux/admin/action";

// css library
import { message, Space, Spin } from "antd";
import { Button, Drawer } from "antd";

//css imports
import "./Admin.css";

// form stat
const initialFormData = {
  name: "",
  email: "",
  password: "",
};

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //loading state
  const [loading, setLoading] = useState(false);

  //alert api
  const [messageApi, contextHolder] = message.useMessage();

  //redux states
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { admins, load } = useSelector((store) => store.admin);

  //form states and functions
  const [FormData, setFormData] = useState(initialFormData);
  const handleInputChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  //drawer states and functions
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // create admin function
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(adminRegister(FormData))
      .then((res) => {
        console.log(res);
        if (res.msg === "User already registered") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "User already registered",
            duration: 3,
          });
        } else if (res.msg === "Admin Registration failed") {
          setLoading(false);
          messageApi.open({
            type: "error",
            content: "Admin Registration failed",
            duration: 3,
          });
        } else {
          setLoading(false);
          setFormData(initialFormData);
          onClose();
          messageApi.open({
            type: "success",
            content: "Admin Registered Successfully",
            duration: 3,
          });
          messageApi.open({
            type: "success",
            content: "Password sent over mail.",
            duration: 3,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(getAdminData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="admin bg-white">
        {/* header component  */}

        {/* table component  */}
        <div className="adminData bg-white border border-gray-200 rounded-lg shadow-md">
          <Table Data={admins} />
        </div>

        {/* drawer component  */}
        <div onClick={showDrawer}>
          <AddIcon />
        </div>

        {/* side drawer  */}
        <Drawer
          title="Create a new account"
          width={720}
          onClose={onClose}
          open={open}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
            </Space>
          }
        >
          <form onSubmit={(e) => handleSubmit(e)}>
          <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Username</p>
            <input 
              className="p-2 my-2 font-sans"
              required
              name="name"
              type="text"
              value={FormData.name}
              placeholder="Enter Name"
              onChange={(e) => handleInputChange(e)}
            />
            <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Email</p>
            <input
              className="p-2 my-2 font-sans"
              required
              name="email"
              type="email"
              value={FormData.email}
              placeholder="Enter Email"
              onChange={(e) => handleInputChange(e)}
            />
            <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Password</p>
            <input
              className="p-2 my-2 font-sans"
              required
              name="password"
              type="password"
              value={FormData.password}
              placeholder="Enter Password"
              onChange={(e) => handleInputChange(e)}
            />
            <input className="bg-sky-500 hover:bg-sky-700 p-2 my-2 font-sans" type="submit" value="Add Admin" />
          </form>

          {/*main loading indicator  */}
          {contextHolder}
          {loading ? (
            <Space
              style={{
                width: "100vw",
                height: "100vh",
                position: "absolute",
                backgroundColor: "rgba(0,0,0,0.2)",
                top: "0",
                left: "0",
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
              }}
            >
              <Spin size="large"></Spin>
            </Space>
          ) : null}
        </Drawer>

        {/*drawer loading indicator  */}
        {load ? (
          <Space
            style={{
              width: "100vw",
              height: "100vh",
              position: "absolute",
              backgroundColor: "rgba(0,0,0,0.2)",
              top: "0",
              left: "0",
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
            }}
          >
            <Spin size="large"></Spin>
          </Space>
        ) : null}
      </div>
    </Navbar>
  );
};

export default Admin;
