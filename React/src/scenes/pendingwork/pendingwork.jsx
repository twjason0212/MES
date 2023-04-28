import React, { useState, useEffect } from "react";
import {
    Box, TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Button
    , Dialog, DialogContent, TextField, useTheme
} from "@mui/material";
import axios from "axios";
import withAuth from "../../components/withAuth";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const PendingWorkA = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [pendingwork, setPendingwork] = useState([]);
    const [open, setOpen] = useState(false);
    const [rependingwork, setRependingwork] = useState([]);

    const id = window.sessionStorage.getItem('name');
    useEffect(() => {
        axios.get(`http://127.0.0.1:3702/workorder/${id}`)
            .then(response => {
                const updatedData = response.data.map(item => ({
                    ...item,
                    real_process_amount: '',
                    defect_process_amount: '',
                    finish_date: ''
                }));
                setPendingwork(updatedData);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const handlePeClick = (order) => {
        setRependingwork(order);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = (data) => {
        axios.post('http://127.0.0.1:3702/reportorder', data)
            .then((response) => {
                console.log(response.data);
                axios.put('http://127.0.0.1:3702/reportorder', data)
                    .then((response) => {
                        console.log(response.data)
                        axios.get(`http://127.0.0.1:3702/workorder/${id}`)
                        .then(response => {
                            const updatedData = response.data.map(item => ({
                                ...item,
                                real_process_amount: '',
                                defect_process_amount: '',
                                finish_date: ''
                            }));
                            setPendingwork(updatedData);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error);
            })

        handleClose();
        console.log(data)
    }



    return (
        <Box m="20px" sx={{
            '& label.Mui-focused': {
                color: '#4cceac'
            }
        }}>
            <Header title="待辦工單" />
            <TableContainer m="40px 0 0 0">
                <Table sx={{ backgroundColor: colors.primary[400], mt: 3, }}>
                    <TableHead sx={{
                        backgroundColor: colors.blueAccent[700], mt: 2,
                        '& .MuiTableCell-root': { fontSize: '16px', textAlign: "center" }
                    }}>
                        <TableRow>
                            <TableCell>派工單號</TableCell>
                            <TableCell>產品名稱</TableCell>
                            <TableCell>建立日期</TableCell>
                            <TableCell>預計加工量</TableCell>
                            <TableCell>目前狀況</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingwork.map((order) => (
                            <React.Fragment key={order.work_order_id}>
                                <TableRow sx={{ '& .MuiTableCell-root': { fontSize: '16px', textAlign: "center" } }}>
                                    <TableCell>{order.work_order_id}</TableCell>
                                    <TableCell>{order.product_name}</TableCell>
                                    <TableCell>{new Date(order.process_date).toLocaleString('zh-TW', {
                                        hour12: false,
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}</TableCell>
                                    <TableCell>{order.tar_process_amount}</TableCell>
                                    <TableCell>{order.work_order_status_name}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" sx={{ fontSize: '16px', textAlign: "center" }}
                                            onClick={() => handlePeClick(order)}>
                                            報工
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>

                {rependingwork && (
                    <Dialog open={open} onClose={handleClose} sx={{
                        '& .MuiTextField-root': { mt: 2, fontSize: '16px' },
                        '& label.Mui-focused': { color: '#4cceac' }
                    }} >
                        <DialogContent sx={{ ml: 2 }}>
                            <TextField
                                label="派工單號"
                                value={rependingwork.work_order_id}
                                fullWidth
                                disabled
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}

                            />
                            <TextField
                                label="建立日期"
                                value={new Date(rependingwork.process_date).toLocaleString()}
                                fullWidth
                                disabled
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                            />
                            <TextField
                                label="產品名稱"
                                value={rependingwork.product_name}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                disabled
                            />
                            <TextField
                                label="預計加工量"
                                value={rependingwork.tar_process_amount}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                disabled
                            />
                            <TextField
                                label="機器編號"
                                value={rependingwork.machine_uuid}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                            />
                            <TextField
                                label="製作人員"
                                value={rependingwork.work_order_executor}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                            />
                            <TextField
                                label="成品數量"
                                value={rependingwork.real_process_amount}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                onChange={(event) =>
                                    setRependingwork({
                                        ...rependingwork,
                                        real_process_amount: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="不良品數量"
                                value={rependingwork.defect_process_amount}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                onChange={(event) =>
                                    setRependingwork({
                                        ...rependingwork,
                                        defect_process_amount: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="完成時間"
                                value={rependingwork.finish_date}
                                fullWidth
                                type="datetime-local"
                                InputLabelProps={{ shrink: true, style: { fontSize: '1.2rem' } }}
                                onChange={(event) =>
                                    setRependingwork({
                                        ...rependingwork,
                                        finish_date: event.target.value,
                                    })
                                }
                            />
                            <Button fullWidth sx={{ mt: 2 }} variant="contained" type="submit" color="info" onClick={() => handleSave(rependingwork)}>
                                儲存
                            </Button>
                        </DialogContent>
                    </Dialog>
                )}
            </TableContainer>
        </Box>
    )

}

const PendingWorkB = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [pendingwork, setPendingwork] = useState([]);
    const [open, setOpen] = useState(false);
    const [rependingwork, setRependingwork] = useState([]);

    const id = window.sessionStorage.getItem('name');
    useEffect(() => {
        axios.get(`http://127.0.0.1:3702/workorder/${id}`)
            .then(response => {
                const updatedData = response.data.map(item => ({
                    ...item,
                    real_process_amount: '',
                    defect_process_amount: '',
                    finish_date: ''
                }));
                setPendingwork(updatedData);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const handlePeClick = (order) => {
        setRependingwork(order);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = (data) => {
        axios.post('http://127.0.0.1:3702/reportorder', data)
            .then((response) => {
                console.log(response.data);
                axios.put('http://127.0.0.1:3702/reportorder', data)
                    .then((response) => {
                        console.log(response.data)
                        axios.get(`http://127.0.0.1:3702/workorder/${id}`)
                        .then(response => {
                            const updatedData = response.data.map(item => ({
                                ...item,
                                real_process_amount: '',
                                defect_process_amount: '',
                                finish_date: ''
                            }));
                            setPendingwork(updatedData);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error);
            })

        handleClose();
        console.log(data)
    }



    return (
        <Box m="20px" sx={{
            '& label.Mui-focused': {
                color: '#4cceac'
            }
        }}>
            <Header title="待辦工單" />
            <TableContainer m="40px 0 0 0">
                <Table sx={{ backgroundColor: colors.primary[400], mt: 3, }}>
                    <TableHead sx={{
                        backgroundColor: colors.blueAccent[700], mt: 2,
                        '& .MuiTableCell-root': { fontSize: '16px', textAlign: "center" }
                    }}>
                        <TableRow>
                            <TableCell>派工單號</TableCell>
                            <TableCell>產品名稱</TableCell>
                            <TableCell>建立日期</TableCell>
                            <TableCell>預計加工量</TableCell>
                            <TableCell>目前狀況</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingwork.map((order) => (
                            <React.Fragment key={order.work_order_id}>
                                <TableRow sx={{ '& .MuiTableCell-root': { fontSize: '16px', textAlign: "center" } }}>
                                    <TableCell>{order.work_order_id}</TableCell>
                                    <TableCell>{order.product_name}</TableCell>
                                    <TableCell>{new Date(order.process_date).toLocaleString('zh-TW', {
                                        hour12: false,
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}</TableCell>
                                    <TableCell>{order.tar_process_amount}</TableCell>
                                    <TableCell>{order.work_order_status_name}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" sx={{ fontSize: '16px', textAlign: "center" }}
                                            onClick={() => handlePeClick(order)}>
                                            報工
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>

                {rependingwork && (
                    <Dialog open={open} onClose={handleClose} sx={{
                        '& .MuiTextField-root': { mt: 2, fontSize: '16px' },
                        '& label.Mui-focused': { color: '#4cceac' }
                    }} >
                        <DialogContent sx={{ ml: 2 }}>
                            <TextField
                                label="派工單號"
                                value={rependingwork.work_order_id}
                                fullWidth
                                disabled
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}

                            />
                            <TextField
                                label="建立日期"
                                value={new Date(rependingwork.process_date).toLocaleString()}
                                fullWidth
                                disabled
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                            />
                            <TextField
                                label="產品名稱"
                                value={rependingwork.product_name}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                disabled
                            />
                            <TextField
                                label="預計加工量"
                                value={rependingwork.tar_process_amount}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                disabled
                            />
                            <TextField
                                label="機器編號"
                                value={rependingwork.machine_uuid}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                            />
                            <TextField
                                label="製作人員"
                                value={rependingwork.work_order_executor}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                            />
                            <TextField
                                label="成品數量"
                                value={rependingwork.real_process_amount}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                onChange={(event) =>
                                    setRependingwork({
                                        ...rependingwork,
                                        real_process_amount: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="不良品數量"
                                value={rependingwork.defect_process_amount}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                onChange={(event) =>
                                    setRependingwork({
                                        ...rependingwork,
                                        defect_process_amount: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="完成時間"
                                value={rependingwork.finish_date}
                                fullWidth
                                type="datetime-local"
                                InputLabelProps={{ shrink: true, style: { fontSize: '1.2rem' } }}
                                onChange={(event) =>
                                    setRependingwork({
                                        ...rependingwork,
                                        finish_date: event.target.value,
                                    })
                                }
                            />
                            <Button fullWidth sx={{ mt: 2 }} variant="contained" type="submit" color="info" onClick={() => handleSave(rependingwork)}>
                                儲存
                            </Button>
                        </DialogContent>
                    </Dialog>
                )}
            </TableContainer>
        </Box>
    )

}


const PendingWork = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [pendingwork, setPendingwork] = useState([]);
    const [open, setOpen] = useState(false);
    const [rependingwork, setRependingwork] = useState([]);

    const id = window.sessionStorage.getItem('name');
    useEffect(() => {
        axios.get(`http://127.0.0.1:3702/workorder/${id}`)
            .then(response => {
                const updatedData = response.data.map(item => ({
                    ...item,
                    real_process_amount: '',
                    defect_process_amount: '',
                    finish_date: ''
                }));
                setPendingwork(updatedData);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const handlePeClick = (order) => {
        setRependingwork(order);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = (data) => {
        axios.post('http://127.0.0.1:3702/reportorder', data)
            .then((response) => {
                console.log(response.data);
                axios.put('http://127.0.0.1:3702/reportorder', data)
                    .then((response) => {
                        console.log(response.data)
                        axios.get(`http://127.0.0.1:3702/workorder/${id}`)
                        .then(response => {
                            const updatedData = response.data.map(item => ({
                                ...item,
                                real_process_amount: '',
                                defect_process_amount: '',
                                finish_date: ''
                            }));
                            setPendingwork(updatedData);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error);
            })

        handleClose();
        console.log(data)
    }



    return (
        <Box m="20px" sx={{
            '& label.Mui-focused': {
                color: '#4cceac'
            }
        }}>
            <Header title="待辦工單" />
            <TableContainer m="40px 0 0 0">
                <Table sx={{ backgroundColor: colors.primary[400], mt: 3, }}>
                    <TableHead sx={{
                        backgroundColor: colors.blueAccent[700], mt: 2,
                        '& .MuiTableCell-root': { fontSize: '16px', textAlign: "center" }
                    }}>
                        <TableRow>
                            <TableCell>派工單號</TableCell>
                            <TableCell>產品名稱</TableCell>
                            <TableCell>建立日期</TableCell>
                            <TableCell>預計加工量</TableCell>
                            <TableCell>目前狀況</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingwork.map((order) => (
                            <React.Fragment key={order.work_order_id}>
                                <TableRow sx={{ '& .MuiTableCell-root': { fontSize: '16px', textAlign: "center" } }}>
                                    <TableCell>{order.work_order_id}</TableCell>
                                    <TableCell>{order.product_name}</TableCell>
                                    <TableCell>{new Date(order.process_date).toLocaleString('zh-TW', {
                                        hour12: false,
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}</TableCell>
                                    <TableCell>{order.tar_process_amount}</TableCell>
                                    <TableCell>{order.work_order_status_name}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" sx={{ fontSize: '16px', textAlign: "center" }}
                                            onClick={() => handlePeClick(order)}>
                                            報工
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>

                {rependingwork && (
                    <Dialog open={open} onClose={handleClose} sx={{
                        '& .MuiTextField-root': { mt: 2, fontSize: '16px' },
                        '& label.Mui-focused': { color: '#4cceac' }
                    }} >
                        <DialogContent sx={{ ml: 2 }}>
                            <TextField
                                label="派工單號"
                                value={rependingwork.work_order_id}
                                fullWidth
                                disabled
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}

                            />
                            <TextField
                                label="建立日期"
                                value={new Date(rependingwork.process_date).toLocaleString()}
                                fullWidth
                                disabled
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                            />
                            <TextField
                                label="產品名稱"
                                value={rependingwork.product_name}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                disabled
                            />
                            <TextField
                                label="預計加工量"
                                value={rependingwork.tar_process_amount}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                disabled
                            />
                            <TextField
                                label="機器編號"
                                value={rependingwork.machine_uuid}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                            />
                            <TextField
                                label="製作人員"
                                value={rependingwork.work_order_executor}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                            />
                            <TextField
                                label="成品數量"
                                value={rependingwork.real_process_amount}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                onChange={(event) =>
                                    setRependingwork({
                                        ...rependingwork,
                                        real_process_amount: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="不良品數量"
                                value={rependingwork.defect_process_amount}
                                fullWidth
                                InputLabelProps={{ style: { fontSize: '1.2rem' } }}
                                onChange={(event) =>
                                    setRependingwork({
                                        ...rependingwork,
                                        defect_process_amount: event.target.value,
                                    })
                                }
                            />
                            <TextField
                                label="完成時間"
                                value={rependingwork.finish_date}
                                fullWidth
                                type="datetime-local"
                                InputLabelProps={{ shrink: true, style: { fontSize: '1.2rem' } }}
                                onChange={(event) =>
                                    setRependingwork({
                                        ...rependingwork,
                                        finish_date: event.target.value,
                                    })
                                }
                            />
                            <Button fullWidth sx={{ mt: 2 }} variant="contained" type="submit" color="info" onClick={() => handleSave(rependingwork)}>
                                儲存
                            </Button>
                        </DialogContent>
                    </Dialog>
                )}
            </TableContainer>
        </Box>
    )

}
export default withAuth(PendingWork);