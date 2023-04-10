// import { Box, useTheme } from "@mui/material";
// import { Box, Typography, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
import { Box } from "@mui/material";

// import { mockDataTeam } from "../../data/mockData";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
// import Header from "../../components/Header";
import MachineCard from "../../components/MachineCard";
import MachineCard1 from "../../components/MachineCard1";
import MachineCard2 from "../../components/MachineCard2";
import Header from "../../components/Header";

const Factory = () => {
  return (
    <Box m="20px">
      <Header title="MACHINE OVERVIEW" subtitle="Machine Status" />
      <Box m="40px 0 0 0" height="75vh">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          <Box
            gridColumn="span 3"
            gridRow="span 2"
            p="15px"
          >
            <MachineCard />
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 2"
            p="15px"
          >
            <MachineCard1 />
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 2"
            p="15px"
          >
            <MachineCard2 />
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 2"
            p="15px"
          >
            <MachineCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Factory;
