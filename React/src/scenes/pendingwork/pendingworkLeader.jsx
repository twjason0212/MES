import React, { useState, useEffect } from "react";
import {
    Box, TableContainer, TableHead, TableRow, TableCell, TableBody, Table, Button
    , Dialog, DialogContent, TextField, useTheme, DialogTitle
} from "@mui/material";
import axios from "axios";
import withAuth from "../../components/withAuth";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import Grid from '@mui/material/Unstable_Grid2';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const PendingWorkLeader = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [pendingwork, setPendingwork] = useState([]);
    const [open, setOpen] = useState(false);
    const [rependingwork, setRependingwork] = useState([]);

    const id = window.sessionStorage.getItem('name');
    useEffect(() => {
        axios.get(`http://127.0.0.1:3702/workorderl/${id}`)
            .then(response => {
                setPendingwork(response.data);
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
        axios.put('http://127.0.0.1:3702/reportorderl', data)
            .then((response) => {
                console.log(response.data);
                axios.get(`http://127.0.0.1:3702/workorderl/${id}`)
                    .then(response => {
                        setPendingwork(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            })

        handleClose();
        console.log(data)
    }



    return (
        <Box m="20px" >

            <Header title="待辦工單" />
            <TableContainer m="40px 0 0 0">
                <Table sx={{ backgroundColor: colors.primary[400], mt: 3, }}>
                    <TableHead sx={{
                        backgroundColor: colors.blueAccent[700], mt: 2,
                        '& .MuiTableCell-root': { fontSize: '22px', textAlign: "center" }
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
                                <TableRow sx={{ '& .MuiTableCell-root': { fontSize: '20px', textAlign: "center" } }}>
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
                                        <Button variant="contained" color="secondary" sx={{ fontSize: '20px', textAlign: "center" }}
                                            onClick={() => handlePeClick(order)}>
                                            審核
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>

                {rependingwork && (
                    <Dialog open={open} onClose={handleClose} sx={{
                        "& .titlegreen-text": { color: colors.greenAccent[500], fontSize: "22px", },
                        '& .MuiTextField-root': { m: 1 },
                        '& label.Mui-focused': {
                            color: '#4cceac'
                        }, '& .MuiInputLabel-outlined': {
                            color: '#4cceac',
                            fontSize: "22px",

                        }, '& .MuiOutlinedInput-root': {
                            fontSize: '22px'
                        }, '& .MuiButton-root': {
                            fontSize: '22px', mt: 4
                        },
                    }} >
                        <DialogTitle className="titlegreen-text">審核報工單</DialogTitle>
                        <DialogContent>
                            <Formik
                                initialValues={{
                                    id: rependingwork.id,
                                    work_order_id: rependingwork.work_order_id,
                                    process_date: rependingwork.process_date,
                                    product_name: rependingwork.product_name,
                                    tar_process_amount: rependingwork.tar_process_amount,
                                    machine_uuid: rependingwork.machine_uuid,
                                    work_order_executor: rependingwork.work_order_executor,
                                    real_process_amount: rependingwork.real_process_amount,
                                    defect_process_amount: rependingwork.defect_process_amount,
                                }}
                                validationSchema={Yup.object({
                                    work_order_id: Yup.string().required('必填'),
                                    process_date: Yup.date().required('必填'),
                                    product_name: Yup.string().required('必填'),
                                    tar_process_amount: Yup.number().typeError('必須為數字').required('必填'),
                                    machine_uuid: Yup.string().required('必填'),
                                    work_order_executor: Yup.string().required('必填'),
                                    real_process_amount: Yup.number().typeError('必須為數字').min(1, '數量不能為0或負數').required('必填'),
                                    defect_process_amount: Yup.number().typeError('必須為數字').min(0, '數量不能為負數').required('必填'),
                                })}
                                onSubmit={(values) => {
                                    handleSave(values);
                                    handleClose();
                                }}
                            >
                                {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
                                    <Box component={Form} onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid xs={6}>
                                                <TextField
                                                    label="派工單號"
                                                    value={values.work_order_id}
                                                    fullWidth
                                                    disabled
                                                    error={touched.work_order_id && Boolean(errors.work_order_id)}
                                                    helperText={touched.work_order_id && errors.work_order_id}
                                                />
                                            </Grid>
                                            <Grid xs={6} >
                                                <TextField
                                                    label="建立日期"
                                                    value={new Date(values.process_date).toLocaleString()}
                                                    fullWidth
                                                    disabled
                                                    error={touched.process_date && Boolean(errors.process_date)}
                                                    helperText={touched.process_date && errors.process_date}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid xs={6}>
                                                <TextField
                                                    label="產品名稱"
                                                    value={values.product_name}
                                                    fullWidth
                                                    disabled
                                                    error={touched.product_name && Boolean(errors.product_name)}
                                                    helperText={touched.product_name && errors.product_name}
                                                />
                                            </Grid>
                                            <Grid xs={6}>
                                                <TextField
                                                    label="預計加工量"
                                                    value={values.tar_process_amount}
                                                    fullWidth
                                                    disabled
                                                    error={touched.tar_process_amount && Boolean(errors.tar_process_amount)}
                                                    helperText={touched.tar_process_amount && errors.tar_process_amount}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid xs={6}>
                                                <TextField
                                                    label="機器編號"
                                                    value={values.machine_uuid}
                                                    fullWidth
                                                    disabled
                                                    error={touched.machine_uuid && Boolean(errors.machine_uuid)}
                                                    helperText={touched.machine_uuid && errors.machine_uuid}
                                                />
                                            </Grid>
                                            <Grid xs={6}>
                                                <TextField
                                                    label="製作人員"
                                                    value={values.work_order_executor}
                                                    fullWidth
                                                    disabled
                                                    error={touched.work_order_executor && Boolean(errors.work_order_executor)}
                                                    helperText={touched.work_order_executor && errors.work_order_executor}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid xs={12}>
                                                <TextField
                                                    label="成品數量"
                                                    value={values.real_process_amount}
                                                    fullWidth
                                                    onChange={(e) => {
                                                        setFieldValue("real_process_amount", e.target.value);
                                                    }}
                                                    error={touched.real_process_amount && Boolean(errors.real_process_amount)}
                                                    helperText={touched.real_process_amount && errors.real_process_amount}
                                                />
                                            </Grid>
                                            <Grid xs={12}>
                                                <TextField
                                                    label="不良品數量"
                                                    value={values.defect_process_amount}
                                                    fullWidth
                                                    onChange={(e) => {
                                                        setFieldValue("defect_process_amount", e.target.value);
                                                    }}
                                                    error={touched.defect_process_amount && Boolean(errors.defect_process_amount)}
                                                    helperText={touched.defect_process_amount && errors.defect_process_amount}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button fullWidth sx={{ mt: 2 }} variant="contained" type="submit" color="info" >
                                            儲存
                                        </Button>
                                    </Box>
                                )}
                            </Formik>
                        </DialogContent>
                    </Dialog>
                )}
            </TableContainer>
        </Box >
    )

}

export default withAuth(PendingWorkLeader);