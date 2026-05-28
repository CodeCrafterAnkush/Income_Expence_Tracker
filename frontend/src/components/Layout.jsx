import React ,{useState}from "react";
import { Outlet } from "react-router-dom";
import {styles} from "../assets/dummyStyles"
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({onLogout,user}) => {
  const [sidebarCollapsed, serSidebarCollapsed] = React.useState(false);
  return (
    <div className = {styles.layout.root}>
        <Navbar user={user} onLogout={onLogout}/>
        <Sidebar user={user} isCollapsed ={sidebarCollapsed} setIsCollapsed ={serSidebarCollapsed}/>
    </div>
  );
};

export default Layout;