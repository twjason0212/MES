import React, { useEffect, useState } from "react";
import { Box, TableCell, TableContainer, TableHead, TableRow, Button, TableBody, Table, Dialog, DialogContent, TextField, useTheme, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import withAuth from "../../components/withAuth";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import SaveAsIcon from '@mui/icons-material/SaveAs';



const WorkOrderList = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [workorder, setWorkOrder] = useState([]);
    const [reworkorder, setReWorkOrder] = useState([]);
    const [open, setOpen] = useState(false);
    const work_order_executor = window.sessionStorage.getItem('name');
    const [alertOpen, setAlertOpen] = useState(false)


    useEffect(() => {
        axios.get('http://127.0.0.1:3702/workorder')
            .then(response => {
                setWorkOrder(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const handleReClick = (order) => {
        setReWorkOrder(order);
        
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }



    const handleAlertClose = () => {
        setAlertOpen(false)
    };

    // const handleSave = (data) => {

    //     axios.put('http://127.0.0.1:3702/workorderlist', data)
    //         .then((response) => {
    //             console.log(response.data);
    //             return axios.get('http://127.0.0.1:3702/workorder')
    //         })
    //         .then((response) => {
    //             setWorkOrder(response.data);
    //             console.log('資料更新成功');
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //     setOpen(false);
    // }


    return (
        <Box m="20px" sx={{
            '& label.Mui-focused': {
                color: '#4cceac'
            }
        }}>
            <Header title="派工單列表" subtitle="尚未接收之派工單" />
            <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}  >
                <Alert onClose={handleAlertClose} icon={false} sx={{ width: '100%', fontSize: 20, color: 'black', backgroundColor: '#4cceac' }}>
                    接單成功!
                </Alert>
            </Snackbar>
            <TableContainer m="40px 0 0 0">
                <Table sx={{ backgroundColor: colors.primary[400], mt: 3, }}>
                    <TableHead sx={{
                        backgroundColor: colors.blueAccent[700], mt: 2, '& .MuiTableCell-root': { fontSize: '22px', textAlign: "center" }
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
                        {workorder.map((order) => (
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
                                            onClick={() => handleReClick(order)} startIcon={<AssignmentTurnedInIcon style={{ fontSize: 28 }} />} >
                                            接單
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>

                {reworkorder && (

                    <Dialog open={open} onClose={handleClose} sx={{
                        '& .MuiTextField-root': { mt: 2 },
                        '& label.Mui-focused': {
                            color: '#4cceac',
                        }, '& .MuiInputLabel-outlined': {
                            color: '#4cceac',
                            fontSize: "22px"
                        }, '& .MuiOutlinedInput-root': {
                            fontSize: '22px'
                        }, '& .MuiButton-root': {
                            fontSize: '22px', mt: 4
                        },
                    }} >

                        <DialogContent sx={{ ml: 2 }}>
                            <Formik
                                initialValues={{
                                    id: reworkorder.id,
                                    work_order_id: reworkorder.work_order_id,
                                    process_date: reworkorder.process_date,
                                    product_name: reworkorder.product_name,
                                    tar_process_amount: reworkorder.tar_process_amount,
                                    work_order_executor: work_order_executor,
                                    machine_uuid: '',
                                }}
                                validationSchema={Yup.object({
                                    work_order_id: Yup.string().required('請輸入派工單號'),
                                    process_date: Yup.date().max(new Date(), '日期不能晚於今天').required('請輸入建立日期'),
                                    product_name: Yup.string().required('請輸入產品名稱'),
                                    tar_process_amount: Yup.number().typeError('必須為數字').min(1, '數量不能為0或負數').required('必填'),
                                    work_order_executor: Yup.string().required('請輸入派工單製作人員'),
                                    machine_uuid: Yup.string().required('請輸入機器編號'),
                                })}
                                onSubmit={(values, { resetForm }) => {
                                    axios.put('http://127.0.0.1:3702/workorderlist', values)
                                        .then((response) => {
                                            console.log(response.data);
                                            return axios.get('http://127.0.0.1:3702/workorder')
                                        })
                                        .then((response) => {
                                            setWorkOrder(response.data);
                                            console.log('資料更新成功');
                                            setAlertOpen(true);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                    setOpen(false);
                                }}
                            >

                                {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                                    <Box component={Form} onSubmit={handleSubmit}>
                                        <TextField
                                            label="派工單號"
                                            id="work_order_id"
                                            name="work_order_id"
                                            value={values.work_order_id}
                                            fullWidth
                                            disabled
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.work_order_id && Boolean(errors.work_order_id)}
                                            helperText={touched.work_order_id && errors.work_order_id}
                                        />
                                        <TextField
                                            label="建立日期"
                                            id="process_date"
                                            name="process_date"
                                            value={new Date(values.process_date).toLocaleString()}
                                            fullWidth
                                            disabled
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.process_date && Boolean(errors.process_date)}
                                            helperText={touched.process_date && errors.process_date}

                                        />
                                        <TextField
                                            label="產品名稱"
                                            id="product_name"
                                            name="product_name"
                                            value={values.product_name}
                                            fullWidth
                                            disabled
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.product_name && Boolean(errors.product_name)}
                                            helperText={touched.product_name && errors.product_name}
                                        />
                                        <TextField
                                            label="預計加工量"
                                            id="tar_process_amount"
                                            name="tar_process_amount"
                                            value={values.tar_process_amount}
                                            fullWidth
                                            disabled
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.tar_process_amount && Boolean(errors.tar_process_amount)}
                                            helperText={touched.tar_process_amount && errors.tar_process_amount}
                                        />
                                        <TextField
                                            label="製作人員"
                                            id="work_order_executor"
                                            name="work_order_executor"
                                            value={values.work_order_executor}
                                            fullWidth
                                            disabled
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.work_order_executor && Boolean(errors.work_order_executor)}
                                            helperText={touched.work_order_executor && errors.work_order_executor}
                                        />
                                        <TextField
                                            label="機器編號"
                                            id="machine_uuid"
                                            name="machine_uuid"
                                            value={values.machine_uuid}
                                            fullWidth
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.machine_uuid && Boolean(errors.machine_uuid)}
                                            helperText={touched.machine_uuid && errors.machine_uuid}
                                        />
                                        <Button fullWidth variant="contained" type="submit" color="info" startIcon={<SaveAsIcon style={{ fontSize: 28 }} />}
                                        >
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
export default withAuth(WorkOrderList);