import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, studentLogin, tutorLogin } from "../../Redux/auth/action";
import coverImage from '/img/LogoLogin.png';

//css imports
import { message, Space, Spin } from "antd";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);

  //alert api
  const [messageApi, contextHolder] = message.useMessage();

  //loading state
  const [loading, setLoading] = useState(false);

  //form state
  const [formData, setFormData] = useState({
    type: "",
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // login function
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.type === "") {
      return messageApi.open({
        type: "error",
        content: "Please select user type.",
        duration: 3,
      });
    }
    setLoading(true);
    if (formData.type === "admin") {
      dispatch(adminLogin(formData)).then((res) => {
        if (res.message === "Wrong credentials") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Wrong credentials !",
            duration: 3,
          });
        } else if (res.message === "Access Denied") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Your access has been revoked by the admin !",
            duration: 3,
          });
        } else if (res.message === "Error") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Something went wrong, please try again",
            duration: 3,
          });
        } else {
          setLoading(false);
          return navigate("/home");
        }
      });
    }
    if (formData.type === "tutor") {
      dispatch(tutorLogin(formData)).then((res) => {
        if (res.message === "Wrong credentials") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Wrong credentials !",
            duration: 3,
          });
        } else if (res.message === "Access Denied") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Your access has been revoked by the admin !",
            duration: 3,
          });
        } else if (res.message === "error") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Something went wrong, please try again",
            duration: 3,
          });
        } else {
          setLoading(false);
          return navigate("/home");
        }
      });
    }
    if (formData.type === "student") {
      dispatch(studentLogin(formData)).then((res) => {
        if (res.message === "Wrong credentials") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Wrong credentials !",
            duration: 3,
          });
        } else if (res.message === "Access Denied") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Your access has been revoked by the admin !",
            duration: 3,
          });
        } else if (res.message === "error") {
          setLoading(false);
          messageApi.open({
            type: "info",
            content: "Something went wrong, please try again",
            duration: 3,
          });
        } else {
          setLoading(false);
          return navigate("/home");
        }
      });
    }
  };

  if (auth.data.isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="login">
      <br />
      
      <div className="loginContainerleft">
        <div className="loginImage">
          <img src={coverImage}/>
        </div>
      </div>
      <div className="loginContainerright">
        <div className="loginDetail">
          <div>
          <h3 className="text-gray-700 text-xl font-bold font-sans">Welcome Back</h3>
          </div>
          <br></br>

          <div>
            {/* login form  */}
            <form onSubmit={handleFormSubmit}>
              <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Username/Email</p>
              <input
                required
                name="email"
                value={formData.id}
                onChange={handleFormChange}
                type="email"
                placeholder="Example@gmail.com"
                className="p-2 my-2 font-sans "
              />
              <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Password</p>
              <input
                required
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                type="password"
                placeholder="******"
                className="p-2 my-2 font-sans"
              />
              <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Login As</p>
              <select
                name="type"
                onChange={handleFormChange}
                className="p-2 my-2 font-sans"
                // Anda juga dapat menambahkan kelas Tailwind pada elemen select
              >
                <option value="admin">......</option>
                <option value="admin">Admin</option>
                <option value="student">Siswa</option>
                {/* <option value="tutor">Guest</option> */}
              </select>
              {/* <button type="submit" className="p-2 my-2">LOGIN</button> */}
              <div style={{ textAlign: 'center' }}>
                <button type="submit" className="px-10 py-2 my-4 font-sans bg-sky-500 hover:bg-sky-700 rounded-md font-medium text-white">Log in</button>
                <p className="">______________Or_______________</p>
                <div className=" flex items-center justify-center">
                <span>Already have an account?</span><button onClick={() => navigate('/register')} className="p-2 my-4 font-medium hover:font-semibold focus:font-semibold">Register</button>          
              </div>
                </div>
            </form>
          </div>
        </div>
      </div>
      {/* loading indicator */}
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
    </div>
  );
};

export default Login;
