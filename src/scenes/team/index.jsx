import { Box, Button, useTheme, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import * as React from "react";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from "axios";
import TextField from "@mui/material/TextField";


const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [clickedRow, setClickedRow] = useState([]);
  const [users, setUsers] = useState([]);

  const onButtonDelClick = (row) => {
    // e.stopPropagation();
    // setClickedRow(row);

    console.log(clickedRow);

    axios.delete('http://localhost:3702/employee/del/' + row.employee_id)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    console.log("set user");
    getUsers();
    console.log("reflash end");
  };

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    console.log("axios go ~~~~~");
    axios.get('http://localhost:3702/employee')
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.error(error);
      });

  }
  // const [inputText, setInputText] = useState([]);

  let inputHandler = (e) => {
    var value = e.target.value;
    axios.get('http://localhost:3702/employee/' + value)
      .then(response => {
        console.log(response.data);
        setUsers(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }

  const columns = [
    { field: 'employee_id', headerName: 'Id', width: 90 },
    {
      field: 'employee_account',
      headerName: '員工編碼',
      width: 150,
      editable: true,
    },
    {
      field: 'employee_name',
      headerName: '員工名稱',
      width: 150,
      editable: true,
    },
    {
      field: 'dept_name',
      headerName: '部門',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'employee_tel',
      headerName: '電話',
      width: 110,
      editable: true,
    },
    {
      field: 'employee_email',
      headerName: '信箱',
      width: 110,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 400,
      renderCell: (params) => {
        return (
          <Box>
            <Button
              color="secondary"
              // onClick={(e) => onButtonClick(e, params.row)}
              variant="contained"
            >
              Edit
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              color="error"
              onClick={() => onButtonDelClick(params.row)}
              variant="contained"
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];


  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      {/* <Box
         m="40px 0 0 0"
         height="75vh"
         sx={{
           "& .MuiDataGrid-root": {
             border: "none",
           },
           "& .MuiDataGrid-cell": {
             borderBottom: "none",
           },
           "& .name-column--cell": {
             color: colors.greenAccent[700],
           },
           "& .MuiDataGrid-columnHeaders": {
             backgroundColor: colors.blueAccent[700],
             borderBottom: "none",
           },
           "& .MuiDataGrid-virtualScroller": {
             backgroundColor: colors.primary[400],
           },
           "& .MuiDataGrid-footerContainer": {
             borderTop: "none",
             backgroundColor: colors.blueAccent[700],
           },
           "& .MuiCheckbox-root": {
             color: `${colors.greenAccent[200]} !important`,
           },
         }}
       >
       </Box> */}

      <TextField
        id="outlined-basic"
        variant="outlined"
        onChange={inputHandler}
        fullWidth
        label="Search"
      />
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(user) => user.employee_id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Team;