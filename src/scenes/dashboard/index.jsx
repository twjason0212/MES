import { Box, Typography, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import ProgressCircle from "../../components/ProgressCircle";
import PieChart from "../../components/PieChart";
import GoogleMaps from "../../components/GoogleMaps";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h3" fontWeight="600">
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
            <Typography>機台平均稼動率</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h3"
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
          <Typography variant="h3" fontWeight="600">
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
            <Typography>機台平均稼動率</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h3"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            庫存狀況
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
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
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;
