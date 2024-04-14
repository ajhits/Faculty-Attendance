
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import useAuth from "./firebase/Auth/StatusLogin";


const Index = () =>{

  const { user,data } = useAuth();

 
  return(
  <BrowserRouter>
      {user === "login" && <Login  /> }
      {user === "panel" && <Admin data={data}/> }
  </BrowserRouter>
  )
}


ReactDOM.render( <Index />, document.getElementById("root") );

const Admin = ({data}) => {



  return(
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="*" element={<Navigate to="/admin/index" replace />} />
    </Routes>
  )
}

const Login = () => {
  return(
    <Routes>
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  )
}