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
import { PiGameControllerDuotone  } from "react-icons/pi";
import { GoChevronDown, GoTrophy, GoHome } from "react-icons/go";
import { RiHomeSmileFill  } from "react-icons/ri";
import { AiOutlineSchedule, AiOutlineRead, AiOutlinePlayCircle } from "react-icons/ai";
import { CgGames } from "react-icons/cg";
import { IoBulbOutline } from "react-icons/io5";
import { MdOutlineAssignment, MdVideoLibrary, MdGrade  } from "react-icons/md";
import { FaUsers,FaUserCog   } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import { AiFillAppstore } from "react-icons/ai";
import { GiNotebook } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";


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
    { icon: <GrTasks />, title: "Test", address: "/tests" },
    // { icon: <AiOutlineRead />, title: "Lessons", address: "/lessons" },
    { icon: <AiFillAppstore />, title: "Pertemuan 1", childrens: [
      { icon: <MdVideoLibrary  />, title: "Session 1", address: "/contents" },
      // { icon: <IoBulbOutline />, title: "Knowledge", address: "/doubts" },
      { icon: <PiGameControllerDuotone  />, title: "Session 2", address: "/scratchs" },
      { icon: <GiNotebook />, title: "Session 3", address: "/doubt/6644a70f5ce2db152802428b" },
    ]},
    { icon: <AiFillAppstore />, title: "Pertemuan 2", childrens: [
      { icon: <MdVideoLibrary  />, title: "Session 1", address: "/contents2" },
      { icon: <PiGameControllerDuotone  />, title: "Session 2", address: "/scratchs2" },
      // { icon: <MdOutlineAssignment />, title: "Session 3", address: "/assignments2" },
      { icon: <GiNotebook />, title: "Session 3", address: "/doubt2/6644a5a54a912e856639ef7c" },
    ]},
    { icon: <AiFillAppstore />, title: "Pertemuan 3", childrens: [
      { icon: <MdVideoLibrary  />, title: "Session 1", address: "/contents3" },
      // { icon: <IoBulbOutline />, title: "Knowledge", address: "/doubts" },
      { icon: <PiGameControllerDuotone  />, title: "Session 2", address: "/scratchs3" },
      { icon: <GiNotebook />, title: "Session 3", address: "/doubt3" },
    ]},
    { icon: <MdGrade  />, title: "Grades", address: "/leaderboard" },
  ];
  const studentData = [
    { icon: <RiHomeSmileFill  />, title: "Dashboard", address: "/home" },
    { icon: <GrTasks />, title: "Test", address: "/tests" },
    // { icon: <AiOutlineRead />, title: "Lessons", address: "/lessons" },
    { icon: <TbLayoutGridAdd />, title: "Pertemuan 1", childrens: [
      { icon: <AiOutlinePlayCircle />, title: "Session 1", address: "/contents" },
      // { icon: <IoBulbOutline />, title: "Knowledge", address: "/doubts" },
      { icon: <CgGames />, title: "Session 2", address: "/scratchs" },
      { icon: <GiNotebook />, title: "Session 3", address: "/assignments" },
    ]},
    { icon: <TbLayoutGridAdd />, title: "Pertemuan 2", childrens: [
      { icon: <AiOutlinePlayCircle />, title: "Session 1", address: "/contents2" },
      { icon: <CgGames />, title: "Session 2", address: "/scratchs2" },
      // { icon: <MdOutlineAssignment />, title: "Session 3", address: "/assignments2" },
      { icon: <IoBulbOutline />, title: "Session 3", address: "/doubt/664465f447d788afda3c4dac" },
    ]},
    { icon: <TbLayoutGridAdd />, title: "Pertemuan 3", childrens: [
      { icon: <AiOutlinePlayCircle />, title: "Session 1", address: "/contents3" },
      // { icon: <IoBulbOutline />, title: "Knowledge", address: "/doubts" },
      { icon: <CgGames />, title: "Session 2", address: "/scratchs3" },
      { icon: <MdOutlineAssignment />, title: "Session 3", address: "/assignments3" },
    ]},
    { icon: <MdGrade  />, title: "Grades", address: "/leaderboard" },
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
            <Menu Icon={<IoLogOut  />} Title={"Logout"} Address={""} />
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