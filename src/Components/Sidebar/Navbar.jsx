import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../../Redux/auth/action";
import Menu from "../Menu/Menu";
import { Dropdown } from "antd";

import SidebarItem from "./SideBarItem"

// Image imports
import user from "../../Assets/user.png";
import logo from "../../Assets/LogoInt.png";

// Icon imports
import { LuLayoutGrid } from "react-icons/lu";
import { PiGameControllerDuotone  } from "react-icons/pi";
import { GoChevronDown } from "react-icons/go";
import { RiHomeSmileFill  } from "react-icons/ri";
import { MdVideoLibrary } from "react-icons/md";
import { FaUsers,FaUserCog   } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import { AiFillAppstore } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdLooksOne } from "react-icons/md";
import { MdLooksTwo } from "react-icons/md";
import { MdLooks3 } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { MdLibraryBooks } from "react-icons/md";

// CSS imports
import "./Navbar.css";

const Navbar = ({ children }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //redux state
  const auth = useSelector((store) => store.auth);
  if (!auth.data.isAuthenticated) {
    return navigate("/");
  }
  const {
    user: { userType, name, premium },
  } = useSelector((store) => store.auth.data);

  //Sidebar toggle state
  const [toggle, setToggle] = useState(true);

  //Sidebar menu
  const adminData = [
    { icon: <RiHomeSmileFill  />, title: "Dashboard", address: "/home" },
    { icon: <FaUserCog  />, title: "Admin", address: "/admin" },
    // { icon: <PiChalkboardTeacher />, title: "Tutors", address: "/tutor" },
    { icon: <FaUsers />, title: "Students", address: "/student" },
    // { icon: <GrTasks />, title: "Test", address: "/tests" },
    { icon: <GrTasks />, title: "Pretest", address: "/test/6643090f1845bac6caaa45ef" },
    // { icon: <AiOutlineRead />, title: "Lessons", address: "/lessons" },
    { icon: <MdLooksOne />, title: "Pertemuan 1", childrens: [
      { icon: <MdVideoLibrary  />, title: "Session 1", address: "/contents" },
      // { icon: <IoBulbOutline />, title: "Knowledge", address: "/doubts" },
      { icon: <IoGameController  />, title: "Session 2", address: "/scratchs" },
      { icon: <MdLibraryBooks  />, title: "Session 3", address: "/doubt/6644eb2636db1f98901851bc" },
    ]},
    { icon: <MdLooksTwo />, title: "Pertemuan 2", childrens: [
      { icon: <MdVideoLibrary  />, title: "Session 1", address: "/contents2" },
      { icon: <IoGameController  />, title: "Session 2", address: "/scratchs2" },
      // { icon: <MdOutlineAssignment />, title: "Session 3", address: "/assignments2" },
      { icon: <MdLibraryBooks  />, title: "Session 3", address: "/doubt2/6644eb4836db1f98901851c0" },
    ]},
    { icon: <MdLooks3 />, title: "Pertemuan 3", childrens: [
      { icon: <MdVideoLibrary  />, title: "Session 1", address: "/contents3" },
      // { icon: <IoBulbOutline />, title: "Knowledge", address: "/doubts" },
      { icon: <IoGameController  />, title: "Session 2", address: "/scratchs3" },
      { icon: <MdLibraryBooks  />, title: "Session 3", address: "/doubt3/664a22a5fa6d7b03f92046bb" },
    ]},
  
    { icon: <GrTasks />, title: "Posttest", address: "/test/66430940d161a10cf56217b5" },

    // { icon: <MdGrade  />, title: "Grades", address: "/leaderboard" },
  ];
  const studentData = [
    { icon: <RiHomeSmileFill  />, title: "Dashboard", address: "/home" },
    // { icon: <GrTasks />, title: "Test", address: "/tests" },
    { icon: <GrTasks />, title: "Pretest", address: "/test/6643090f1845bac6caaa45ef" },
    // { icon: <AiOutlineRead />, title: "Lessons", address: "/lessons" },
    { icon: <MdLooksOne />, title: "Pertemuan 1", childrens: [
      { icon: <MdVideoLibrary  />, title: "Session 1", address: "/contents" },
      // { icon: <IoBulbOutline />, title: "Knowledge", address: "/doubts" },
      { icon: <IoGameController  />, title: "Session 2", address: "/scratchs" },
      { icon: <MdLibraryBooks  />, title: "Session 3", address: "/doubt/6644eb2636db1f98901851bc" },
    ]},
    { icon: <MdLooksTwo />, title: "Pertemuan 2", childrens: [
      { icon: <MdVideoLibrary  />, title: "Session 1", address: "/contents2" },
      { icon: <IoGameController  />, title: "Session 2", address: "/scratchs2" },
      // { icon: <MdOutlineAssignment />, title: "Session 3", address: "/assignments2" },
      { icon: <MdLibraryBooks  />, title: "Session 3", address: "/doubt2/6644eb4836db1f98901851c0" },
    ]},
    { icon: <MdLooks3 />, title: "Pertemuan 3", childrens: [
      { icon: <MdVideoLibrary  />, title: "Session 1", address: "/contents3" },
      // { icon: <IoBulbOutline />, title: "Knowledge", address: "/doubts" },
      { icon: <IoGameController  />, title: "Session 2", address: "/scratchs3" },
      { icon: <MdLibraryBooks  />, title: "Session 3", address: "/doubt3/664a22a5fa6d7b03f92046bb" },
    ]},
    { icon: <GrTasks />, title: "Posttest", address: "/test/66430940d161a10cf56217b5" },

    // { icon: <MdGrade  />, title: "Grades", address: "/leaderboard" },
  ];

  // Dropdown menu
  const items = [
    {
      key: "1",
      label:
      <span className="text-center block" style={{ borderBottom: "1px solid rgb(231, 231, 231)" }}>
      <p>{name}</p>
      <p> as {userType} </p>
      </span>,
    },
      {
        key: "2",
        label: (
          <span className="flex justify-end items-center">
          Settings
          <IoSettingsSharp className="text-gray-500 ml-2" />
        </span>
      ),
      },
        {
          key: "3",
          label:
          <span onClick={() => handleLogout()} className="flex justify-end items-center">
            Logout
            < IoLogOut className="text-gray-500 ml-2" />
            </span>,
        }
  ];

  //logout function
  const handleLogout = () => {
    dispatch(authLogout());
  };
  
  return (
    <>
      {/* Side Bar */}
      <div id="sidebar" className={toggle ? "hide" : ""}>
        <Link href="/" className="logo">
          <div className="logoBox">
            <img src={logo} alt="logo" />
            <LuLayoutGrid
              className="menuIconHidden"
              onClick={() => setToggle(!toggle)}
            />
          </div>
        </Link>

        {/* Side bar menu */}
        <ul className="side-menu top">
          {userType === "Tutor"
            ? tutorData?.map((data, i) => {
              return (
                <SidebarItem key={i} item={data} />
              );
              })
            : ""}
          {userType === "Student"
            ? studentData?.map((data, i) => {
              return (
                <SidebarItem key={i} item={data} />
              );
              })
            : ""}
          {userType === "Admin"
            ? adminData?.map((data, i) => {
              return (
                <SidebarItem key={i} item={data} />
              );
              })
            : ""}
          
          {/* <span onClick={() => handleLogout()}>
            <Menu Icon={<IoLogOut  />} Title={"Logout"} Address={""} />
          </span> */}
        </ul>
      </div>

      {/* Top Bar */}
      <div id="content">
        <nav>
          <div>
            <AiFillAppstore 
              className="menuIcon"
              onClick={() => setToggle(!toggle)}
            />
            {userType == "Student" ? (
              premium == "false" ? (
                <Link href="/" className="nav-link font-sans">
                  Welcome to BelajarIN
                </Link>
              ) : (""
              )
            ) : (
              <Link href="/" className="nav-link font-sans">
                Welcome to BelajarIN
              </Link>
            )}
          </div>
          <div>
            {/* <Link href="/" className="notification">
              <BsBell />
              <span className="num number">4</span>
            </Link> */}
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <Link href="/" className="profile font-sans">
                <img src={user} />
                <div>
                  <p className="font-sans">{name}..</p>
                  <p className="font-sans">
                    {userType} <GoChevronDown />
                  </p>
                </div>
              </Link>
            </Dropdown>
          </div>
        </nav>
        {children}
      </div>
    </>
  );
};

export default Navbar;