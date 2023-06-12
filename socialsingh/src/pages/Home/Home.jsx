import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import RightBar from "../../components/rightbar/RightBar"
import "./home.css";
import { useContext, useState } from "react";
import axios from "axios"
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {

  return (
    <>
    <Topbar/>
    <div className="homeContainer">
      <Sidebar />
      <Feed />
      <RightBar/>
    </div>
    </>
  )
}

export default Home
