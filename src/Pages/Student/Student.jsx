import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentData, studentRegister } from "../../Redux/student/action";

//component imports
import Header from "../../Components/Header/Header";
import Navbar from "../../Components/Sidebar/Navbar";
import StudentRow from "../../Components/Table/StudentRow";

//css imports
import { Button, Drawer, Space, Spin, message } from "antd";
import "./Student.css";

const Student = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //alert api
  const [messageApi, contextHolder] = message.useMessage();

  //loading state
  const [loading, setLoading] = useState(false);

  //redux states
  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);
  const { students, load } = useSelector((store) => store.student);

  //drawer states
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

//form states and functions
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    class: "",
  };
  const [FormData, setFormData] = useState(initialFormData);
  const handleInputChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (FormData.class == "") {
      return messageApi.open({
        type: "info",
        content: "Please select class",
        duration: 3,
      });
    }
    setLoading(true);
    dispatch(studentRegister(FormData))
      .then((res) => {
        console.log(res);
        if (res.msg === "User already registered") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "User already registered",
            duration: 3,
          });
        } else if (res.msg === "Student Registration failed") {
          setLoading(false);
          messageApi.open({
            type: "error",
            content: "Student Registration failed",
            duration: 3,
          });
        } else {
          setLoading(false);
          setFormData(initialFormData);
          onClose();
          messageApi.open({
            type: "success",
            content: "Student Registered Successfully",
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
    dispatch(getStudentData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <Navbar>
      <div className="admin bg-white">
        <div className="adminData bg-white border border-gray-200 rounded-lg shadow-md">
          <section className="tableBody">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Class</th>
                  <th>Access</th>
                  {/* <th>Edit</th>
                  <th>Delete</th> */}
                </tr>
              </thead>
              <tbody>
                {students?.map((data, i) => {
                  return <StudentRow data={data} key={i} />;
                })}
              </tbody>
            </table>
          </section>
        </div>
        {/* <div onClick={showDrawer}>
          <AddIcon />
        </div> */}
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
          {contextHolder}
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              className="p-2 my-2"
              required
              name="name"
              type="text"
              value={FormData.name}
              placeholder="Enter Name"
              onChange={(e) => handleInputChange(e)}
            />
            <input
              className="p-2 my-2"
              required
              name="email"
              type="email"
              value={FormData.email}
              placeholder="Enter Email"
              onChange={(e) => handleInputChange(e)}
            />
            <input
              className="p-2 my-2"
              required
              name="password"
              type="password"
              value={FormData.password}
              placeholder="Enter Password"
              onChange={(e) => handleInputChange(e)}
            />
            <select className="p-2 my-2" name="class" onChange={(e) => handleInputChange(e)}>
              <option value="">Choose Class</option>
              <option value={5}>X ORACLE</option>
              
            </select>
            <input className="p-2 my-2" type="submit" value="Add Student" />
          </form>
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

export default Student;
