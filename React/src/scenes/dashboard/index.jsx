import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import ProgressCircle from "../../components/ProgressCircle";
import PieChart from "../../components/PieChart";
// import GoogleMaps from "../../components/GoogleMaps";
import StatBox from "../../components/StatBox";
import PersonPin from "@mui/icons-material/PersonPin";
import InventoryIcon from "@mui/icons-material/Inventory";
import TaskIcon from "@mui/icons-material/Task";
import React, { useState, useEffect } from "react";




const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [workO, setWorkO] = useState([]);
  const [todoworkO, setTodWorkO] = useState([]);
  let woFinishRate = (todoworkO.todoWo) / (workO.totWo)
  let hunWoFinishRate = Math.round(woFinishRate * 100)

  const [emp, setEmp] = useState([]);
  const [punchInEmp, setPunchInEmp] = useState([]);
  let attRate = (punchInEmp.punchinemp) / (emp.emp)
  let hunAttRate = Math.round(attRate * 100)

  const [pro, setPro] = useState([]);
  const [proIsSafe, setProIsSafe] = useState([]);
  let proSaveRate = (proIsSafe.proTypeIsSafe) / (pro.proType)
  let hunProSaveRate = Math.round(proSaveRate * 100)


  const [machineAvgAva, setMachineAvgAva] = useState([]);
  let pIntmachineAvgAva=Math.round(machineAvgAva.avg)
  let decMachineAvgAva=(pIntmachineAvgAva)/100
  


  useEffect(() => {
    fetch('http://localhost:3702/allWorkO')
      .then(res => res.json())
      .then(data => setWorkO(data[0]))
  }, [])
  useEffect(() => {
    fetch('http://localhost:3702/todoWorkO')
      .then(res => res.json())
      .then(data => setTodWorkO(data[0]))
  }, [])

  useEffect(() => {
    fetch('http://localhost:3702/allEmp')
      .then(res => res.json())
      .then(data => setEmp(data[0]))
  }, [])
  useEffect(() => {
    fetch('http://localhost:3702/punchInEmp')
      .then(res => res.json())
      .then(data => setPunchInEmp(data[0]))
  }, [])

  useEffect(() => {
    fetch('http://localhost:3702/allPro')
      .then(res => res.json())
      .then(data => setPro(data[0]))
  }, [])
  useEffect(() => {
    fetch('http://localhost:3702/proIsSafe')
      .then(res => res.json())
      .then(data => setProIsSafe(data[0]))
  }, [])

  useEffect(() => {
    fetch('http://localhost:3702/machineAvgAva')
      .then(res => res.json())
      .then(data => setMachineAvgAva(data[0]))
  }, [])



  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW  */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >

          <StatBox
            title={isNaN(hunWoFinishRate) ? 0 + "%" : hunWoFinishRate + "%"}
            subtitle="今日工單進度"
            progress={isNaN(woFinishRate) ? 0 : woFinishRate}
            increase={workO.totWo + "/" + todoworkO.todoWo}
            icon={
              <TaskIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />

        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={hunAttRate + "%"}
            subtitle="應到人數/實到人數"
            progress={attRate}
            increase={emp.emp + "/" + punchInEmp.punchinemp}
            icon={
              <PersonPin
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={hunProSaveRate + "%"}
            subtitle="安全庫存狀態"
            progress={proSaveRate}
            increase={pro.proType + "/" + proIsSafe.proTypeIsSafe}
            icon={
              <InventoryIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="100%"
            subtitle="安全庫存狀態"
            progress="1.0"
            increase="100/100"
            icon={
              <InventoryIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* row2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h2" fontWeight="600">
            稼動狀況
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" progress={decMachineAvgAva} />

            <Typography
              variant="h3"
              color={colors.greenAccent[500]}
              sx={{ mt: "20px" }}
            >
              {pIntmachineAvgAva + "%"}
            </Typography>
            <Typography variant="h3">機台平均稼動率</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h2"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            圓餅圖類型2
          </Typography>
          <Box height="250px" mt="-20px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h2" fontWeight="600">
            稼動狀況
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h3"
              color={colors.greenAccent[500]}
              sx={{ mt: "20px" }}
            >
              75%
            </Typography>
            <Typography variant="h3">機台平均稼動率</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h2"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            庫存狀況
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h3"
            fontWeight="600"
            sx={{ padding: "30px 30px 10px 30px" }}
          >
            Google Map
          </Typography>
          <Box height="250px" mt="10px">
            <GoogleMaps />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;