import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import * as React from "react";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from "axios";
import { Box, Button, Dialog, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, useTheme, Typography } from '@mui/material';

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState(null);
  // const onButtonDelClick = (row) => {
  //   // e.stopPropagation();
  //   setClickedRow(row);

  //   console.log("clickedRow:", clickedRow);

  //   axios.delete('http://localhost:3702/employee/del/' + row.employee_id)
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  //   console.log("set user");
  //   getUsers();
  //   console.log("reflash end");
  // };

  const handleClick = (row) => {
    // e.stopPropagation();
    console.log(row.employee_id);
    axios.get('http://localhost:3702/employee/' + row.employee_id)
      .then(response => {
        console.log("get response:", response.data[0]);
        console.log("get row:", row);
        row = response.data;
        // setClickedRow(response.data);
      })
      .catch(error => {
        console.error(error);
      });


    console.log("setnew row", clickedRow);
    setClickedRow(row);
    setOpen(true);
    // console.log("clickedRow:", clickedRow);
    // console.log("clickedRow:", clickedRow.employee_name);


    // getUsers();
    console.log("reflash end");
  };


  const handleClose = () => {
    setOpen(false);
  }

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

  const inputHandler = (event) => {
    axios.get('http://localhost:3702/employee/select/' + event.target.value)
      .then(response => {
        console.log(response.data);
        setUsers(response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }


  const handleSaveClick = (newData) => {
    // 在這裡將修改後的數據保存到資料庫
    axios.put(`http://127.0.0.1:3702/employee/update`, newData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });

    // 然後更新狀態以刷新表格
    // const updatedRows = users.map(row =>
    //   row.id === chattdata.id ? chattdata : row
    // );
    // setUsers(updatedRows);
    setOpen(false);
  };

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
            {/* <Button
              color="secondary"
              onClick={(e) => onButtonClick(e, params.row)}
              variant="contained"
            >
              Edit
            </Button>
             */}
            <Button variant="contained" color="primary" onClick={() => handleClick(params.row)}>
              編輯
            </Button>
            &nbsp;&nbsp;&nbsp;
            {/* <Button
              color="error"
              onClick={() => onButtonDelClick(params.row)}
              variant="contained"
            >
              Delete
            </Button> */}
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
    <TableContainer>
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <div>
        <div style={{ display: 'flex', justifyContent: 'Space-evenly', padding: '10px' }}>
          {/* <TextField sx={{ width: '100%', m: 1 }}
            name="Employee Name"
            label="員工姓名"
            value={filter.EmployeeName}
            onChange={inputHandler}
          />
          <TextField sx={{ width: '100%', m: 1 }}
            name="startwork"
            label="報到日期"
            type="month"
            InputLabelProps={{ shrink: true }}
            value={filter.startwork}
            onChange={inputHandler}
          /> */}
          {/* <TextField sx={{ width: '100%', m: 1 }}
            name="Department"
            label="部門"
            value={filter.EmployeeName}
            onChange={inputHandler}
          /> */}
        </div>
      </div>
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

      {clickedRow && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>修改資料</DialogTitle>
          <DialogContent>
            <TextField
              label="員工姓名"
              value={clickedRow.employee_name}
              fullWidth
            />
            <TextField
              label="帳號"
              value={clickedRow.employee_account}
              fullWidth
            />
            <TextField
              label="密碼"
              value={clickedRow.employee_pwd}
              fullWidth
            />
            <TextField
              label="電話"
              value={clickedRow.employee_tel}
              fullWidth
            />
            <TextField
              label="信箱"
              value={clickedRow.employee_email}
              fullWidth
            />

            <Button variant="contained" onClick={() => handleSaveClick(clickedRow)}>
              儲存
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </TableContainer>
  );
};

export default Team;
