import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";

import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Form from "./scenes/form";

import Factory from "./scenes/factory";
import Login from "./scenes/login";

import Sidebar from "./scenes/global/Sidebar";
import OvertimeFormik from "./scenes/overtime";
import LeaveFormik from "./scenes/leave";
import TotalLeave from "./scenes/total_leave";

import Inventory from "./components/inventor";
import Order from "./scenes/order/order";
import Attendance from "./scenes/attendance/attendance";
import Customers from "./scenes/customers/customers";




import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content" style={ {marginLeft:  "19em"}}>
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/form" element={<Form />} />
              <Route path="/factory" element={<Factory />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/login" element={<Login />} />
              <Route path="/overtime" element={<OvertimeFormik />} />
              <Route path="/leave" element={<LeaveFormik />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/order" element={<Order />} />
              <Route path="/customers" element={<Customers />} />

              {/* <Route path="/attendance" element={<Attendance />} /> */}
              <Route path="/total_leave" element={<TotalLeave />} />
            </Routes>
          </main>
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