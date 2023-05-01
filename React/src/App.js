import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";

import Dashboard from "./scenes/dashboard";

import Team from "./scenes/team";
import Form from "./scenes/form";

import Factory from "./scenes/factory";
import Login from "./scenes/login";

import Sidebar from "./scenes/global/Sidebar";
import OvertimeFormik from "./scenes/overtime";
import LeaveFormik from "./scenes/leave";
import TotalLeave from "./scenes/total_leave";

import Inventory from "./scenes/inventory/inventor";
import Order from "./scenes/order/order";
import Attendance from "./scenes/attendance/attendance";
import Customers from "./scenes/customers/customers";
import WorkOrder from './scenes/workorder/workOrder';
import WorkOrderList from "./scenes/workorderlist/workorderlist";
import Attdatetime from "./scenes/attdatetime/attdatetime";
import Checkin from "./scenes/checkin/checkin";
import PendingWork from "./scenes/pendingwork/pendingwork";
import PendingWorkLeader from "./scenes/pendingwork/pendingworkLeader";
import WorlOrderAll from "./scenes/workorder/worlorderall";
import MyCard from "./scenes/employee";


import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const Layout = (props) => {
    const isLoggedIn = window.sessionStorage.getItem('res');
    return (
      <>
        {isLoggedIn && <Sidebar isSidebar={props.isSidebar} />}
        <main className="content" style={{ marginLeft: "19em" }}>
          {props.children}
        </main>
      </>
    );
  };

  const LoginLayout = (props) => {
    const isLoggedIn = window.sessionStorage.getItem('res');

    if (!isLoggedIn) {

      return (
        <main className="content" style={{ marginLeft: "19em" }}>
          <Login />
        </main>);
    } else {
      return (
        <>
          <main className="content" style={{ marginLeft: "19em" }}>
            {props.children}
            {!isLoggedIn && <Login />}
            <Navigate to="/checkin" />;
          </main>
        </>
      );
    }

  };






  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* <Sidebar isSidebar={isSidebar} /> */}
          {/* <main className="content" style={ {marginLeft:  "19em"}}> */}
          {/* <Topbar setIsSidebar={setIsSidebar} /> */}
          <Routes>
            <Route path="/" element={<LoginLayout></LoginLayout>} />

            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/team" element={<Layout><Team /></Layout>} />
            <Route path="/form" element={<Layout><Form /></Layout>} />
            <Route path="/factory" element={<Layout><Factory /></Layout>} />
            <Route path="/inventory" element={<Layout><Inventory /></Layout>} />
            <Route path="/overtime" element={<Layout><OvertimeFormik /></Layout>} />
            <Route path="/leave" element={<Layout><LeaveFormik /></Layout>} />
            <Route path="/attendance" element={<Layout><Attendance /></Layout>} />-
            <Route path="/order" element={<Layout><Order /></Layout>} />-
            <Route path="/customers" element={<Layout><Customers /></Layout>} />
            <Route path='/workorder' element={<Layout><WorkOrder /></Layout>} />-
            <Route path='/checkin' element={<Layout><Checkin /></Layout>} />-
            <Route path='/attdatetime' element={<Layout><Attdatetime /></Layout>} />-
            <Route path='/employee' element={<Layout><MyCard /></Layout>} />-
            <Route path='/workorderlist' element={<Layout><WorkOrderList /></Layout>} />-
            <Route path='/pendingwork' element={<Layout><PendingWork /></Layout>} />-
            <Route path='/pendingworkLeader' element={<Layout><PendingWorkLeader /></Layout>} />-
            <Route path='/worlorderall' element={<Layout><WorlOrderAll /></Layout>} />-

            {/* <Route path="/attendance" element={<Attendance />} /> */}
            <Route path="/total_leave" element={<Layout><TotalLeave /></Layout>} />
            <Route path="/*" element={<LoginLayout></LoginLayout>} />
          </Routes>
          {/* </main> */}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;



// {isLoggedIn && <Sidebar isSidebar={isSidebar} />}
//       <main className="content">
//         {isLoggedIn && <Topbar setIsSidebar={setIsSidebar} />}
//         <Routes>
//           <Route
//             path="/"
//             element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/team"
//             element={isLoggedIn ? <Team /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/form"
//             element={isLoggedIn ? <Form /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/factory"
//             element={isLoggedIn ? <Factory /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/inventory"
//             element={isLoggedIn ? <Inventory /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/login"
//             element={<Login setIsLoggedIn={setIsLoggedIn} />}
//           />
//         </Routes>
//       </main>