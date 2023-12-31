import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../context/auth";
import AuthRoute from "./AuthRoute";
import Home from "../pages/Home";
import SideMenu from "../partials/sideMenu/SideMenu";
import { Layout } from "antd";
import Header from "../partials/header/Header";
import MainContent from "../partials/mainContent/MainContent";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Contacts from "../pages/Contacts";

export default function AppRouter() {
  const [collapse, setCollapse] = useState(false);
  const [sideMenuVisible, setSideMenuVisible] = useState(false)
  return (
    <AuthProvider>
      <Router>
        <Layout hasSider>
          <SideMenu OnCollapse={(collapse) => setCollapse(collapse)} SideMenuVisible={(value) => setSideMenuVisible(value)} />
          <Layout
            className={`site-layout ${sideMenuVisible && (!collapse ? "ml-md" : "ml-20")}`}
          >
            <Header />
            <MainContent>
              <AuthRoute exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/dashboard" component={Dashboard} />
              <AuthRoute exact path="/contacts" component={Contacts} />
            </MainContent>
          </Layout>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
