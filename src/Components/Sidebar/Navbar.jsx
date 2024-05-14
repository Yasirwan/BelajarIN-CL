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
import { BiLogOut } from "react-icons/bi";
import { TbLayoutGridAdd } from "react-icons/tb";
import { LuLayoutGrid } from "react-icons/lu";
import { PiStudent, PiChalkboardTeacher } from "react-icons/pi";
import { GoChevronDown, GoTrophy, GoHome } from "react-icons/go";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineSchedule, AiOutlineRead, AiOutlinePlayCircle } from "react-icons/ai";
import { CgGames } from "react-icons/cg";
import { IoBulbOutline } from "react-icons/io5";
import { MdOutlineAssignment } from "react-icons/md";

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
    { icon: <GoHome />, title: "Dashboard", address: "/home" },
    { icon: <RiAdminLine />, title: "Admin", address: "/admin" },
    // { icon: <PiChalkboardTeacher />, title: "Tutors", address: "/tutor" },
    { icon: <PiStudent />, title: "Students", address: "/student" },
    { icon: <AiOutlineSchedule />, title: "Test", address: "/tests" },
    // { icon: <AiOutlineRead />, title: "Lessons", address: "/lessons" },
    { icon: <TbLayoutGridAdd />, title: "Pertemuan 1", childrens: [
      { icon: <AiOutlinePlayCircle />, title: "Session 1", address: "/contents" },
      // { icon: <IoBulbOutline />, title: "Knowledge", address: "/doubts" },
      { icon: <CgGames />, title: "Session 2", address: "/scratchs" },
      { icon: <MdOutlineAssignment />, title: "Session 3", address: "/assignments" },
    ]},
    { icon: <TbLayoutGridAdd />, title: "Pertemuan 2", childrens: [
      { icon: <AiOutlinePlayCircle />, title: "Session 1", address: "/contents2" },
      // { icon: <IoBulbOutline />, title: "Knowledge", address: "/doubts" },
      { icon: <CgGames />, title: "Session 2", address: "/scratchs2" },
      { icon: <MdOutlineAssignment />, title: "Session 3", address: "/assignments2" },
    ]},
    { icon: <TbLayoutGridAdd />, title: "Pertemuan 3", childrens: [
      { icon: <AiOutlinePlayCircle />, title: "Session 1", address: "/contents3" },
      // { icon: <IoBulbOutline />, title: "Knowledge", address: "/doubts" },
      { icon: <CgGames />, title: "Session 2", address: "/scratchs3" },
      { icon: <MdOutlineAssignment />, title: "Session 3", address: "/assignments3" },
    ]},
    { icon: <GoTrophy />, title: "Grades", address: "/leaderboard" },
  ];
  const studentData = [
    { icon: <GoHome />, title: "Dashboard", address: "/home" },
    { icon: <AiOutlineSchedule />, title: "Test", address: "/tests" },
    // { icon: <AiOutlineRead />, title: "Lessons", address: "/lessons" },
    { icon: <TbLayoutGridAdd />, title: "Pertemuan 1", childrens: [
      { icon: <AiOutlinePlayCircle />, title: "Session 1", address: "/contents" },
      // { icon: <IoBulbOutline />, title: "Knowledge", address: "/doubts" },
      { icon: <CgGames />, title: "Session 2", address: "/scratchs" },
      { icon: <MdOutlineAssignment />, title: "Session 3", address: "/assignments" },
    ]},
    { icon: <TbLayoutGridAdd />, title: "Pertemuan 2", childrens: [
      { icon: <AiOutlinePlayCircle />, title: "Session 1", address: "/contents" },
      // { icon: <IoBulbOutline />, title: "Knowledge", address: "/doubts" },
      { icon: <CgGames />, title: "Session 2", address: "/scratchs" },
      { icon: <MdOutlineAssignment />, title: "Session 3", address: "/assignments" },
    ]},
    { icon: <TbLayoutGridAdd />, title: "Pertemuan 3", childrens: [
      { icon: <AiOutlinePlayCircle />, title: "Session 1", address: "/contents" },
      // { icon: <IoBulbOutline />, title: "Knowledge", address: "/doubts" },
      { icon: <CgGames />, title: "Session 2", address: "/scratchs" },
      { icon: <MdOutlineAssignment />, title: "Session 3", address: "/assignments" },
    ]},
    
    { icon: <GoTrophy />, title: "Grades", address: "/leaderboard" },
  ];

  // Dropdown menu
  const items = [
    {
      key: "1",
      label: <span onClick={() => handleLogout()}>Logout</span>,
    },
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
          {/* {userType == "Student" && premium == "false" ? (
            <Menu
              Icon={<MdOutlineWorkspacePremium />}
              Title={"Premium"}
              Address={"/premium"}
            />
          ) : (
            ""
          )} */}
          <span onClick={() => handleLogout()}>
            <Menu Icon={<BiLogOut />} Title={"Logout"} Address={""} />
          </span>
        </ul>
      </div>

      {/* Top Bar */}
      <div id="content">
        <nav>
          <div>
            <LuLayoutGrid
              className="menuIcon"
              onClick={() => setToggle(!toggle)}
            />
            {userType == "Student" ? (
              premium == "false" ? (
                <Link href="/" className="nav-link">
                  Welcome to BelajarIN
                </Link>
              ) : (""
              )
            ) : (
              <Link href="/" className="nav-link">
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
              <Link href="/" className="profile">
                <img src={user} />
                <div>
                  <p>{name}..</p>
                  <p>
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