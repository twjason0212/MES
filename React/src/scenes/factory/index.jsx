// import { Box, useTheme } from "@mui/material";
// import { Box, Typography, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { mockDataTeam } from "../../data/mockData";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
// import Header from "../../components/Header";
// import MachineCard from "../../components/MachineCard";
// import * as React from "react";
import Header from "../../components/Header";
import Grid from "@mui/material/Unstable_Grid2";
import imgUrl from "../../media/pngwing.png";
import imgUrl1 from "../../media/pngwing1.png";
import imgUrl2 from "../../media/pngwing2.png";
import {
  Typography,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material/";
import withAuth from "../../components/withAuth";


const Factory = () => {
  const [machines, setMachines] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const diaFunc = (data) => {
    setDialog(data);
    setOpen(true);
  };

  // useEffect(() => {
  //   const jsonString =
  //     '{"machines": [{"uuid": "Mac-001", "brand": "Fanuc", "status":"success", "imageUrl":"../../media/pngwing.png"}, {"uuid": "Mac-002", "brand": "MAZAK", "status":"warning", "imageUrl":"../../media/pngwing1.png"}, {"uuid": "Mac-003", "brand": "MAZAK", "status":"error", "imageUrl":"../../media/pngwing2.png"},{"uuid": "Mac-004", "brand": "Fanuc", "status":"success", "imageUrl":"../../media/pngwing.png"}]}';
  //   const jsonObject = JSON.parse(jsonString);
  //   setMachines(jsonObject.machines);
  // }, []);

  useEffect(() => {
    fetch("http://localhost:3702/machine_list")
      .then((response) => response.json())
      .then((data) => setMachines(data));
  }, []);

  return (
    <Box m="20px">
      <Header title="MACHINE OVERVIEW" subtitle="Machine Status" />
      <Box m="20px 0 0 0" height="75vh">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="2px"
        >
          {machines.map((machine, index) => (
            <Box gridColumn="span 3" gridRow="span 2" p="10px" key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid xs={4}>
                      <Typography variant="h3" component="div">
                        {machine.uuid}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ mb: 1.5 }}
                        color="text.secondary"
                      >
                        {machine.brand}
                      </Typography>
                      <CircularProgress
                        color={
                          machine.status === 0
                            ? "success"
                            : machine.status === 1
                              ? "warning"
                              : "error"
                        }
                        variant="determinate"
                        value={100}
                        size="6rem"
                        thickness={8}
                      />
                    </Grid>
                    <Grid xs={8}>
                      <CardMedia
                        component="img"
                        sx={{ width: "100%" }}
                        image={
                          machine.brand === "FANUC"
                            ? imgUrl
                            : machine.brand === "MAZAK"
                              ? imgUrl1
                              : imgUrl2
                        }
                        alt="Live from space album cover"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    fullWidth={true}
                    onClick={() => diaFunc(machine)}
                  >
                    <Typography variant="h4">Detail</Typography>
                  </Button>
                  {/* 彈出 */}
                  {dialog && (
                    <Dialog
                      open={open}
                      onClose={() => setOpen(false)}
                      aria-labelledby="dialog-title"
                      aria-describedby="dialog-description"
                    >
                      <DialogTitle id="dialog-title">
                        <Typography variant="h1">{dialog.uuid}</Typography>
                      </DialogTitle>

                      <DialogContent>
                        <DialogContentText id="dialog-description">
                          {/* <Typography variant="h3" mt={2}>
                            運行時間：{dialog.brand}
                          </Typography>
                          <br />
                          <Typography variant="h3" mt={2}>
                            待機時間：{dialog.brand}
                          </Typography>
                          <br /> */}
                          <Typography variant="h2" mt={2}>
                            目標完工件數：{dialog.tar_process_amount + "個"}
                          </Typography>
                          <br />
                          <Typography variant="h2" mt={2}>
                            實際完工件數：{dialog.real_process_amount + "個"}
                          </Typography>
                          <br />
                          <Typography variant="h2" mt={2}>
                            當日稼動率：{dialog.day_availability + "%"}
                          </Typography>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          variant="contained"
                          color="secondary"
                          autoFocus
                          onClick={() => setOpen(false)}
                        >
                          <Typography variant="h4">Cancel</Typography>
                        </Button>
                      </DialogActions>
                    </Dialog>
                  )}
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default withAuth(Factory);
