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
      <div className="login ">
      <br />

      <div className="loginContainerleft">
    <div className=" loginImage">
      <img src={coverImage}  />
    </div>
    </div>
    <div className="loginContainerright">
    <div className="loginDetail">
      <div>
        <h3 className="text-gray-700 text-xl font-medium font-sans">Create Your account</h3>
      </div>
      <br></br>
      
            <div>
              {/* login form  */}
              <form onSubmit={handleFormSubmit}>
              <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Username</p>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Full name"
                  className="p-2 my-2 border border-gray-300 rounded-md font-sans"
                />
                <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Email</p>
                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  type="email"
                  placeholder="example@gmail.com"
                  className="p-2 my-2 border border-gray-300 rounded-md font-sans"
                />
                <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Password</p>
                <input
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  type="password"
                  placeholder="Password"
                  className="p-2 my-2 border border-gray-300 rounded-md font-sans"
                />
                <p className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">Insert Your Class</p>
                <input
                  required
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={handleFormChange}
                  type="text"
                  placeholder="Class"
                  className="p-2 my-2 border border-gray-300 rounded-md font-sans"
                />
                <div style={{ textAlign: 'center' }}>
                <button type="submit" className="px-10 py-2 my-4 font-sans bg-sky-500 hover:bg-sky-700 rounded-md font-medium text-white">Register</button>
                <p className="">______________Or_______________</p>
                <div className=" flex items-center justify-center">
                <span>Have an account?</span><button onClick={() => navigate('/login')} className="p-2 my-4 font-medium hover:font-semibold focus:font-semibold">Log In</button>          
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
}

export default Register;