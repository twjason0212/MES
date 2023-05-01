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
import withAuth from "../../components/withAuth";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState(null);
  //宣告監控filrer變數
  const [filter, setFilter] = useState({
    EmployeeName: '',
    startwork: '',
    holiday: ''
  });


  //表單按下單比修改後觸發
  const handleClick = (row) => {
    //請求後端查詢該筆員工id的員工資訊
    axios.get('http://localhost:3702/employee/' + row.employee_id)
      .then(response => {
        row = response.data;
      })
      .catch(error => {
        console.error(error);
      });

    //將剛選的員工資訊設定回監控的clickedRow
    setClickedRow(row);
    //將Dialog開啟
    setOpen(true);
  };

  //關閉Dialog時觸發
  const handleClose = () => {
    //將Dialog關閉
    setOpen(false);
  }

  //初始觸發
  useEffect(() => {
    //獲取後端員工清單
    getUsers();
  }, []);

  //獲取員工清單方法
  function getUsers() {
    //請求後端查詢員工列表
    axios.get('http://localhost:3702/employee')
      .then(response => {
        //設定users的資料為後端請求的員工清單
        setUsers(response.data)
      })
      .catch(error => {
        console.error(error);
      });

  }

  //查詢員工方法
  const changeUser = (value) => {
    if (value == "") {
      getUsers();
    } else {
      console.log(value)
      axios.get('http://localhost:3702/employee/select/' + value)
        .then(response => {
          //查詢出來的解果設定回users
          setUsers(response.data)
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  // //查詢員工方法
  // const changeByDateUser = (value) => {
  //   if (value == "") {
  //     getUsers();
  //   } else {
  //     axios.get('http://localhost:3702/employee/selectDate/' + value)
  //       .then(response => {
  //         //查詢出來的解果設定回users
  //         setUsers(response.data)
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   }
  // }

  const handleChange = (event) => {
    console.log(event)
    setFilter({ ...filter, [event.target.name]: event.target.value });
    changeUser(event.target.value);
  };

  // const handleDateChange = (event) => {
  //   setFilter({ ...filter, [event.target.name]: event.target.value });
  //   changeUser(event.target.value);
  // };

  const handleSaveClick = (newData) => {
    console.log(newData)
    // 在這裡將修改後的數據保存到資料庫
    axios.put(`http://127.0.0.1:3702/employee/update`, newData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });

    // 然後更新狀態以刷新表格
    const updatedRows = users.map(row =>
      row.employee_id === clickedRow.employee_id ? clickedRow : row
    );
    setUsers(updatedRows);
    setOpen(false);
  };

  const columns = [
    { field: 'employee_id', headerName: 'Id', width: 90 },
    {
      field: 'employee_account',
      headerName: '員工帳號',
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
      width: 110,
      editable: true,
    },
    {
      field: 'employee_tel',
      headerName: '電話',
      width: 150,
      fontSize: 22,
      editable: true,
    },
    {
      field: 'employee_email',
      headerName: '信箱',
      width: 350,
      fontSize: 22,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <Box>

            <Button variant="contained" color="primary" onClick={() => handleClick(params.row)} style={{ fontSize: '22px', backgroundColor: "#21b6ae" }}>
              編輯
            </Button>
            &nbsp;&nbsp;&nbsp;

          </Box>
        );
      },
    },
    // {
    //   field: "accessLevel",
    //   headerName: "Access Level",
    //   flex: 1,
    //   renderCell: ({ row: { access } }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === "admin"
    //             ? colors.greenAccent[600]
    //             : access === "manager"
    //               ? colors.greenAccent[700]
    //               : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "user" && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // }
  ];



  return (
    <TableContainer>
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <div>
        <div style={{ display: 'flex', justifyContent: 'Space-evenly', padding: '10px' }}>
          <TextField
            name="Employee Name"
            label="員工姓名"
            //value={filter.EmployeeName}
            onChange={handleChange}
            sx={{
              width: '100%',
              m: 1,
              '& label.Mui-focused': { color: '#4cceac', },
              '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
              '& .MuiOutlinedInput-root': { fontSize: '22px' },
            }}
          />
          {/* <TextField
            name="startwork"
            label="報到日期"
            type="month"
            InputLabelProps={{ shrink: true }}
            // value={filter.startwork}
            onChange={handleChange}
            sx={{
              width: '100%',
              m: 1,
              '& label.Mui-focused': { color: '#4cceac', },
              '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
              '& .MuiOutlinedInput-root': { fontSize: '22px' },
            }}
          /> */}

        </div>
      </div>
      <Box sx={{ height: 600, width: '100%' }}>
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
          sx={{
            boxShadow: 2,
            border: 2,
            fontSize: 22,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main"
            }
          }}
        />
      </Box>

      {clickedRow && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>修改資料</DialogTitle>
          <DialogContent>
            <TextField
              label="員工姓名"
              defaultValue={clickedRow.employee_name}
              fullWidth
              onChange={(event) =>
                setClickedRow({
                  ...clickedRow,
                  employee_name: event.target.value,
                })
              }
              sx={{
                width: '100%',
                m: 1,
                '& label.Mui-focused': { color: '#4cceac', },
                '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                '& .MuiOutlinedInput-root': { fontSize: '22px' },
              }}
            />
            <TextField
              label="帳號"
              defaultValue={clickedRow.employee_account}
              fullWidth
              onChange={(event) =>
                setClickedRow({
                  ...clickedRow,
                  employee_account: event.target.value,
                })
              }
              sx={{
                width: '100%',
                m: 1,
                '& label.Mui-focused': { color: '#4cceac', },
                '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                '& .MuiOutlinedInput-root': { fontSize: '22px' },
              }}
            />

            <TextField
              label="電話"
              defaultValue={clickedRow.employee_tel}
              fullWidth
              onChange={(event) =>
                setClickedRow({
                  ...clickedRow,
                  employee_tel: event.target.value,
                })
              }
              sx={{
                width: '100%',
                m: 1,
                '& label.Mui-focused': { color: '#4cceac', },
                '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                '& .MuiOutlinedInput-root': { fontSize: '22px' },
              }}
            />
            <TextField
              label="信箱"
              defaultValue={clickedRow.employee_email}
              fullWidth
              onChange={(event) =>
                setClickedRow({
                  ...clickedRow,
                  employee_email: event.target.value,
                })
              }
              sx={{
                width: '100%',
                m: 1,
                '& label.Mui-focused': { color: '#4cceac', },
                '& .MuiInputLabel-outlined': { color: '#4cceac', fontSize: "22px" },
                '& .MuiOutlinedInput-root': { fontSize: '22px' },
              }}
            />

            <Button variant="contained" onClick={() => handleSaveClick(clickedRow)} style={{ fontSize: '22px', backgroundColor: "#21b6ae" }}>
              儲存
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </TableContainer>
  );
};

export default withAuth(Team);
