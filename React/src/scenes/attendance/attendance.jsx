import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import InputProps from '@mui/material';
const Attenddance = () => {

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
        EmployeeName: '',
        starttime: '',
        holiday: ''
    });

    const filteredAtt = attdata.filter((att) => {
        const { EmployeeName, starttime, holiday } = filter;
        const attEmployeeName = att.EmployeeName ? att.EmployeeName.toLowerCase() : '';
        const attHoliday = att.holiday ? att.holiday.toLowerCase() : '';
        return (
            attEmployeeName.includes(EmployeeName.toLowerCase()) &&
            att.starttime.includes(starttime) &&
            attHoliday.includes(holiday.toLowerCase())
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
        <TableContainer>
            <div>
                <div style={{ display: 'flex', justifyContent: 'Space-evenly', padding: '10px' }}>
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="Employee Name"
                        label="員工姓名"
                        value={filter.EmployeeName}
                        onChange={handleChange}
                    />
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="starttime"
                        label="開始日期"
                        type="month"
                        InputLabelProps={{ shrink: true }}
                        value={filter.starttime}
                        onChange={handleChange}
                    />
                    <TextField sx={{ width: '100%', m: 1 }}
                        name="holiday"
                        label="假別"
                        value={filter.holiday}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ textAlign: 'center' }}>員工編號</TableCell>
                        <TableCell>員工姓名</TableCell>
                        <TableCell>開始日期</TableCell>
                        <TableCell>結束日期</TableCell>
                        <TableCell>假別</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredAtt.map((att) => (
                        <TableRow key={att.id} >
                            <TableCell >{att.EmployeeId}</TableCell>
                            <TableCell >{att.EmployeeName}</TableCell>
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
                            <TableCell >{att.holiday}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleClick(att)}>
                                    修改
                                </Button>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {chattdata && (
                <Dialog open={clickOpen} onClose={handleClose}>
                    <DialogTitle>修改資料</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="員工姓名"
                            value={chattdata.EmployeeName}
                            fullWidth
                            disabled
                        />

                        <TextField
                            label="開始日期"
                            type="datetime-local"
                            value={chattdata.starttime}
                            fullWidth
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
                            onChange={(event) =>
                                setChattData({
                                    ...chattdata,
                                    endtime: event.target.value,
                                })
                            }

                        />
                        <TextField
                            label="假別"
                            //value為null的話，會導致React無法正確管理元件的狀態
                            value={chattdata.holiday !== null ? chattdata.holiday : ''}
                            fullWidth
                            onChange={(event) =>
                                setChattData({
                                    ...chattdata,
                                    holiday: event.target.value,
                                })
                            }
                        />
                        <Button variant="contained" onClick={() =>handleSaveClick(chattdata)}>
                            儲存
                        </Button>
                    </DialogContent>
                </Dialog>
            )}
        </TableContainer>

    );
}
export default Attenddance;