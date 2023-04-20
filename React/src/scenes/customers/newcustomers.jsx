import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function NewCustomers({ handleAdd }) {
    const [open, setopen] = useState(false);

    const handleOpen = () => {
        setopen(true);
    }

    const handleClose = () => {
        setopen(false);
    }





    return (
        <Box>
            <Button variant='contained' color='primary' onClick={handleOpen}>
                新增客戶資料
            </Button>
            <Dialog open={open} onClose={handleClose}
                maxWidth='lg'
                sx={{ '& .MuiTextField-root': { m: 1, mt: 2 }, }}>
                <DialogTitle>新增客戶資料</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            customername: '',
                            customerphone: '',
                            customeremail: '',
                            customeraddress: '',
                            customerfax: ''
                        }}
                        validationSchema={Yup.object({
                            customername: Yup.string().required('必填'),
                            customerphone: Yup.string().max(15).required('必填'),
                            customeremail: Yup.string().email('請輸入正確的電子郵件格式'),
                            customeraddress: Yup.string().required('必填'),
                            customerfax: Yup.string().max(15)
                        })}
                        onSubmit={(values) => {
                            axios.post('http://127.0.0.1:3702/coustomer/create', values)
                                .then((response) => {
                                    console.log(response.data);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                            
                            handleAdd();
                            handleClose();
                        }}
                    >
                        {({ handleSubmit, handleChange, values, errors, touched }) => (
                            <Box component={Form} onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="customername"
                                            name="customername"
                                            label="客戶名稱"
                                            fullWidth
                                            value={values.customername}
                                            onChange={handleChange}
                                            error={touched.customername && Boolean(errors.customername)}
                                            helperText={touched.customername && errors.customername}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="customerphone"
                                            name="customerphone"
                                            label="客戶電話"
                                            fullWidth
                                            value={values.customerphone}
                                            onChange={handleChange}
                                            error={touched.customerphone && Boolean(errors.customerphone)}
                                            helperText={touched.customerphone && errors.customerphone}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="customeremail"
                                            name="customeremail"
                                            label="客戶email"
                                            type="email"
                                            fullWidth
                                            value={values.customeremail}
                                            onChange={handleChange}
                                            error={touched.customeremail && Boolean(errors.customeremail)}
                                            helperText={touched.customeremail && errors.customeremail}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="customerfax"
                                            name="customerfax"
                                            label="客戶傳真"
                                            fullWidth
                                            value={values.customerfax}
                                            onChange={handleChange}
                                            error={touched.customerfax && Boolean(errors.customerfax)}
                                            helperText={touched.customerfax && errors.customerfax}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="customeraddress"
                                            name="customeraddress"
                                            label="客戶地址"
                                            fullWidth
                                            value={values.customeraddress}
                                            onChange={handleChange}
                                            error={touched.customeraddress && Boolean(errors.customeraddress)}
                                            helperText={touched.customeraddress && errors.customeraddress}
                                        />
                                    </Grid>
                                </Grid>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">取消</Button>
                                    <Button type="submit">儲存</Button>
                                </DialogActions>
                            </Box>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </Box >
    )
}