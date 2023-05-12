import { Box, IconButton } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";


const Topbar = () => {


  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* ICONS */}
      <Box display="flex">
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton> 
      </Box>
    </Box>
  );
};

export default Topbar;
