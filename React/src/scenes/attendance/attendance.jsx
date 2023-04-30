import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme, Box, Button, Dialog, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import InputProps from '@mui/material';
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Attenddance = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [attdata, setAttData] = useState([]);



    //get 資料
    useEffect(() => {
        axios.get('http://127.0.0.1:3702/attdance')
            .then(response => {
                setAttData(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);







    const [filter, setFilter] = useState({
        employee_account: '',
        starttime: '',
        att_status_name: ''
    });

    const filteredAtt = attdata.filter((att) => {
        const { employee_account, starttime, att_status_name } = filter;
        const attemployee_account = att.employee_account ? att.employee_account.toLowerCase() : '';
        const attatt_status_name = att.att_status_name ? att.att_status_name.toLowerCase() : '';
        return (
            attemployee_account.includes(employee_account.toLowerCase()) &&
            att.starttime.includes(starttime) &&
            attatt_status_name.includes(att_status_name.toLowerCase())
        )
    })

    const handleChange = (event) => {
        setFilter({ ...filter, [event.target.name]: event.target.value });
    };

    //修改
    const [clickOpen, setclickOpen] = useState(false);
    const [chattdata, setChattData] = useState(null);

    const handleClick = (att) => {
        setChattData(att);
        setclickOpen(true);
    }

    const handleClose = () => {
        setclickOpen(false);
    }

    const handleSaveClick = (newData) => {
        // 在這裡將修改後的數據保存到資料庫
        console.log(newData)
        axios.put(`http://127.0.0.1:3702/attdance/`, newData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });

        // 然後更新狀態以刷新表格
        const updatedRows = attdata.map(row =>
            row.id === chattdata.id ? chattdata : row
        );
        setAttData(updatedRows);
        setclickOpen(false);
    };




    return (
        <Box m="20px">
            <Header title="出缺勤" />
            <TableContainer sx={{ '& label.Mui-focused': { color: '#4cceac' } }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'Space-evenly', padding: '10px' }}>
                        <TextField
                            sx={{
                                width: '100%', m: 1, '& label.Mui-focused': { color: '#4cceac', },
                                '& .MuiInputLabel-filled': { color: '#4cceac', fontSize: "22px" },
                                '& .MuiFilledInput-root': { fontSize: '22px' },
                            }}
                            name="employee_account"
                            label="員工工號"
                            variant="filled"
                            value={filter.employee_account}
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{
                                width: '100%', m: 1, '& label.Mui-focused': { color: '#4cceac', },
                                '& .MuiInputLabel-filled': { color: '#4cceac', fontSize: "22px" },
                                '& .MuiFilledInput-root': { fontSize: '22px' },
                            }}
                            name="starttime"
                            label="開始日期"
                            type="month"
                            variant="filled"
                            InputLabelProps={{ shrink: true }}
                            value={filter.starttime}
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{
                                width: '100%', m: 1, '& label.Mui-focused': { color: '#4cceac', },
                                '& .MuiInputLabel-filled': { color: '#4cceac', fontSize: "22px" },
                                '& .MuiFilledInput-root': { fontSize: '22px' },
                            }}

                            name="att_status_name"
                            label="類別"
                            variant="filled"
                            value={filter.att_status_name}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <Table sx={{ backgroundColor: colors.primary[400] }}>
                    <TableHead
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            '& .MuiTableCell-root': { fontSize: '22px', textAlign: "center" },
                        }}>
                        <TableRow >
                            {/* <TableCell sx={{ textAlign: 'center' }}>編號</TableCell> */}
                            <TableCell>員工工號</TableCell>
                            <TableCell>員工姓名</TableCell>
                            <TableCell>開始日期</TableCell>
                            <TableCell>結束日期</TableCell>
                            <TableCell>類別</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAtt.map((att) => (
                            <TableRow key={att.id} sx={{ '& .MuiTableCell-root': { fontSize: '22px', textAlign: "center" } }}>
                                {/* <TableCell sx={{ textAlign: 'center' }}>{att.id}</TableCell> */}
                                <TableCell >{att.employee_account}</TableCell>
                                <TableCell >{att.employee_name}</TableCell>
                                <TableCell >{new Date(att.starttime).toLocaleString('zh-TW', {
                                    hour12: false,
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}</TableCell>
                                <TableCell >{new Date(att.endtime).toLocaleString('zh-TW', {
                                    hour12: false,
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}</TableCell>
                                <TableCell >{att.att_status_name}</TableCell>
                                <TableCell>
                                    <Button variant="contained" sx={{ fontSize: "22px" }} color="primary" onClick={() => handleClick(att)}>
                                        修改
                                    </Button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {chattdata && (
                    <Dialog open={clickOpen} onClose={handleClose}>
                        <DialogTitle sx={{ fontSize: "22px" }}>修改資料</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="員工姓名"
                                value={chattdata.employee_name}
                                fullWidth
                                disabled
                                variant='filled'

                                sx={{
                                    '& label.Mui-focused': { color: '#4cceac', },
                                    '& .MuiInputLabel-filled': { color: '#4cceac', fontSize: "22px" },
                                    '& .MuiFilledInput-root': { fontSize: '22px' },
                                    m: 1
                                }}

                            />

                            <TextField
                                label="開始日期"
                                type="datetime-local"
                                value={chattdata.starttime}
                                fullWidth
                                variant='filled'
                                sx={{
                                    '& label.Mui-focused': { color: '#4cceac', },
                                    '& .MuiInputLabel-filled': { color: '#4cceac', fontSize: "22px" },
                                    '& .MuiFilledInput-root': { fontSize: '22px' },
                                    m: 1
                                }}
                                onChange={(event) =>
                                    setChattData({
                                        ...chattdata,
                                        starttime: event.target.value,
                                    })
                                }

                            />
                            <TextField
                                label="結束日期"
                                type="datetime-local"
                                value={chattdata.endtime}
                                fullWidth
                                variant="filled"
                                sx={{
                                    '& label.Mui-focused': { color: '#4cceac', },
                                    '& .MuiInputLabel-filled': { color: '#4cceac', fontSize: "22px" },
                                    '& .MuiFilledInput-root': { fontSize: '22px' },
                                    m: 1
                                }}
                                onChange={(event) =>
                                    setChattData({
                                        ...chattdata,
                                        endtime: event.target.value,
                                    })
                                }

                            />
                            {/* <TextField
                                label="假別"
                                //value為null的話，會導致React無法正確管理元件的狀態
                                value={chattdata.att_status_name !== null ? chattdata.att_status_name : ''}
                                fullWidth
                                onChange={(event) =>
                                    setChattData({
                                        ...chattdata,
                                        att_status_name: event.target.value,
                                    })
                                }
                            /> */}
                            <Button variant="contained" onClick={() => handleSaveClick(chattdata)} sx={{ fontSize: "22px", m: 1 }} color='secondary' >
                                儲存
                            </Button>
                        </DialogContent>
                    </Dialog>
                )}
            </TableContainer>
        </Box>

    );
}
export default Attenddance;
