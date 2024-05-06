import { message, Space, Spin } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentRegister } from "../../Redux/auth/action";
import { useNavigate } from "react-router-dom";
import coverImage from '/img/LogoLogin.png';
import "./Register.css";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //alert api
    const [messageApi, contextHolder] = message.useMessage();

    //loading state
    const [loading, setLoading] = useState(false);

    //form state
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: "",
        studentClass: "",
    });

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // handle submit 
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        dispatch(studentRegister(formData)).then((res) => {
            if (res.message === "Error") {
                setLoading(false);
                messageApi.open({
                    type: "info",
                    content: "Error",
                    duration: 3,
                });
            } else if (res.message === "User already registered") {
                setLoading(false);
                messageApi.open({
                    type: "info",
                    content: "User already registered",
                    duration: 3,
                });
            } else {
                setLoading(false);
                messageApi.open({
                    type: "info",
                    content: res.message,
                    duration: 3,
                });
                navigate("/login");
            }
        }
        );
    };

    return (
      <div className="login">
      <br />
      <div className="loginContainer">
        <div className="flex">
          <div className="w-1/2 loginImage">
            <img src={coverImage} className="w-full h-full object-cover"/>
          </div>
          <div className="w-1/2 loginDetail">
            <div>
              <h3 className="text-gray-700 text-xl font-medium">Create Your Account</h3>
            </div>
      
            <div>
              {/* login form  */}
              <form onSubmit={handleFormSubmit}>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Enter full name"
                  className="p-2 my-2 border border-gray-300 rounded-md"
                />
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  type="email"
                  placeholder="Enter email"
                  className="p-2 my-2 border border-gray-300 rounded-md"
                />
                <input
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  type="password"
                  placeholder="Enter password"
                  className="p-2 my-2 border border-gray-300 rounded-md"
                />
                <input
                  required
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Enter class"
                  className="p-2 my-2 border border-gray-300 rounded-md"
                />
                <div className="text-center">
                  <button type="submit" className="p-2 my-2 bg-pink-500 rounded-md text-white">Sign up</button>
                  <h3 className="text-gray-700 text-l font-medium" style={{ fontSize: 'medium', fontWeight: 'normal' }}>Or</h3>
                  <button onClick={() => navigate('/')} className="p-2 my-2 bg-red-500 rounded-md text-white">Log in</button>
                </div>
              </form>
            </div>
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
}

export default Register;