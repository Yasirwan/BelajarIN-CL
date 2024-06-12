import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../Redux/dashboard/action";
import { getStudentData } from "../../Redux/student/action";

//Component imports
import Navbar from "../../Components/Sidebar/Navbar";
import SalesDiv from "../../Components/SalesDiv/SalesDiv";
import Header from "../../Components/Header/Header";
import LeaderboardRow from "../../Components/Table/LeaderboardRow";
import heroImage from '/img/hero2.png';

// Icons import
import { PiKeyReturnThin, PiCurrencyCircleDollarLight } from "react-icons/pi";
import { FiShoppingCart } from "react-icons/fi";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { BsTruck, BsClipboardMinus, BsDownload } from "react-icons/bs";
import { AiOutlineTag, AiOutlineLineChart } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { BiLogOut, BiUserVoice } from "react-icons/bi";
import { PiStudentDuotone } from "react-icons/pi";
import { AiOutlineQuestion } from "react-icons/ai";
import { TbLayoutGridAdd, TbUsers, TbBrandSpeedtest } from "react-icons/tb";
import {
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

//CSS imports
import "react-vertical-timeline-component/style.min.css";
import { Tooltip } from "antd";
import "./Home.css";

//Image imports
import demo from "../../Assets/cartoon.svg";

//Data imports
import { barData, pieData, COLORS } from "../../data.js";
import StudentRow from "../../Components/Table/StudentRow.jsx";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: { isAuthenticated },
  } = useSelector((store) => store.auth);

  const { dashboard } = useSelector((store) => store.dashboard);
  const { students } = useSelector((store) => store.student)

  //overview data
  const overviewData = [
    // // {
    // //   icon: <RiAdminLine />,
    // //   title: "Admins",
    // //   number: dashboard?.admins?.length || 0,
    // // },
    // {
    //   icon: <PiStudentDuotone />,
    //   title: "Students",
    //   number: dashboard?.students?.length || 0,
    // },
    // // {
    // //   icon: <BiUserVoice />,
    // //   title: "Guests",
    // //   number: dashboard?.tutors?.length || 0,
    // // },
    // {
    //   icon: <TbLayoutGridAdd />,
    //   title: "Contents",
    //   number: dashboard?.contents?.length || 0,
    // },
    // {
    //   icon: <TbBrandSpeedtest />,
    //   title: "Scratchs",
    //   number: dashboard?.scratchs?.length || 0,
    // },
    // {
    //   icon: <AiOutlineQuestion />,
    //   title: "Doubts",
    //   number: dashboard?.doubts?.length || 0,
    // },
  ];

  useEffect(() => {
    dispatch(getDashboardData());
    dispatch(getStudentData());
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar>
        {/* <h1 className="text-xl font-bold text-red-500">Hello World</h1> */}
        <div className="main">
        <Header Title={"Dashboard"} Address={"Dashboard"} />
          {/* Header */}

          {/* overview section */}
          <div className="flex flex-row justify-between w-full">
          <div className="dashboard-left w-3/4">
          <div className="overview">
          <div className="overview-left">
          <img src={heroImage}/>
          <div flex flex-col>
              <div>
                <h2> BELAJARIN</h2>
                <p>Multimedia pembelajaran interaktif mengimplementasikan model pembelajaran Scaffolding.  Dirancang untuk menciptakan suasana belajar yang menyenangkan dan meningkatkan pemahaman kognitif siswa. Digunakan sebagai media pembelajaran dalam skripsi dan akan diimplementasikan di SMKN 4 Padalarang.</p>
              </div>
              <div>
                <button>Belajarin Sekarang</button>
              </div>
              </div>
            </div>
            <div className="overview-right">
              {overviewData?.map(({ icon, title, number }, i) => {
                return (
                  <SalesDiv Icon={icon} Title={title} Number={number} key={i} />
                );
              })}
            </div>
          </div>

          {/* Bar nd Pie Chart */}
          <div className="charts ">

            <div className="leaderboardData m-0 w-full">
              <div className="chartHead bg-#920000 px-4 py-2 rounded-t-lg ">
                <p className="text-gray-800 font-bold font-sans">Skor</p>
              </div>
              {/* table */}
              <section className="tableBody">
                <table className="">
                  <thead>
                    <tr>
                      <th className="font-sans">Class</th>
                      <th className="font-sans">Name</th>
                      <th className="font-sans">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students
                      .map((data, i) => (
                        <tr className="tableRow">
                          <td className="font-sans">{data.class}</td>
                          <td className="font-sans">{data.name}</td>
                          <td className="font-sans">{data.totalScore}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </section>
            </div>
          </div>
          </div>


          <div className="dashboard-right w-1/4 px-6 py-6">
            <div className="pieChart bg-white border border-gray-200 rounded-lg shadow-md float-left h-full ">
                <div className="chartHead bg-#920000 px-4 py-2 rounded-t-lg">
                    <p className="text-gray-800 font-bold font-sans">Pemberitahuan</p>
                </div>
                <div className="pieBox p-4 ">
                    <div className="pieData">
                        <span className="block font-bold text-red-700 text-center pl-3 font-sans">Read This !</span>
                        <p>&nbsp;</p>
                        <p className="text-wrap text-black-700 text-justify">
                            <ul className="list-disc pl-1">
                                <li className="font-sans">Please follow the instructions for using the BelajarIN website according to the teacher's instructions. Do all sessions properly and report any errors on the website to the teacher. Thank you for helping with this research and good luck.</li>
                                
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
            </div>
            </div>
          <div className="homeFooter font-sans">
          Copyright © 2024 BelajarIN
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Home;
